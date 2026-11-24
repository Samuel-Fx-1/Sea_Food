import type { Dish } from '../../types';
import { DishCard } from '../cards/DishCard';

interface DishGridProps {
  dishes: Dish[];
  emptyMessage?: string;
}

export function DishGrid({
  dishes,
  emptyMessage = 'No dishes match that search. Try another term.',
}: DishGridProps) {
  if (dishes.length === 0) {
    return <p className="dish-grid__empty">{emptyMessage}</p>;
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
