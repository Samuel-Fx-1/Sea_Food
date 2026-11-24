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

/** Indicative prices only. TODO: confirm final builder pricing. */
export const sizePrices: Record<BoilSize, number> = {
  Couples: 48, // TODO: set real price
  Family: 92, // TODO: set real price
  Party: 148, // TODO: set real price
};

/** Indicative supplement per seafood choice. TODO: confirm final pricing. */
export const seafoodPrices: Record<SeafoodChoice, number> = {
  crab: 18, // TODO: set real price
  shrimp: 9, // TODO: set real price
  'lobster tail': 16, // TODO: set real price
  mussels: 6, // TODO: set real price
  clams: 7, // TODO: set real price
  crawfish: 11, // TODO: set real price
};

/** Indicative add-on prices. TODO: confirm final pricing. */
export const addOnPrices: Record<AddOnChoice, number> = {
  corn: 3, // TODO: set real price
  potatoes: 4, // TODO: set real price
  sausage: 5, // TODO: set real price
  'boiled eggs': 3, // TODO: set real price
};

/** Sauces are included; the record keeps pricing explicit for future changes. */
export const saucePrices: Record<SauceChoice, number> = {
  Cajun: 0,
  'Garlic Butter': 0,
  'Lemon Pepper': 0,
  'House Special': 2, // TODO: confirm house special surcharge
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
