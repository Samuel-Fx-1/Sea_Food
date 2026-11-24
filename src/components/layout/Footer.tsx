import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AtSign, Camera, MessageCircle, Send } from 'lucide-react';
import { navigation, siteConfig } from '../../config/site';

const socialIcons = {
  instagram: Camera,
  facebook: MessageCircle,
  twitter: AtSign,
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__top page-gutter">
        <div className="site-footer__brand">
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h2>{siteConfig.shortName}</h2>
          <p className="site-footer__address">
            {siteConfig.address.line1}
            <br />
            {siteConfig.address.line2}
            <br />
            {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <div className="site-footer__contact">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>

        <div className="site-footer__links">
          <h3>Explore</h3>
          {navigation.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="site-footer__newsletter">
          <h3>Sea letters</h3>
          <p>Seasonal menus, events and quiet offers. No noise.</p>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" aria-label="Subscribe">
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
          {subscribed ? (
            <p className="site-footer__success" role="status">
              Thank you — you’re on the list.
            </p>
          ) : null}
          <div className="site-footer__social">
            {siteConfig.social.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="site-footer__bottom page-gutter">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </span>
        <span>Made for the coast · TODO: add legal links</span>
      </div>
    </footer>
  );
}
