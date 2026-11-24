import type { Dish } from '../types';
import { formatPrice } from '../config/site';
import { ImageWithFallback } from './common/ImageWithFallback';

interface MenuDishProps {
  dish: Dish;
}

export function MenuDish({ dish }: MenuDishProps) {
  return (
    <div className={dish.image ? 'dish dish--card' : 'dish'}>
      {dish.image ? (
        <div className="dish-media">
          <ImageWithFallback
            src={dish.image}
            alt={dish.imageAlt}
            label={dish.name}
            width={900}
            height={600}
          />
        </div>
      ) : null}
      <div className="dish-line">
        <h4>
          {dish.name}
          {dish.note ? <> <small>{dish.note}</small></> : null}
        </h4>
        <span className="dots" />
        <span className="price">{formatPrice(dish.price)}</span>
      </div>
      <p>{dish.description}</p>
      {dish.ingredients.length ? (
        <p className="dish-ingredients">{dish.ingredients.join(' · ')}</p>
      ) : null}
    </div>
  );
}
