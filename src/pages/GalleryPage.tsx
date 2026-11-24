import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import heroImage from '../assets/images/image-5.webp';
import { galleryItems } from '../data/gallery';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { Lightbox } from '../components/gallery/Lightbox';
import { PageHero } from '../components/common/PageHero';
import { Seo } from '../components/common/Seo';
import type { GalleryCategory } from '../types';

const categories: Array<'All' | GalleryCategory> = ['All', 'Seafood', 'Rooms', 'Coast', 'Events'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const close = useCallback((): void => setLightboxIndex(null), []);
  const previous = useCallback((): void => {
    setLightboxIndex((current) =>
      current === null ? null : (current - 1 + visibleItems.length) % visibleItems.length,
    );
  }, [visibleItems.length]);
  const next = useCallback((): void => {
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % visibleItems.length,
    );
  }, [visibleItems.length]);

  return (
    <>
      <Seo
        title="Gallery"
        description="Seafood, rooms, coastline and celebrations — a visual diary of Sea_Food."
        image={heroImage}
      />
      <PageHero
        eyebrow="Gallery"
        title="Moments from the coast."
        description="A visual diary of long lunches, quiet mornings and evenings that ran late."
        image={heroImage}
      />

      <section className="gallery-page section-space page-gutter" aria-label="Photo gallery">
        <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? 'filter-tab is-active' : 'filter-tab'}
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <GalleryGrid items={visibleItems} onSelect={setLightboxIndex} />
      </section>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Lightbox
            items={visibleItems}
            index={lightboxIndex}
            onClose={close}
            onPrevious={previous}
            onNext={next}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
