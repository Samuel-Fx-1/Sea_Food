import { useRef } from 'react';
import { heroContent } from '../data/site';
import { useHeroParallax } from '../hooks/useHeroParallax';
import { DisplayHeading } from './DisplayHeading';
import { TextLink } from './TextLink';

export function Hero() {
  const imageRef = useRef<HTMLImageElement>(null);
  useHeroParallax(imageRef);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img
          ref={imageRef}
          src={heroContent.image}
          alt={heroContent.imageAlt}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content page-gutter">
        <div className="hero-line">
          <span className="line" />
          <span className="eyebrow">{heroContent.eyebrow}</span>
        </div>
        <DisplayHeading
          as="h1"
          id="hero-title"
          content={heroContent.heading}
        />
        <p>{heroContent.description}</p>
        <TextLink className="hero-link" link={heroContent.cta} />
      </div>

      <div className="hero-foot page-gutter">
        <span>{heroContent.footLeft}</span>
        <a href="#intro" aria-label="Scroll to discover Ondine">
          {heroContent.scrollLabel}{' '}
          <span className="scroll-line" aria-hidden="true" />
        </a>
        <span>{heroContent.footRight}</span>
      </div>
    </section>
  );
}
