import { menuContent } from '../data/menu';
import { DisplayHeading } from './DisplayHeading';
import { MenuCategory } from './MenuCategory';
import { SectionTopline } from './SectionTopline';

export function MenuSection() {
  return (
    <section
      className="menu-section page-gutter"
      id="menu"
      aria-labelledby="menu-title"
    >
      <SectionTopline className="reveal" content={menuContent.topline} />

      <div className="menu-heading reveal">
        <div>
          <p className="overline">{menuContent.overline}</p>
          <DisplayHeading
            as="h2"
            id="menu-title"
            content={menuContent.heading}
          />
        </div>
        <p>{menuContent.description}</p>
      </div>

      <div className="menu-visual reveal">
        <img
          src={menuContent.image}
          alt={menuContent.imageAlt}
          loading="lazy"
          decoding="async"
        />
        <div className="menu-visual-caption">
          {menuContent.caption.map((caption, index) => (
            <span key={`${caption}-${index}`}>{caption}</span>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {menuContent.categories.map((category) => (
          <MenuCategory key={category.numeral} category={category} />
        ))}
      </div>

      <p className="menu-footnote">{menuContent.footnote}</p>
    </section>
  );
}
