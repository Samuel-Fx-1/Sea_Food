import type {
  AddOnChoice,
  BoilConfiguration,
  BoilSize,
  SauceChoice,
  SeafoodChoice,
} from '../types';

export const boilSizes: BoilSize[] = ['Couples', 'Family', 'Party'];
export const seafoodChoices: SeafoodChoice[] = [
  'crab',
  'shrimp',
  'lobster tail',
  'mussels',
  'clams',
  'crawfish',
];
export const addOnChoices: AddOnChoice[] = [
  'corn',
  'potatoes',
  'sausage',
  'boiled eggs',
];
export const sauceChoices: SauceChoice[] = [
  'Cajun',
  'Garlic Butter',
  'Lemon Pepper',
  'House Special',
];
export const spiceChoices = ['Mild', 'Medium', 'Hot', 'Extra Hot'] as const;

/** DEMO: base bag prices. Couples/Family match the Couples and Family bag boil dishes. */
export const sizePrices: Record<BoilSize, number> = {
  Couples: 52, // DEMO: 2 guests
  Family: 96, // DEMO: 4–5 guests
  Party: 168, // DEMO: 8 guests
};

/** DEMO: supplement charged per selected seafood. */
export const seafoodPrices: Record<SeafoodChoice, number> = {
  crab: 18, // DEMO
  shrimp: 9, // DEMO
  'lobster tail': 16, // DEMO
  mussels: 6, // DEMO
  clams: 7, // DEMO
  crawfish: 11, // DEMO
};

/** DEMO: supplement charged per selected extra. */
export const addOnPrices: Record<AddOnChoice, number> = {
  corn: 3, // DEMO
  potatoes: 4, // DEMO
  sausage: 5, // DEMO
  'boiled eggs': 3, // DEMO
};

/** DEMO: sauces are included except the house special. */
export const saucePrices: Record<SauceChoice, number> = {
  Cajun: 0,
  'Garlic Butter': 0,
  'Lemon Pepper': 0,
  'House Special': 2, // DEMO: house sauce surcharge
};

export function calculateBoilPrice(configuration: BoilConfiguration): number {
  const seafoodTotal = configuration.seafood.reduce(
    (total, choice) => total + seafoodPrices[choice],
    0,
  );
  const addOnTotal = configuration.addOns.reduce(
    (total, choice) => total + addOnPrices[choice],
    0,
  );

  return (
    sizePrices[configuration.size] +
    seafoodTotal +
    addOnTotal +
    saucePrices[configuration.sauce]
  );
}

export function createDefaultBoil(): BoilConfiguration {
  return {
    size: 'Couples',
    seafood: ['crab', 'shrimp'],
    addOns: ['corn', 'potatoes'],
    sauce: 'Cajun',
    spice: 'Medium',
  };
}
