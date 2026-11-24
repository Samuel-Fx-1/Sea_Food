import { Link } from 'react-router-dom';
import { Compass, Home, UtensilsCrossed } from 'lucide-react';
import { Seo } from '../components/common/Seo';

export default function NotFoundPage() {
  return (
    <section className="not-found page-gutter" aria-labelledby="not-found-title">
      <Seo title="Page not found" description="That page has drifted out to sea." />
      <div>
        <p className="not-found__code" aria-hidden="true">404</p>
        <p className="eyebrow">Off the map</p>
        <h1 id="not-found-title">This page drifted out to sea.</h1>
        <p>
          The link may have moved, or the tide may have taken it. Let’s get you
          back to the good part.
        </p>
        <div className="not-found__links">
          <Link className="button button--gold" to="/">
            <Home size={16} aria-hidden="true" /> Back to shore
          </Link>
          <Link className="button button--outline" to="/menu">
            <UtensilsCrossed size={16} aria-hidden="true" /> See the menu
          </Link>
          <Link className="button button--outline" to="/contact">
            <Compass size={16} aria-hidden="true" /> Find us
          </Link>
        </div>
      </div>
    </section>
  );
}
