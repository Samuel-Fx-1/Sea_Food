import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Flame, Plus, Users } from 'lucide-react';
import { dishes } from '../data/dishes';
import { Badge } from '../components/common/Badge';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { Price } from '../components/common/Price';
import { Seo } from '../components/common/Seo';
import { SpiceMeter } from '../components/common/SpiceMeter';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';

export default function DishDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dish = dishes.find((item) => item.slug === slug);
  const { addItem } = useCart();
  const { openDrawer } = useUi();

  if (!dish) {
    return (
      <section className="page-shell page-gutter">
        <Seo title="Dish not found" description="We could not find that dish." />
        <h1>Dish not found</h1>
        <Link className="button button--gold" to="/menu">Back to the menu</Link>
      </section>
    );
  }

  const addToReservation = (): void => {
    addItem({
      id: dish.slug,
      kind: 'dish',
      name: dish.name,
      unitPrice: dish.price,
      quantity: 1,
    });
    openDrawer();
  };

  return (
    <>
      <Seo title={dish.name} description={dish.description} image={dish.image} />
      <article className="dish-detail page-gutter">
        <Link className="back-link" to="/menu">
          <ArrowLeft size={16} aria-hidden="true" /> Back to menu
        </Link>

        <div className="dish-detail__layout">
          <div className="dish-detail__media">
            <ImageWithFallback
              src={dish.image}
              alt={dish.imageAlt}
              label={dish.name}
              width={1200}
              height={900}
              loading="eager"
            />
            {dish.gallery?.map((image) => (
              <ImageWithFallback
                key={image}
                src={image}
                alt={`${dish.name} detail view`}
                label={dish.name}
                width={800}
                height={600}
              />
            ))}
          </div>

          <div className="dish-detail__content">
            <p className="eyebrow">{dish.category}</p>
            <h1>{dish.name}</h1>
            <div className="dish-detail__badges">
              {dish.isSignature ? <Badge variant="signature">Signature</Badge> : null}
              {dish.isPopular ? <Badge variant="popular">Popular</Badge> : null}
              <SpiceMeter level={dish.spiceLevel} />
            </div>
            <p className="dish-detail__description">{dish.description}</p>
            {dish.note ? <p className="dish-detail__note">{dish.note}</p> : null}

            <dl className="dish-detail__facts">
              <div>
                <dt><Users size={15} aria-hidden="true" /> Serves</dt>
                <dd>{dish.serves}</dd>
              </div>
              <div>
                <dt><Flame size={15} aria-hidden="true" /> Heat</dt>
                <dd>{dish.spiceLevel === 0 ? 'No chilli' : `${dish.spiceLevel} / 3`}</dd>
              </div>
            </dl>

            <div className="dish-detail__section">
              <h2>What's in it</h2>
              <ul className="ingredient-list">
                {dish.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="dish-detail__section">
              <h2>Good with</h2>
              <div className="tag-list">
                {dish.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="dish-detail__order">
              <div>
                <small>Placeholder price</small>
                <Price value={dish.price} placeholder={dish.priceIsPlaceholder} />
              </div>
              <button className="button button--gold" type="button" onClick={addToReservation}>
                <Plus size={16} aria-hidden="true" /> Add to reservation
              </button>
            </div>
            <p className="dish-detail__disclaimer">
              Nothing is charged. Your choice is saved with your table request.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
