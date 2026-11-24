import { introContent } from '../data/site';
import { DisplayHeading } from './DisplayHeading';
import { TextLink } from './TextLink';

export function Intro() {
  return (
    <section
      className="intro page-gutter"
      id="intro"
      aria-labelledby="intro-title"
    >
      <div className="intro-kicker reveal">
        <span className="small-star" aria-hidden="true">
          ✦
        </span>
        <span>{introContent.kicker}</span>
      </div>

      <div className="intro-main reveal">
        <DisplayHeading
          as="h2"
          id="intro-title"
          content={introContent.heading}
        />
        <div className="intro-copy">
          {introContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <TextLink link={introContent.cta} />
        </div>
      </div>

      <div className="intro-bottom" aria-hidden="true">
        <span>{introContent.bottomLabel}</span>
        <span>{introContent.bottomMark}</span>
      </div>
    </section>
  );
}
