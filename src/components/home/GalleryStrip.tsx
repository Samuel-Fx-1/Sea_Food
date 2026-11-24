import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { galleryItems } from '../../data/gallery';
import { ImageWithFallback } from '../common/ImageWithFallback';

export function GalleryStrip() {
  return (
    <section className="gallery-strip section-space" aria-labelledby="gallery-strip-title">
      <div className="page-gutter gallery-strip__heading">
        <p className="eyebrow">Life by the water</p>
        <h2 id="gallery-strip-title">A few moments from the coast</h2>
        <Link className="text-link" to="/gallery">
          Open the gallery <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="gallery-strip__grid">
        {galleryItems.slice(0, 6).map((item) => (
          <Link key={item.id} to="/gallery" aria-label={`View gallery: ${item.alt}`}>
            <ImageWithFallback
              src={item.src}
              alt={item.alt}
              label={item.category}
              width={item.width}
              height={item.height}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
