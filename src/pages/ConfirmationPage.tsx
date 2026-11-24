import { Link, useSearchParams } from 'react-router-dom';
import { CalendarCheck, Check, KeyRound, Mail } from 'lucide-react';
import { formatPrice } from '../config/site';
import { rooms } from '../data/rooms';
import { Seo } from '../components/common/Seo';
import {
  readRoomEnquiries,
  readTableBookings,
} from '../utils/bookingStorage';
import { formatReservationSummary } from '../utils/reservation';

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('ref');
  const kind = searchParams.get('kind');

  const booking =
    kind === 'table' && reference
      ? readTableBookings().find((item) => item.reference === reference)
      : undefined;
  const enquiry =
    kind === 'room' && reference
      ? readRoomEnquiries().find((item) => item.reference === reference)
      : undefined;

  return (
    <>
      <Seo
        title="Reservation received"
        description="Your Sea_Food reservation or enquiry has been saved on this device."
      />
      <section className="confirmation-page section-space page-gutter">
        {booking ? (
          <article className="confirmation-card">
            <div className="confirmation-card__icon"><CalendarCheck size={34} aria-hidden="true" /></div>
            <p className="eyebrow">Table request saved</p>
            <h1>We have your table request, {booking.name}.</h1>
            <p className="confirmation-card__lede">
              {formatReservationSummary({
                date: booking.date,
                time: booking.time,
                party: booking.guests,
                name: booking.name,
                email: booking.email,
                note: booking.specialRequests,
                savedAt: booking.savedAt,
              })}
            </p>
            <div className="confirmation-card__reference">
              <span>Reference</span><strong>{booking.reference}</strong>
            </div>
            <ul className="confirmation-list">
              <li><Mail size={16} aria-hidden="true" /> {booking.email}</li>
              <li><Check size={16} aria-hidden="true" /> {booking.phone}</li>
            </ul>
            {booking.cart.length > 0 ? (
              <div className="confirmation-card__cart">
                <h2>Saved with your table</h2>
                <ul>
                  {booking.cart.map((item) => (
                    <li key={item.id}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <p><small>Indicative total · all prices are placeholders</small></p>
              </div>
            ) : null}
            {booking.specialRequests ? (
              <blockquote>“{booking.specialRequests}”</blockquote>
            ) : null}
            <p className="confirmation-card__note">
              TODO: connect confirmation emails. For now the request lives in “My Reservation” on this device.
            </p>
          </article>
        ) : enquiry ? (
          <article className="confirmation-card">
            <div className="confirmation-card__icon"><KeyRound size={34} aria-hidden="true" /></div>
            <p className="eyebrow">Room enquiry saved</p>
            <h1>Thank you, {enquiry.name}.</h1>
            <p className="confirmation-card__lede">
              We have your enquiry for {rooms.find((room) => room.slug === enquiry.roomSlug)?.name ?? 'a seaside room'}
              {' '}from {enquiry.checkIn} to {enquiry.checkOut} for {enquiry.guests} guests.
            </p>
            <div className="confirmation-card__reference">
              <span>Reference</span><strong>{enquiry.reference}</strong>
            </div>
            <ul className="confirmation-list">
              <li><Mail size={16} aria-hidden="true" /> {enquiry.email}</li>
              <li><Check size={16} aria-hidden="true" /> {enquiry.phone}</li>
            </ul>
            {enquiry.message ? <blockquote>“{enquiry.message}”</blockquote> : null}
            <p className="confirmation-card__note">
              TODO: connect confirmation emails. Room rates are placeholders until availability is confirmed.
            </p>
          </article>
        ) : (
          <article className="confirmation-card confirmation-card--empty">
            <p className="eyebrow">Nothing found</p>
            <h1>No saved request found</h1>
            <p>Requests are stored in this browser. Make a new table request or room enquiry to see it here.</p>
          </article>
        )}

        <div className="confirmation-actions">
          <Link className="button button--gold" to="/reservations">Make another request</Link>
          <Link className="button button--outline" to="/">Back to home</Link>
        </div>
      </section>
    </>
  );
}
