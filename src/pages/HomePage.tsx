import { useScrollReveal } from '../hooks/useScrollReveal';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import { Interlude } from '../components/Interlude';
import { Intro } from '../components/Intro';
import { MenuSection } from '../components/MenuSection';
import { Navbar } from '../components/Navbar';
import { Reservations } from '../components/Reservations';
import { Story } from '../components/Story';
import { Visit } from '../components/Visit';

export function HomePage() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Intro />
        <MenuSection />
        <Interlude />
        <Story />
        <Visit />
        <Reservations />
      </main>
      <Footer />
    </>
  );
}
