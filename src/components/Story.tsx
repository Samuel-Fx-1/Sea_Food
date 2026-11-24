import { storyContent } from '../data/site';
import { DisplayHeading } from './DisplayHeading';
import { SectionTopline } from './SectionTopline';

export function Story() {
  return (
    <section
      className="story-section page-gutter"
      id="story"
      aria-labelledby="story-title"
    >
      <SectionTopline className="reveal" content={storyContent.topline} />

      <div className="story-layout">
        <div className="story-photo reveal">
          <img
            src={storyContent.image}
            alt={storyContent.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <span>{storyContent.imageCaption}</span>
        </div>

        <div className="story-content reveal">
          <p className="overline">{storyContent.overline}</p>
          <DisplayHeading
            as="h2"
            id="story-title"
            content={storyContent.heading}
          />
          {storyContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote>{storyContent.quote}</blockquote>
          <span className="story-signature">{storyContent.signature}</span>
        </div>
      </div>
    </section>
  );
}
