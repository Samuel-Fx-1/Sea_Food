import { Star } from 'lucide-react';
import type { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="testimonial-card">
      <div className="testimonial-card__stars" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: testimonial.rating }, (_, index) => (
          <Star key={index} size={14} fill="currentColor" aria-hidden="true" />
        ))}
      </div>
      <blockquote>“{testimonial.quote}”</blockquote>
      <figcaption>
        <strong>{testimonial.name}</strong>
        <span>
          {testimonial.role} · {testimonial.location}
        </span>
      </figcaption>
    </figure>
  );
}
