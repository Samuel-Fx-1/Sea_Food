import { Link } from 'react-router-dom';
import type { Dish } from '../../types';
import { Badge } from '../common/Badge';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Price } from '../common/Price';
import { SpiceMeter } from '../common/SpiceMeter';

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  return (
    <article className="dish-card">
      <Link className="dish-card__media" to={`/menu/${dish.slug}`}>
        <ImageWithFallback
          src={dish.image}
          alt={dish.imageAlt}
          label={dish.name}
          width={800}
          height={600}
        />
        <div className="dish-card__badges">
          {dish.isSignature ? <Badge variant="signature">Signature</Badge> : null}
          {dish.isPopular ? <Badge variant="popular">Popular</Badge> : null}
        </div>
      </Link>

      <div className="dish-card__body">
        <div className="dish-card__topline">
          <span className="dish-card__category">{dish.category}</span>
          <SpiceMeter level={dish.spiceLevel} compact />
        </div>
        <h3>
          <Link to={`/menu/${dish.slug}`}>{dish.name}</Link>
        </h3>
        <p>{dish.description}</p>
        <div className="dish-card__footer">
          <span className="dish-card__serves">{dish.serves}</span>
          <Price value={dish.price} placeholder={dish.priceIsPlaceholder} />
        </div>
      </div>
    </article>
  );
}
