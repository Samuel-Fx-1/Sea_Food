import { Link } from 'react-router-dom';
import { CalendarDays, KeyRound } from 'lucide-react';

export function HomeCta() {
  return (
    <section className="home-cta section-space page-gutter" aria-labelledby="home-cta-title">
      <p className="eyebrow">The tide is calling</p>
      <h2 id="home-cta-title">Come hungry. Leave slowly.</h2>
      <p>
        Reserve a table, enquire about a room, or simply come by for a long lunch
        and one more glass of wine.
      </p>
      <div className="home-cta__actions">
        <Link className="button button--gold" to="/reservations">
          <CalendarDays size={16} aria-hidden="true" /> Reserve a table
        </Link>
        <Link className="button button--outline" to="/rooms">
          <KeyRound size={16} aria-hidden="true" /> Explore rooms
        </Link>
      </div>
    </section>
  );
}
