import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const DishDetailPage = lazy(() => import('./pages/DishDetailPage'));
const BuildYourBoilPage = lazy(() => import('./pages/BuildYourBoilPage'));
const RoomsPage = lazy(() => import('./pages/RoomsPage'));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ExperiencesPage = lazy(() => import('./pages/ExperiencesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Suspense fallback={<div className="route-loader">Loading the coast…</div>}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/:slug" element={<DishDetailPage />} />
          <Route path="build-your-boil" element={<BuildYourBoilPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="reservations/confirmation" element={<ConfirmationPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
