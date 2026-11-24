import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import heroImage from '../assets/images/image-4.webp';
import { siteConfig } from '../config/site';
import { visitContent } from '../data/site';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact & Location"
        description="Find Sea_Food, get in touch, and see our opening hours."
        image={heroImage}
      />
      <PageHero
        eyebrow="Contact & location"
        title="Find us by the sea."
        description="Questions, celebrations or a simple table for two — we would love to hear from you."
        image={heroImage}
      />

      <section className="contact-page section-space page-gutter" aria-labelledby="contact-title">
        <SectionHeading id="contact-title" eyebrow="Say hello" title="Come find us" />
        <div className="contact-page__layout">
          <div className="contact-cards">
            <a className="contact-card" href={`tel:${siteConfig.phone}`}>
              <Phone size={20} aria-hidden="true" />
              <div><h3>Call us</h3><p>{siteConfig.phone}</p></div>
            </a>
            <a className="contact-card" href={`mailto:${siteConfig.email}`}>
              <Mail size={20} aria-hidden="true" />
              <div><h3>Email</h3><p>{siteConfig.email}</p></div>
            </a>
            <div className="contact-card">
              <MapPin size={20} aria-hidden="true" />
              <div>
                <h3>Address</h3>
                <p>
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.city}, {siteConfig.address.country}
                </p>
              </div>
            </div>
            <div className="contact-card">
              <Clock size={20} aria-hidden="true" />
              <div>
                <h3>Opening hours</h3>
                <ul className="contact-hours">
                  {visitContent.hours.map((entry) => (
                    <li key={entry.days}><span>{entry.days}</span><span>{entry.hours}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-map">
            {/* DEMO: map is centred on the demo coordinates in siteConfig. */}
            <iframe
              title="Map showing the Sea_Food hotel location"
              src={siteConfig.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="contact-map__note">
              Demo map centred on {siteConfig.address.line1}, {siteConfig.address.city} (
              {siteConfig.coordinates.latitude}, {siteConfig.coordinates.longitude}).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
