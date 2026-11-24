import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Soup } from 'lucide-react';
import heroImage from '../assets/images/image-2.webp';
import { dishes } from '../data/dishes';
import { PageHero } from '../components/common/PageHero';
import { Seo } from '../components/common/Seo';
import { DishGrid } from '../components/menu/DishGrid';
import { MenuFilters, type SortOption } from '../components/menu/MenuFilters';
import type { DishCategory } from '../types';

export default function MenuPage() {
  const [category, setCategory] = useState<'All' | DishCategory>('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('featured');

  const visibleDishes = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const result = dishes.filter((dish) => {
      const matchesCategory = category === 'All' || dish.category === category;
      const matchesSearch =
        needle.length === 0 ||
        dish.name.toLowerCase().includes(needle) ||
        dish.description.toLowerCase().includes(needle) ||
        dish.ingredients.some((ingredient) => ingredient.toLowerCase().includes(needle)) ||
        dish.tags.some((tag) => tag.toLowerCase().includes(needle));
      return matchesCategory && matchesSearch;
    });

    if (sort === 'name') {
      return [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'price-asc' || sort === 'price-desc') {
      const direction = sort === 'price-asc' ? 1 : -1;
      return [...result].sort((a, b) => (a.price - b.price) * direction);
    }

    return [...result].sort((a, b) => {
      const score = (dish: typeof a): number =>
        (dish.isSignature ? 2 : 0) + (dish.isPopular ? 1 : 0);
      return score(b) - score(a);
    });
  }, [category, search, sort]);

  return (
    <>
      <Seo
        title="Menu"
        description="Browse crab boils, bag boils, platters, grilled dishes and starters from the Sea_Food kitchen."
        image={heroImage}
      />
      <PageHero
        eyebrow="The menu"
        title="From our waters, with intention."
        description="Twenty-nine ways to enjoy the Atlantic. Filter by category, search an ingredient, or build a bag boil from scratch."
        image={heroImage}
      />

      <section className="menu-page section-space page-gutter" aria-label="Full menu">
        <p className="notice" role="note">
          <Soup size={16} aria-hidden="true" />
          All prices are realistic demo values, marked with DEMO comments in the source.
        </p>
        <MenuFilters
          category={category}
          search={search}
          sort={sort}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
          onSortChange={setSort}
        />
        <p className="menu-page__count" role="status">
          Showing {visibleDishes.length} of {dishes.length} dishes
        </p>
        <DishGrid dishes={visibleDishes} />

        <div className="menu-page__cta">
          <div>
            <p className="eyebrow">Want it your way?</p>
            <h2>Choose the catch, sauce and heat yourself.</h2>
          </div>
          <Link className="button button--gold" to="/build-your-boil">
            Build your boil <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
