import { Users, Maximize2, Wifi, Waves } from 'lucide-react';
import type { Room } from '../../types';
import { formatPrice } from '../../config/site';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface RoomCardProps {
  room: Room;
  onEnquire: (slug: string) => void;
}

export function RoomCard({ room, onEnquire }: RoomCardProps) {
  return (
    <article className="room-card">
      <ImageWithFallback
        src={room.image}
        alt={room.imageAlt}
        label={room.name}
        width={900}
        height={700}
      />
      <div className="room-card__body">
        <p className="eyebrow">{room.type}</p>
        <h3>{room.name}</h3>
        <p className="room-card__description">{room.description}</p>
        <ul className="room-card__amenities">
          {room.amenities.slice(0, 4).map((amenity) => (
            <li key={amenity}>
              {amenity.toLowerCase().includes('view') ? (
                <Waves size={14} aria-hidden="true" />
              ) : amenity.toLowerCase().includes('wifi') ? (
                <Wifi size={14} aria-hidden="true" />
              ) : (
                <span aria-hidden="true">✦</span>
              )}
              {amenity}
            </li>
          ))}
        </ul>
        <div className="room-card__meta">
          <span>
            <Users size={14} aria-hidden="true" /> {room.capacity} guests
          </span>
          <span>
            <Maximize2 size={14} aria-hidden="true" /> {room.size}
          </span>
        </div>
        <div className="room-card__footer">
          <div>
            <small>From</small>
            <strong>{formatPrice(room.pricePerNight, true)}</strong>
            <small>/ night · TODO: real price</small>
          </div>
          <button className="button button--ghost" type="button" onClick={() => onEnquire(room.slug)}>
            Enquire
          </button>
        </div>
      </div>
    </article>
  );
}
