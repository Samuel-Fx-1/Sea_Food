import type { Dish } from '../types';

interface MenuDishProps {
  dish: Dish;
}

export function MenuDish({ dish }: MenuDishProps) {
  return (
    <div className="dish">
      <div className="dish-line">
        <h4>
          {dish.name}
          {dish.note ? <> <small>{dish.note}</small></> : null}
        </h4>
        <span className="dots" />
        <span className="price">€{dish.price}</span>
      </div>
      <p>{dish.description}</p>
    </div>
  );
}
