import { Link } from 'react-router-dom';
import { ArrowRight, PackageOpen } from 'lucide-react';
import heroImage from '../../assets/images/image-2.webp';
import { ImageWithFallback } from '../common/ImageWithFallback';

export function BuildTeaser() {
  return (
    <section className="build-teaser section-space" aria-labelledby="build-teaser-title">
      <div className="build-teaser__media">
        <ImageWithFallback
          src={heroImage}
          alt="Seafood boil poured from a paper bag onto a shared table"
          label="Build your boil"
          width={1200}
          height={900}
        />
      </div>
      <div className="build-teaser__content page-gutter">
        <p className="eyebrow">Make it yours</p>
        <h2 id="build-teaser-title">Build a bag boil, your way.</h2>
        <p>
          Pick your size, choose the catch, add the extras and dial in the heat.
          Our builder keeps a running total as you go, so you can dream up the
          perfect table feast before you arrive.
        </p>
        <ul className="check-list">
          <li><PackageOpen size={16} aria-hidden="true" /> Six ways to fill the bag</li>
          <li><PackageOpen size={16} aria-hidden="true" /> Four sauces and four heat levels</li>
          <li><PackageOpen size={16} aria-hidden="true" /> Saved with your reservation</li>
        </ul>
        <Link className="button button--gold" to="/build-your-boil">
          Start building <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
