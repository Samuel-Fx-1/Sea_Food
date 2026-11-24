import { CalendarDays, Clock, Users } from 'lucide-react';
import type { HotelEvent } from '../../types';
import { formatPrice } from '../../config/site';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface EventCardProps {
  event: HotelEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="event-card">
      <ImageWithFallback
        src={event.image}
        alt={event.imageAlt}
        label={event.title}
        width={900}
        height={640}
      />
      <div className="event-card__body">
        <p className="eyebrow">{event.category}</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <ul>
          <li>
            <Clock size={14} aria-hidden="true" /> {event.duration}
          </li>
          <li>
            <Users size={14} aria-hidden="true" /> {event.capacity}
          </li>
          <li>
            <CalendarDays size={14} aria-hidden="true" />{' '}
            From {formatPrice(event.priceFrom)}
          </li>
        </ul>
      </div>
    </article>
  );
}
