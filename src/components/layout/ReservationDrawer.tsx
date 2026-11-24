import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck, ShoppingBag, X } from 'lucide-react';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useUi } from '../../context/UiContext';
import {
  readRoomEnquiries,
  readTableBookings,
} from '../../utils/bookingStorage';

export function ReservationDrawer() {
  const { isDrawerOpen, closeDrawer } = useUi();
  const { items, total, removeItem } = useCart();
  const bookings = readTableBookings();
  const enquiries = readRoomEnquiries();
  const latestBooking = bookings[bookings.length - 1];
  const latestEnquiry = enquiries[enquiries.length - 1];

  return (
    <AnimatePresence>
      {isDrawerOpen ? (
        <>
          <motion.button
            className="drawer-backdrop"
            type="button"
            aria-label="Close reservation drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="reservation-drawer"
            aria-label="My reservation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          >
            <header className="reservation-drawer__header">
              <div>
                <p className="eyebrow">Your table</p>
                <h2>My Reservation</h2>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={closeDrawer}
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </header>

            {latestBooking ? (
              <div className="reservation-drawer__booking">
                <CalendarCheck size={20} aria-hidden="true" />
                <div>
                  <strong>{latestBooking.reference}</strong>
                  <span>
                    {latestBooking.date} · {latestBooking.time} ·{' '}
                    {latestBooking.guests} guests
                  </span>
                </div>
              </div>
            ) : null}

            {latestEnquiry ? (
              <div className="reservation-drawer__booking">
                <CalendarCheck size={20} aria-hidden="true" />
                <div>
                  <strong>{latestEnquiry.reference} · Room enquiry</strong>
                  <span>
                    {latestEnquiry.checkIn} → {latestEnquiry.checkOut} · {latestEnquiry.guests} guests
                  </span>
                </div>
              </div>
            ) : null}

            <div className="reservation-drawer__items">
              {items.length === 0 ? (
                <div className="reservation-drawer__empty">
                  <ShoppingBag size={32} strokeWidth={1.2} aria-hidden="true" />
                  <p>No dishes or boils added yet.</p>
                  <Link className="button button--ghost" to="/menu" onClick={closeDrawer}>
                    Explore the menu
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <article className="drawer-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <small>
                        {item.kind === 'boil' && item.configuration
                          ? `${item.configuration.size} · ${item.configuration.sauce} · ${item.configuration.spice}`
                          : 'Menu dish'}
                      </small>
                    </div>
                    <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={15} />
                    </button>
                  </article>
                ))
              )}
            </div>

            <footer className="reservation-drawer__footer">
              <div>
                <span>Indicative total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <Link className="button button--gold" to="/reservations" onClick={closeDrawer}>
                Complete reservation
              </Link>
              <small>Prices are placeholders. Nothing is charged.</small>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
