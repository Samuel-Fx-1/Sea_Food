import { Fragment } from 'react';
import { visitContent } from '../data/site';
import { DisplayHeading } from './DisplayHeading';
import { SectionTopline } from './SectionTopline';
import { TextLink } from './TextLink';

export function Visit() {
  return (
    <section
      className="visit-section page-gutter"
      id="visit"
      aria-labelledby="visit-title"
    >
      <SectionTopline className="reveal" content={visitContent.topline} />

      <div className="visit-layout">
        <div className="visit-content reveal">
          <p className="overline">{visitContent.overline}</p>
          <DisplayHeading
            as="h2"
            id="visit-title"
            content={visitContent.heading}
          />
          <p className="visit-lede">{visitContent.lede}</p>

          <div className="visit-details">
            <div>
              <h3>{visitContent.addressTitle}</h3>
              <p>
                {visitContent.addressLines.map((line, index) => (
                  <Fragment key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </Fragment>
                ))}
              </p>
              <TextLink link={visitContent.mapLink} />
            </div>

            <div>
              <h3>{visitContent.hoursTitle}</h3>
              <dl className="hours">
                {visitContent.hours.map((hour) => (
                  <div key={hour.days}>
                    <dt>{hour.days}</dt>
                    <dd>{hour.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <p className="walkins">{visitContent.walkins}</p>
        </div>

        <div className="visit-photo reveal">
          <img
            src={visitContent.image}
            alt={visitContent.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <span>{visitContent.imageCaption}</span>
        </div>
      </div>
    </section>
  );
}
