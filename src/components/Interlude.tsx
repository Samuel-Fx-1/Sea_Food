import { interludeContent } from '../data/site';
import { DisplayHeading } from './DisplayHeading';

export function Interlude() {
  return (
    <section className="interlude" aria-label={interludeContent.ariaLabel}>
      <img
        src={interludeContent.image}
        alt={interludeContent.imageAlt}
        loading="lazy"
        decoding="async"
      />
      <div className="interlude-overlay" />
      <div className="interlude-copy reveal">
        <span className="eyebrow">{interludeContent.eyebrow}</span>
        <DisplayHeading as="p" content={interludeContent.heading} />
        <span className="interlude-ornament">
          {interludeContent.ornament}
        </span>
      </div>
    </section>
  );
}
