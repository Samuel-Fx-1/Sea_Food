import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({ items, index, onClose, onPrevious, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const item = items[index];

  useEffect(() => {
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrevious();
      } else if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) {
          return;
        }
        const distance = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(distance) > 50) {
          if (distance > 0) {
            onPrevious();
          } else {
            onNext();
          }
        }
        touchStart.current = null;
      }}
    >
      <button
        ref={closeRef}
        className="lightbox__close icon-button"
        type="button"
        onClick={onClose}
        aria-label="Close gallery viewer"
      >
        <X size={24} />
      </button>

      <div className="lightbox__stage" onClick={(event) => event.stopPropagation()}>
        <ImageWithFallback
          src={item.src}
          alt={item.alt}
          label={item.category}
          width={item.width}
          height={item.height}
          loading="eager"
        />
      </div>

      <div className="lightbox__bar" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onPrevious} aria-label="Previous image">
          <ChevronLeft size={22} />
        </button>
        <span>
          {index + 1} / {items.length} · {item.category}
        </span>
        <button type="button" onClick={onNext} aria-label="Next image">
          <ChevronRight size={22} />
        </button>
      </div>
      <p className="lightbox__caption" onClick={(event) => event.stopPropagation()}>
        {item.alt}
      </p>
    </motion.div>
  );
}
