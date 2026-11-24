import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../config/site';
import { useCart } from '../../context/CartContext';
import { useUi } from '../../context/UiContext';
import type {
  AddOnChoice,
  BoilConfiguration,
  SauceChoice,
  SeafoodChoice,
  SpiceChoice,
} from '../../types';
import {
  addOnChoices,
  calculateBoilPrice,
  createDefaultBoil,
  sauceChoices,
  seafoodChoices,
  sizePrices,
  spiceChoices,
} from '../../utils/boilPricing';
import { BagIllustration } from './BagIllustration';

const steps = ['Size', 'Seafood', 'Extras', 'Sauce & heat', 'Review'];

function toggle<T extends string>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function choiceClass(selected: boolean): string {
  return selected ? 'choice-card is-selected' : 'choice-card';
}

export function BoilBuilder() {
  const [step, setStep] = useState(0);
  const [configuration, setConfiguration] = useState<BoilConfiguration>(createDefaultBoil);
  const { addItem } = useCart();
  const { openDrawer } = useUi();
  const total = calculateBoilPrice(configuration);
  const hasSeafood = configuration.seafood.length > 0;

  const setField = <K extends keyof BoilConfiguration>(
    key: K,
    value: BoilConfiguration[K],
  ): void => {
    setConfiguration((current) => ({ ...current, [key]: value }));
  };

  const addToReservation = (): void => {
    if (!hasSeafood) {
      setStep(1);
      return;
    }
    addItem({
      id: `boil-${configuration.size}-${configuration.seafood.join('-')}-${configuration.sauce}`,
      kind: 'boil',
      name: `${configuration.size} Bag Boil`,
      unitPrice: total,
      quantity: 1,
      configuration: { ...configuration },
    });
    openDrawer();
  };

  return (
    <div className="boil-builder">
      <ol className="boil-builder__steps" aria-label="Builder steps">
        {steps.map((label, index) => (
          <li key={label} className={index === step ? 'is-current' : index < step ? 'is-done' : ''}>
            <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <div className="boil-builder__layout">
        <div className="boil-builder__panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28 }}
            >
              {step === 0 ? (
                <fieldset className="builder-fieldset">
                  <legend><h2>How many are feeding?</h2></legend>
                  <p>Choose the bag size. You can change everything later.</p>
                  <div className="choice-grid">
                    {(Object.keys(sizePrices) as BoilConfiguration['size'][]).map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={choiceClass(configuration.size === size)}
                        aria-pressed={configuration.size === size}
                        onClick={() => setField('size', size)}
                      >
                        <strong>{size}</strong>
                        <span>{formatPrice(sizePrices[size])} base</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 1 ? (
                <fieldset className="builder-fieldset">
                  <legend><h2>Pick your catch</h2></legend>
                  <p>Choose at least one. Everything is priced per addition.</p>
                  <div className="choice-grid choice-grid--dense">
                    {seafoodChoices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className={choiceClass(configuration.seafood.includes(choice))}
                        aria-pressed={configuration.seafood.includes(choice)}
                        onClick={() =>
                          setField('seafood', toggle<SeafoodChoice>(configuration.seafood, choice))
                        }
                      >
                        <strong>{choice}</strong>
                        {configuration.seafood.includes(choice) ? <Check size={15} /> : null}
                      </button>
                    ))}
                  </div>
                  {!hasSeafood ? (
                    <p className="builder-error" role="alert">Choose at least one seafood to continue.</p>
                  ) : null}
                </fieldset>
              ) : null}

              {step === 2 ? (
                <fieldset className="builder-fieldset">
                  <legend><h2>Add the extras</h2></legend>
                  <p>Corn, potatoes and sausage are the classics. Take them all.</p>
                  <div className="choice-grid choice-grid--dense">
                    {addOnChoices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className={choiceClass(configuration.addOns.includes(choice))}
                        aria-pressed={configuration.addOns.includes(choice)}
                        onClick={() =>
                          setField('addOns', toggle<AddOnChoice>(configuration.addOns, choice))
                        }
                      >
                        <strong>{choice}</strong>
                        {configuration.addOns.includes(choice) ? <Check size={15} /> : null}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 3 ? (
                <fieldset className="builder-fieldset">
                  <legend><h2>Sauce &amp; heat</h2></legend>
                  <p>Our house sauce carries a small surcharge. Everything else is included.</p>
                  <div className="choice-grid">
                    {sauceChoices.map((choice: SauceChoice) => (
                      <button
                        key={choice}
                        type="button"
                        className={choiceClass(configuration.sauce === choice)}
                        aria-pressed={configuration.sauce === choice}
                        onClick={() => setField('sauce', choice)}
                      >
                        <strong>{choice}</strong>
                      </button>
                    ))}
                  </div>
                  <div className="choice-grid choice-grid--dense builder-spice">
                    {spiceChoices.map((choice: SpiceChoice) => (
                      <button
                        key={choice}
                        type="button"
                        className={choiceClass(configuration.spice === choice)}
                        aria-pressed={configuration.spice === choice}
                        onClick={() => setField('spice', choice)}
                      >
                        <strong>{choice}</strong>
                      </button>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              {step === 4 ? (
                <div className="builder-review">
                  <h2>Your bag boil</h2>
                  <dl>
                    <div><dt>Size</dt><dd>{configuration.size}</dd></div>
                    <div><dt>Seafood</dt><dd>{configuration.seafood.join(', ') || 'None selected'}</dd></div>
                    <div><dt>Extras</dt><dd>{configuration.addOns.join(', ') || 'None'}</dd></div>
                    <div><dt>Sauce</dt><dd>{configuration.sauce}</dd></div>
                    <div><dt>Heat</dt><dd>{configuration.spice}</dd></div>
                  </dl>
                  <button className="button button--gold" type="button" onClick={addToReservation}>
                    <ShoppingBag size={16} aria-hidden="true" /> Add to my reservation
                  </button>
                  <p className="builder-note">
                    All builder prices are indicative placeholders. Nothing is charged.
                  </p>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="boil-builder__nav">
            <button
              className="button button--ghost"
              type="button"
              disabled={step === 0}
              onClick={() => setStep((current) => Math.max(0, current - 1))}
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button
                className="button button--gold"
                type="button"
                disabled={step === 1 && !hasSeafood}
                onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
              >
                Next <ArrowRight size={16} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        <aside className="boil-builder__summary" aria-label="Live bag boil summary">
          <BagIllustration configuration={configuration} total={total} />
          <div className="boil-builder__total">
            <span>Live total</span>
            <strong>{formatPrice(total)}</strong>
            <small>Indicative · TODO confirm final pricing</small>
          </div>
          <ul className="boil-builder__list">
            <li>{configuration.size} bag · {configuration.seafood.length} seafood</li>
            <li>{configuration.addOns.length} extras · {configuration.sauce}</li>
            <li>Heat: {configuration.spice}</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
