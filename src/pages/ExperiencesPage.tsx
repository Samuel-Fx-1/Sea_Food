import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/image-3.webp';
import { events } from '../data/events';
import { EventCard } from '../components/cards/EventCard';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';
import { TestimonialsCarousel } from '../components/home/TestimonialsCarousel';

export default function ExperiencesPage() {
  return (
    <>
      <Seo
        title="Experiences & Events"
        description="Sunset beach dinners, weddings, family weekends and live music at Sea_Food."
        image={heroImage}
      />
      <PageHero
        eyebrow="Experiences & events"
        title="More than a meal."
        description="Long tables on the sand, celebrations under the stars and evenings that turn into stories."
        image={heroImage}
      />

      <section className="experiences-page section-space page-gutter" aria-labelledby="experiences-title">
        <SectionHeading
          id="experiences-title"
          eyebrow="What's on"
          title="Come for the occasion"
          description="Prices shown are placeholders. Tell us what you have in mind and we will shape the day around you."
        />
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="experiences-page__cta">
          <p>Have something else in mind? We love a good challenge.</p>
          <Link className="button button--gold" to="/contact">
            Talk to our team <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <TestimonialsCarousel />
    </>
  );
}
