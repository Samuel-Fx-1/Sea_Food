import { useEffect, type RefObject } from 'react';

export function useHeroParallax(
  imageRef: RefObject<HTMLImageElement | null>,
): void {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 761px)').matches
    ) {
      return;
    }

    const image = imageRef.current;

    if (!image) {
      return;
    }

    let frame: number | null = null;

    const handleScroll = (): void => {
      if (frame !== null || window.scrollY > window.innerHeight * 1.4) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        image.style.transform = `translate3d(0, ${Math.min(
          window.scrollY * 0.13,
          105,
        )}px, 0)`;
        frame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      image.style.transform = '';
    };
  }, [imageRef]);
}
