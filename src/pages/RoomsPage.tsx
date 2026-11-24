import { useNavigate } from 'react-router-dom';
import { Bath, Coffee, Waves } from 'lucide-react';
import heroImage from '../assets/images/image-4.webp';
import { rooms } from '../data/rooms';
import { RoomCard } from '../components/cards/RoomCard';
import { Counter } from '../components/common/Counter';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';

export default function RoomsPage() {
  const navigate = useNavigate();

  return (
    <>
      <Seo
        title="Rooms & Suites"
        description="Four seaside rooms and suites, each with breakfast, sea air and a view of the Atlantic."
        image={heroImage}
      />
      <PageHero
        eyebrow="Rooms & suites"
        title="Wake up beside the water."
        description="Four considered rooms, each with breakfast included and the Atlantic just outside your window."
        image={heroImage}
      />

      <section className="rooms-page section-space page-gutter" aria-labelledby="rooms-title">
        <SectionHeading
          id="rooms-title"
          eyebrow="Where to stay"
          title="Find your room"
          description="Rates are demo values until booking opens. Send an enquiry and we will help you choose."
        />
        <div className="room-grid room-grid--wide">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEnquire={(slug) => navigate(`/reservations?room=${slug}`)}
            />
          ))}
        </div>
      </section>

      <section className="rooms-stats section-space" aria-label="Stay highlights">
        <div className="page-gutter rooms-stats__inner">
          <Counter value={4} label="Rooms and suites" />
          <Counter value={100} label="Metres to the shore" suffix="m" />
          <Counter value={7} label="Breakfasts a week" />
          <Counter value={24} label="Hours of sea air" />
        </div>
      </section>

      <section className="rooms-includes section-space page-gutter" aria-labelledby="rooms-includes-title">
        <SectionHeading id="rooms-includes-title" title="Every stay includes" align="center" />
        <div className="feature-row">
          <div><Waves size={24} aria-hidden="true" /><h3>Sea views</h3><p>Every room looks out to the water, from a balcony, terrace or floor-to-ceiling window.</p></div>
          <div><Coffee size={24} aria-hidden="true" /><h3>Daily breakfast</h3><p>Slow mornings with fresh bread, fruit, coffee and a view that beats any screen.</p></div>
          <div><Bath size={24} aria-hidden="true" /><h3>Time to unwind</h3><p>Rainfall showers, deep tubs and quiet corners made for doing absolutely nothing.</p></div>
        </div>
      </section>
    </>
  );
}
