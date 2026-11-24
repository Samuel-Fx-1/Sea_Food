import menuImage from '../assets/images/image-2.webp';
import { dishes } from '../data/dishes';
import type { DishCategory, HeadingContent, SectionToplineContent } from '../types';
import { DisplayHeading } from './DisplayHeading';
import { MenuCategory } from './MenuCategory';
import { SectionTopline } from './SectionTopline';

const topline: SectionToplineContent = {
  left: '01\u00A0/\u00A0THE SEASON',
  right: 'AUTUMN — WINTER',
};

const heading: HeadingContent = {
  lines: ['A taste of'],
  emphasis: 'the Atlantic.',
};

const caption = ['THE SEA, SIMPLY SERVED', '✦', "CHEF'S TABLE · CHIADO"];

interface MenuGroup {
  numeral: string;
  title: string;
  note: string;
  categories: DishCategory[];
}

const groups: MenuGroup[] = [
  { numeral: 'I', title: 'Raw bar', note: 'COLD WATER / CLEAN FLAVOURS', categories: ['Raw Bar'] },
  { numeral: 'II', title: 'Small plates', note: 'FOR THE MIDDLE OF THE TABLE', categories: ['Small Plates'] },
  { numeral: 'III', title: 'Mains', note: 'THE HEART OF THE EVENING', categories: ['Mains'] },
  { numeral: 'IV', title: 'Starters', note: 'A LITTLE SOMETHING FIRST', categories: ['Starters'] },
  { numeral: 'V', title: 'Platters', note: 'FOR THE MIDDLE OF THE TABLE', categories: ['Platters'] },
  { numeral: 'VI', title: 'Boils', note: 'SPICED / BUTTERY / TO SHARE', categories: ['Crab Boil', 'Bag Boil'] },
  { numeral: 'VII', title: 'Grilled', note: 'FIRE / SMOKE / HERBS', categories: ['Grilled'] },
  { numeral: 'VIII', title: 'Desserts', note: 'ONE LAST INDULGENCE', categories: ['Desserts'] },
];

export function MenuSection() {
  return (
    <section
      className="menu-section page-gutter"
      id="menu"
      aria-labelledby="menu-title"
    >
      <SectionTopline className="reveal" content={topline} />

      <div className="menu-heading reveal">
        <div>
          <p className="overline">FROM OUR WATERS, WITH INTENTION</p>
          <DisplayHeading as="h2" id="menu-title" content={heading} />
        </div>
        <p>
          Our menu moves with the coast. We choose what is beautiful today, cook only what it
          needs, and leave room for one more glass.
        </p>
      </div>

      <div className="menu-visual reveal">
        <img
          src={menuImage}
          alt="Grilled scarlet prawn served on dark ceramic in warm candlelight"
          loading="lazy"
          decoding="async"
        />
        <div className="menu-visual-caption">
          {caption.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {groups.map((group) => (
          <MenuCategory
            key={group.numeral}
            numeral={group.numeral}
            title={group.title}
            note={group.note}
            dishes={dishes.filter((dish) => group.categories.includes(dish.category))}
          />
        ))}
      </div>

      <p className="menu-footnote">
        The menu follows the catch and may change with the day. Please tell us about allergies
        when you arrive.
      </p>
    </section>
  );
}
