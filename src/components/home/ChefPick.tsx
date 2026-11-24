import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat } from 'lucide-react';
import { dishes } from '../../data/dishes';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Price } from '../common/Price';

const picks = dishes.filter((dish) => dish.isSignature).slice(0, 4);

export function ChefPick() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % picks.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const dish = picks[index];

  return (
    <section className="chef-pick section-space page-gutter" aria-labelledby="chef-pick-title">
      <div className="chef-pick__card">
        <div className="chef-pick__media">
          <AnimatePresence mode="wait">
            <motion.div
              key={dish.slug}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ImageWithFallback
                src={dish.image}
                alt={dish.imageAlt}
                label={dish.name}
                width={900}
                height={700}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="chef-pick__content">
          <p className="eyebrow"><ChefHat size={15} aria-hidden="true" /> Chef's pick</p>
          <h2 id="chef-pick-title">{dish.name}</h2>
          <p>{dish.description}</p>
          <div className="chef-pick__footer">
            <Price value={dish.price} />
            <Link className="text-link" to={`/menu/${dish.slug}`}>
              See the dish <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="chef-pick__dots" aria-label="Choose a chef's pick">
            {picks.map((pick, pickIndex) => (
              <button
                key={pick.id}
                type="button"
                className={pickIndex === index ? 'dot is-active' : 'dot'}
                aria-label={`Show ${pick.name}`}
                aria-current={pickIndex === index}
                onClick={() => setIndex(pickIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
