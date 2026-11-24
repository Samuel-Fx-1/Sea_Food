import { useEffect } from 'react';

export function useScrollReveal(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      return;
    }

    const root = document.documentElement;
    root.classList.add('has-js');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px 60px 0px',
      },
    );

    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove('has-js');
    };
  }, []);
}
