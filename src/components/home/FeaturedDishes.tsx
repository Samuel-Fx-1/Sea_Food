import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { dishes } from '../../data/dishes';
import { DishCard } from '../cards/DishCard';
import { SectionHeading } from '../common/SectionHeading';

export function FeaturedDishes() {
  const featured = dishes
    .filter((dish) => dish.isSignature || dish.isPopular)
    .slice(0, 6);

  return (
    <section className="featured-dishes section-space page-gutter" aria-labelledby="featured-dishes-title">
      <div className="section-heading-row">
        <SectionHeading
          id="featured-dishes-title"
          eyebrow="From the kitchen"
          title="Dishes worth travelling for"
          description="A small selection of the plates our guests come back for. Every price shown here is a placeholder until the final menu is confirmed."
        />
        <Link className="text-link" to="/menu">
          Full menu <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="dish-grid">
        {featured.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
