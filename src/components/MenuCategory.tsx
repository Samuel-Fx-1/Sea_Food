import type { MenuCategoryContent } from '../types';
import { MenuDish } from './MenuDish';

interface MenuCategoryProps {
  category: MenuCategoryContent;
}

export function MenuCategory({ category }: MenuCategoryProps) {
  return (
    <div className="menu-category reveal">
      <div className="category-header">
        <span className="category-number">{category.numeral}</span>
        <h3>{category.title}</h3>
        <span className="category-note">{category.note}</span>
      </div>
      <div className="menu-items">
        {category.dishes.map((dish) => (
          <MenuDish key={dish.name} dish={dish} />
        ))}
      </div>
    </div>
  );
}
