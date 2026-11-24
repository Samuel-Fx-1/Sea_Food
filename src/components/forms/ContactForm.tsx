import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendEmail } from '../../utils/sendEmail';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z
    .string()
    .trim()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'),
  subject: z.string().trim().max(120, 'Please keep the subject under 120 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters).')
    .max(1000, 'Please keep your message under 1000 characters.'),
  _gotcha: z.string().max(200).optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitError, setSubmitError] = useState('');
  const [sent, setSent] = useState(false);
  const emailConfigured = Boolean(import.meta.env.VITE_FORMSPREE_ENDPOINT);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', message: '', _gotcha: '' },
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setSubmitError('');
    setSent(false);

    // Honeypot: bots get a quiet success with no email sent.
    if (values._gotcha) {
      setSent(true);
      return;
    }

    try {
      await sendEmail(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        _subject: values.subject || `Website message from ${values.name}`,
        _replyto: values.email,
        _gotcha: values._gotcha ?? '',
        Name: values.name,
        Email: values.email,
        Subject: values.subject || 'Website message',
        Message: values.message,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send your message.');
      return;
    }

    reset();
    setSent(true);
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
          <span>Subject (optional)</span>
          <input type="text" placeholder="What is this about?" {...register('subject')} />
          {errors.subject ? <small role="alert">{errors.subject.message}</small> : null}
        </label>
        <label className="form-field form-field--wide">
          <span>Message</span>
          <textarea rows={5} placeholder="Tell us what you have in mind…" {...register('message')} />
          {errors.message ? <small role="alert">{errors.message.message}</small> : null}
        </label>
      </div>

      {import.meta.env.DEV && !emailConfigured ? (
        <p className="booking-form__disclaimer" role="status">
          Demo mode: <code>VITE_FORMSPREE_ENDPOINT</code> is not set, so your message will not be
          emailed. Add it to <code>.env</code> and restart the dev server to enable delivery.
        </p>
      ) : null}
      {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
      {sent ? (
        <p className="form-success" role="status">
          Thank you — your message has been sent. We will be in touch soon.
        </p>
      ) : null}

      <button className="button button--gold button--block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
