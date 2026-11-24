import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { BedDouble } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { rooms } from '../../data/rooms';
import { sendEmail } from '../../utils/sendEmail';
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
    _gotcha: z.string().max(200).optional(),
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
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const emailConfigured = Boolean(import.meta.env.VITE_FORMSPREE_ENDPOINT);

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
      _gotcha: '',
    },
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setSubmitError('');
    setSubmitSuccess(false);

    // Honeypot: bots get a quiet success, with no email and no saved enquiry.
    if (values._gotcha) {
      setSubmitSuccess(true);
      return;
    }

    const reference = createReference('RM');
    const roomName = rooms.find((room) => room.slug === values.roomSlug)?.name ?? values.roomSlug;

    try {
      await sendEmail(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        _subject: `Room enquiry ${reference} — ${values.name}`,
        _replyto: values.email,
        _gotcha: values._gotcha ?? '',
        Reference: reference,
        Name: values.name,
        Email: values.email,
        Phone: values.phone,
        Room: roomName,
        Guests: values.guests,
        'Check-in': values.checkIn,
        'Check-out': values.checkOut,
        Message: values.message || 'None',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send your enquiry.');
      return;
    }

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
    setSubmitSuccess(true);
    // Let the success state register before opening the confirmation page.
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    navigate(`/reservations/confirmation?ref=${reference}&kind=room`, { replace: true });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="sr-only" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
        </label>
      </div>
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

      {import.meta.env.DEV && !emailConfigured ? (
        <p className="booking-form__disclaimer" role="status">
          Demo mode: <code>VITE_FORMSPREE_ENDPOINT</code> is not set, so this enquiry is saved on
          this device only. Add it to <code>.env</code> and restart the dev server to send email.
        </p>
      ) : null}
      <button className="button button--gold button--block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send room enquiry'}
      </button>
      {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
      {submitSuccess ? (
        <p className="form-success" role="status">Enquiry saved — opening your confirmation…</p>
      ) : null}
      <p className="booking-form__disclaimer">
        Room rates are demo values. We email your enquiry when delivery is configured and keep a copy on this device.
      </p>
    </form>
  );
}
