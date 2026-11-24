import type { MenuCategoryContent } from '../types';
import { MenuDish } from './MenuDish';

interface MenuCategoryProps {
  category: MenuCategoryContent;
}

export function MenuCategory({ category }: MenuCategoryProps) {
  const hasCards = category.dishes.some((dish) => dish.image);

  return (
    <div
      className={hasCards ? 'menu-category menu-category--cards reveal' : 'menu-category reveal'}
    >
      <div className="category-header">
        <span className="category-number">{category.numeral}</span>
        <h3>{category.title}</h3>
        <span className="category-note">{category.note}</span>
      </div>
      <div className="menu-items">
        {category.dishes.map((dish) => (
          <MenuDish key={dish.id ?? dish.name} dish={dish} />
        ))}
      </div>
    </div>
  );
}
