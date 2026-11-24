import type { Dish } from '../types';
import { MenuDish } from './MenuDish';

interface MenuCategoryProps {
  numeral: string;
  title: string;
  note: string;
  dishes: Dish[];
}

export function MenuCategory({ numeral, title, note, dishes }: MenuCategoryProps) {
  const hasCards = dishes.some((dish) => dish.image);

  return (
    <div
      className={hasCards ? 'menu-category menu-category--cards reveal' : 'menu-category reveal'}
    >
      <div className="category-header">
        <span className="category-number">{numeral}</span>
        <h3>{title}</h3>
        <span className="category-note">{note}</span>
      </div>
      <div className="menu-items">
        {dishes.map((dish) => (
          <MenuDish key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}
