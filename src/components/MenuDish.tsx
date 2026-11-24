import { formatPrice } from '../config/site';
import type { LegacyDish } from '../types';

interface MenuDishProps {
  dish: LegacyDish;
}

export function MenuDish({ dish }: MenuDishProps) {
  return (
    <div className={dish.image ? 'dish dish--card' : 'dish'}>
      {dish.image ? (
        <div className="dish-media">
          <img
            src={dish.image}
            alt={dish.imageAlt ?? dish.name}
            loading="lazy"
            decoding="async"
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
      {dish.ingredients?.length ? (
        <p className="dish-ingredients">{dish.ingredients.join(' · ')}</p>
      ) : null}
    </div>
  );
}
