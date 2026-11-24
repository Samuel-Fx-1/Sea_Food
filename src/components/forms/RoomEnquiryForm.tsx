import { zodResolver } from '@hookform/resolvers/zod';
import { BedDouble } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { rooms } from '../../data/rooms';
import {
  createReference,
  readRoomEnquiries,
  writeRoomEnquiries,
} from '../../utils/bookingStorage';

const schema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name.'),
    email: z
      .string()
      .trim()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s()-]{6,}$/, 'Please enter a valid phone number.'),
    checkIn: z.string().min(1, 'Choose a check-in date.'),
    checkOut: z.string().min(1, 'Choose a check-out date.'),
    guests: z
      .string()
      .regex(/^\d+$/, 'Choose a guest count.')
      .refine((value) => Number(value) >= 1, 'At least one guest.')
      .refine((value) => Number(value) <= 6, 'For larger groups, please call us.'),
    roomSlug: z.string().min(1, 'Choose a room.'),
    message: z.string().max(800, 'Please keep your message under 800 characters.'),
  })
  .superRefine((values, context) => {
    if (values.checkIn && values.checkOut && values.checkOut <= values.checkIn) {
      context.addIssue({
        code: 'custom',
        path: ['checkOut'],
        message: 'Check-out must be after check-in.',
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export function RoomEnquiryForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const requestedRoom = searchParams.get('room') ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '2',
      roomSlug: rooms.some((room) => room.slug === requestedRoom) ? requestedRoom : '',
      message: '',
    },
  });

  const onSubmit = (values: FormValues): void => {
    const reference = createReference('RM');
    writeRoomEnquiries([
      ...readRoomEnquiries(),
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        guests: Number(values.guests),
        roomSlug: values.roomSlug,
        message: values.message,
        reference,
        savedAt: new Date().toISOString(),
      },
    ]);
    navigate(`/reservations/confirmation?ref=${reference}&kind=room`, { replace: true });
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
          <span>Email</span>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...register('email')} />
          {errors.email ? <small role="alert">{errors.email.message}</small> : null}
        </label>
        <label className="form-field form-field--wide">
          <span>Phone</span>
          <input type="tel" autoComplete="tel" placeholder="+351 000 000 000" {...register('phone')} />
          {errors.phone ? <small role="alert">{errors.phone.message}</small> : null}
        </label>
        <label className="form-field">
          <span><BedDouble size={14} aria-hidden="true" /> Room</span>
          <select {...register('roomSlug')}>
            <option value="">Choose a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.slug}>{room.name}</option>
            ))}
          </select>
          {errors.roomSlug ? <small role="alert">{errors.roomSlug.message}</small> : null}
        </label>
        <label className="form-field">
          <span>Guests</span>
          <select {...register('guests')}>
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
          {errors.guests ? <small role="alert">{errors.guests.message}</small> : null}
        </label>
        <label className="form-field">
          <span>Check-in</span>
          <input type="date" {...register('checkIn')} />
          {errors.checkIn ? <small role="alert">{errors.checkIn.message}</small> : null}
        </label>
        <label className="form-field">
          <span>Check-out</span>
          <input type="date" {...register('checkOut')} />
          {errors.checkOut ? <small role="alert">{errors.checkOut.message}</small> : null}
        </label>
        <label className="form-field form-field--wide">
          <span>Message (optional)</span>
          <textarea rows={4} placeholder="Tell us about your ideal stay…" {...register('message')} />
          {errors.message ? <small role="alert">{errors.message.message}</small> : null}
        </label>
      </div>

      <button className="button button--gold button--block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send room enquiry'}
      </button>
      {/* DEMO: enquiries stay in localStorage; no email is sent in this demo. */}
      <p className="booking-form__disclaimer">
        Room rates are demo values. We will be in touch with real availability and pricing.
        {' '}No confirmation email is sent in this demo.
      </p>
    </form>
  );
}
