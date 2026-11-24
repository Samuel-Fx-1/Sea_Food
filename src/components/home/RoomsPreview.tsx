import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { rooms } from '../../data/rooms';
import { RoomCard } from '../cards/RoomCard';
import { SectionHeading } from '../common/SectionHeading';

export function RoomsPreview() {
  const navigate = useNavigate();

  return (
    <section className="rooms-preview section-space page-gutter" aria-labelledby="rooms-preview-title">
      <div className="section-heading-row">
        <SectionHeading
          id="rooms-preview-title"
          eyebrow="Stay a while"
          title="Rooms with the sea in view"
          description="Soft linens, salt air and a front-row seat to the horizon. Every stay includes breakfast by the water."
        />
        <Link className="text-link" to="/rooms">
          All rooms <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="room-grid">
        {rooms.slice(0, 2).map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onEnquire={(slug) => navigate(`/reservations?room=${slug}`)}
          />
        ))}
      </div>
    </section>
  );
}
