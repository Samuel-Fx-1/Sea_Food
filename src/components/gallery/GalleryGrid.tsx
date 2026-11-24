import type { GalleryItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GalleryGridProps {
  items: GalleryItem[];
  onSelect: (index: number) => void;
}

export function GalleryGrid({ items, onSelect }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item, index) => (
        <button
          key={item.id}
          className="gallery-tile"
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Open image: ${item.alt}`}
        >
          <ImageWithFallback
            src={item.src}
            alt={item.alt}
            label={item.category}
            width={item.width}
            height={item.height}
          />
          <span>{item.category}</span>
        </button>
      ))}
    </div>
  );
}
