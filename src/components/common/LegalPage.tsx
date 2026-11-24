import heroImage from '../../assets/images/image-1.webp';
import { PageHero } from './PageHero';
import { Seo } from './Seo';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  seoDescription: string;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow,
  title,
  description,
  seoDescription,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Seo title={title} description={seoDescription} image={heroImage} />
      <PageHero eyebrow={eyebrow} title={title} description={description} image={heroImage} />
      <div className="legal-page section-space page-gutter">
        {sections.map((section) => (
          <section className="legal-page__section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
