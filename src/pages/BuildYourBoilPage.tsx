import heroImage from '../assets/images/image-2.webp';
import { BoilBuilder } from '../components/builder/BoilBuilder';
import { PageHero } from '../components/common/PageHero';
import { Seo } from '../components/common/Seo';

export default function BuildYourBoilPage() {
  return (
    <>
      <Seo
        title="Build Your Boil"
        description="Choose the size, seafood, extras, sauce and heat for your own bag boil, with a live indicative total."
        image={heroImage}
      />
      <PageHero
        eyebrow="Build your boil"
        title="Your bag, your rules."
        description="Five small steps to a table-worthy feast. The total updates as you go, and your creation is saved with your reservation."
        image={heroImage}
      />
      <section className="builder-page section-space page-gutter" aria-label="Bag boil builder">
        <BoilBuilder />
      </section>
    </>
  );
}
