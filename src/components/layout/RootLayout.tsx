import { PageTransition } from './PageTransition';
import { ReservationDrawer } from './ReservationDrawer';
import { ScrollToTop } from './ScrollToTop';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <PageTransition />
      <Footer />
      <ReservationDrawer />
    </>
  );
}
