import { CalendarCheck, KeyRound } from 'lucide-react';
import heroImage from '../assets/images/image-5.webp';
import { PageHero } from '../components/common/PageHero';
import { Seo } from '../components/common/Seo';
import { ReservationForm } from '../components/forms/ReservationForm';
import { RoomEnquiryForm } from '../components/forms/RoomEnquiryForm';

export default function ReservationsPage() {
  return (
    <>
      <Seo
        title="Reservations"
        description="Reserve a table or enquire about a seaside room at Sea_Food."
        image={heroImage}
      />
      <PageHero
        eyebrow="Reservations"
        title="Save yourself a seat."
        description="Book a table for the catch of the day, or ask us about a room and wake up beside the water."
        image={heroImage}
      />

      <div className="reservations-page section-space page-gutter">
        <section className="booking-panel" aria-labelledby="table-booking-title">
          <header>
            <CalendarCheck size={24} aria-hidden="true" />
            <p className="eyebrow">Dine with us</p>
            <h2 id="table-booking-title">Reserve a table</h2>
            <p>Tuesday to Sunday, up to 90 days ahead. Your dishes and boils travel with this request.</p>
          </header>
          <ReservationForm />
        </section>

        <section className="booking-panel" aria-labelledby="room-booking-title">
          <header>
            <KeyRound size={24} aria-hidden="true" />
            <p className="eyebrow">Stay with us</p>
            <h2 id="room-booking-title">Room enquiry</h2>
            <p>Tell us when you would like to stay and which room catches your eye. Rates are demo values for now.</p>
          </header>
          <RoomEnquiryForm />
        </section>
      </div>
    </>
  );
}
