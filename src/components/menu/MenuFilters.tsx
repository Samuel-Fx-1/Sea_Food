import { Search } from 'lucide-react';
import type { DishCategory } from '../../types';

export const menuCategories: Array<'All' | DishCategory> = [
  'All',
  'Crab Boil',
  'Bag Boil',
  'Platters',
  'Grilled',
  'Starters',
  'Raw Bar',
  'Small Plates',
  'Mains',
  'Desserts',
];

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

interface MenuFiltersProps {
  category: 'All' | DishCategory;
  search: string;
  sort: SortOption;
  onCategoryChange: (category: 'All' | DishCategory) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

export function MenuFilters({
  category,
  search,
  sort,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: MenuFiltersProps) {
  return (
    <div className="menu-filters">
      <div className="menu-filters__tabs" role="tablist" aria-label="Dish categories">
        {menuCategories.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            className={category === item ? 'filter-tab is-active' : 'filter-tab'}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="menu-filters__tools">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search dishes</span>
          <input
            type="search"
            placeholder="Search the menu…"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>
        <label className="sort-field">
          <span className="sr-only">Sort dishes</span>
          <select value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}
