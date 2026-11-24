import type { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <img className="page-hero__image" src={image} alt="" aria-hidden="true" />
      <div className="page-hero__shade" aria-hidden="true" />
      <div className="page-hero__content page-gutter">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__description">{description}</p>
        {children}
      </div>
    </section>
  );
}
