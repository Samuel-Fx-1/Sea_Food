import heroImage from '../assets/images/image-1.webp';
import { Seo } from '../components/common/Seo';
import { HomeHero } from '../components/home/HomeHero';
import { FeaturedDishes } from '../components/home/FeaturedDishes';
import { BuildTeaser } from '../components/home/BuildTeaser';
import { RoomsPreview } from '../components/home/RoomsPreview';
import { ChefPick } from '../components/home/ChefPick';
import { TestimonialsCarousel } from '../components/home/TestimonialsCarousel';
import { GalleryStrip } from '../components/home/GalleryStrip';
import { HomeCta } from '../components/home/HomeCta';
import { Intro } from '../components/Intro';
import { MenuSection } from '../components/MenuSection';
import { Interlude } from '../components/Interlude';
import { Story } from '../components/Story';
import { Visit } from '../components/Visit';
import { Reservations } from '../components/Reservations';

export default function HomePage() {
  return (
    <>
      <Seo
        title="Home"
        description="Sea_Food Hotel & Resort — seaside rooms, Atlantic seafood and slow days by the water."
        image={heroImage}
      />
      <HomeHero />
      <Intro />
      <MenuSection />
      <FeaturedDishes />
      <BuildTeaser />
      <RoomsPreview />
      <ChefPick />
      <TestimonialsCarousel />
      <GalleryStrip />
      <Interlude />
      <Story />
      <Visit />
      <HomeCta />
      <Reservations />
    </>
  );
}
