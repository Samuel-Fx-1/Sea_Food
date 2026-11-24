import { Link } from 'react-router-dom';
import { Anchor, Fish, HeartHandshake, Leaf } from 'lucide-react';
import heroImage from '../assets/images/image-1.webp';
import { storyContent } from '../data/site';
import { Counter } from '../components/common/Counter';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { Seo } from '../components/common/Seo';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="The story behind Sea_Food: a seaside hotel built around the catch, the coast and the people who visit."
        image={heroImage}
      />
      <PageHero
        eyebrow="Our story"
        title="Rooted in the coast."
        description="Sea_Food began with a simple idea: the best seafood needs very little done to it, and a sea view never hurt either."
        image={heroImage}
      />

      <section className="about-story section-space page-gutter" aria-labelledby="about-story-title">
        <div className="about-story__media">
          <ImageWithFallback
            src={storyContent.image}
            alt={storyContent.imageAlt}
            label="Our story"
            width={900}
            height={1200}
          />
        </div>
        <div className="about-story__content">
          <p className="eyebrow">How it started</p>
          <h2 id="about-story-title">Good food, close to the water.</h2>
          {storyContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <blockquote>{storyContent.quote}</blockquote>
          <span className="about-story__signature">{storyContent.signature}</span>
        </div>
      </section>

      <section className="about-stats section-space" aria-label="Our numbers">
        <div className="page-gutter about-stats__inner">
          <Counter value={24} label="Dishes on the menu" />
          <Counter value={4} label="Rooms by the sea" />
          <Counter value={16} label="Frames in the gallery" />
          <Counter value={6} label="Guest stories" />
        </div>
      </section>

      <section className="about-values section-space page-gutter" aria-labelledby="about-values-title">
        <SectionHeading id="about-values-title" eyebrow="What we believe" title="The simple things, done well" align="center" />
        <div className="feature-row">
          <div><Fish size={24} aria-hidden="true" /><h3>Daily catch</h3><p>We cook what the boats bring in, not what a spreadsheet tells us to.</p></div>
          <div><Leaf size={24} aria-hidden="true" /><h3>Less waste</h3><p>Whole fish, careful prep and a menu that changes with the season.</p></div>
          <div><HeartHandshake size={24} aria-hidden="true" /><h3>Real welcome</h3><p>Familiar faces, unhurried service and a table that is yours for the evening.</p></div>
          <div><Anchor size={24} aria-hidden="true" /><h3>By the sea</h3><p>Every part of the hotel is shaped by the water just outside the door.</p></div>
        </div>
        <div className="about-values__cta">
          <Link className="button button--gold" to="/menu">See what's cooking</Link>
        </div>
      </section>
    </>
  );
}
