import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, ShoppingBag, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { getAvailableTimes, getDateBounds } from '../../utils/reservation';
import {
  createReference,
  readTableBookings,
  writeTableBookings,
} from '../../utils/bookingStorage';

const schema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.'),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s()-]{6,}$/, 'Please enter a valid phone number.'),
    email: z
      .string()
      .trim()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'),
    date: z.string().min(1, 'Choose a date.'),
    time: z.string().min(1, 'Choose a time.'),
    guests: z
      .string()
      .regex(/^\d+$/, 'Choose a party size.')
      .refine((value) => Number(value) >= 1, 'At least one guest.')
      .refine((value) => Number(value) <= 12, 'For larger parties, please call us.'),
    specialRequests: z.string().max(500, 'Please keep notes under 500 characters.'),
  })
  .superRefine((values, context) => {
    if (!values.date) {
      return;
    }
    const times = getAvailableTimes(values.date);
    if (times.length === 0) {
      context.addIssue({
        code: 'custom',
        path: ['date'],
        message: 'We are closed on Mondays. Choose Tuesday to Sunday.',
      });
      return;
    }
    if (values.time && !times.includes(values.time)) {
      context.addIssue({
        code: 'custom',
        path: ['time'],
        message: 'That time is no longer available for this date.',
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export function ReservationForm() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const bounds = useMemo(() => getDateBounds(), []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: '',
    },
  });

  const selectedDate = watch('date');
  const availableTimes = selectedDate ? getAvailableTimes(selectedDate) : [];

  const onSubmit = (values: FormValues): void => {
    const reference = createReference('TBL');
    writeTableBookings([
      ...readTableBookings(),
      {
        name: values.name,
        phone: values.phone,
        email: values.email,
        date: values.date,
        time: values.time,
        guests: Number(values.guests),
        specialRequests: values.specialRequests,
        cart: items,
        reference,
        savedAt: new Date().toISOString(),
      },
    ]);
    clearCart();
    navigate(`/reservations/confirmation?ref=${reference}&kind=table`, { replace: true });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input type="text" autoComplete="name" placeholder="Your name" {...register('name')} />
          {errors.name ? <small role="alert">{errors.name.message}</small> : null}
        </label>

        <label className="form-field">
          <span>Phone</span>
          <input type="tel" autoComplete="tel" placeholder="+351 000 000 000" {...register('phone')} />
          {errors.phone ? <small role="alert">{errors.phone.message}</small> : null}
        </label>

        <label className="form-field form-field--wide">
          <span>Email</span>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...register('email')} />
          {errors.email ? <small role="alert">{errors.email.message}</small> : null}
        </label>

        <label className="form-field">
          <span><CalendarDays size={14} aria-hidden="true" /> Date</span>
          <input type="date" min={bounds.min} max={bounds.max} {...register('date')} />
          {errors.date ? <small role="alert">{errors.date.message}</small> : null}
        </label>

        <label className="form-field">
          <span>Time</span>
          <select {...register('time')} disabled={!selectedDate || availableTimes.length === 0}>
            <option value="">{availableTimes.length === 0 ? 'Choose a date first' : 'Select a time'}</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time ? <small role="alert">{errors.time.message}</small> : null}
        </label>

        <label className="form-field form-field--wide">
          <span><Users size={14} aria-hidden="true" /> Guests</span>
          <select {...register('guests')}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
          {errors.guests ? <small role="alert">{errors.guests.message}</small> : null}
        </label>

        <label className="form-field form-field--wide">
          <span>Anything we should know? (optional)</span>
          <textarea rows={3} placeholder="Allergies, celebrations, a favourite table…" {...register('specialRequests')} />
          {errors.specialRequests ? <small role="alert">{errors.specialRequests.message}</small> : null}
        </label>
      </div>

      <div className="booking-form__cart">
        <p><ShoppingBag size={16} aria-hidden="true" /> Your dishes and boils</p>
        {items.length === 0 ? (
          <p className="booking-form__empty">Nothing added yet — you can still reserve a table.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="booking-form__total"><span>Indicative total</span><strong>{formatPrice(total)}</strong></div>
        <small>All prices are placeholders. Nothing is charged.</small>
      </div>

      <button className="button button--gold button--block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Request this table'}
      </button>
      <p className="booking-form__disclaimer">
        We keep your request on this device and show it in “My Reservation”. A real confirmation email is
        {' '}TODO: connect email delivery.
      </p>
    </form>
  );
}
