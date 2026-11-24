import menuImage from '../assets/images/image-2.webp';
import type { MenuContent } from '../types';

export const menuContent: MenuContent = {
  topline: {
    left: '01\u00A0/\u00A0THE SEASON',
    right: 'AUTUMN — WINTER',
  },
  overline: 'FROM OUR WATERS, WITH INTENTION',
  heading: {
    lines: ['A taste of'],
    emphasis: 'the Atlantic.',
  },
  description:
    'Our menu moves with the coast. We choose what is beautiful today, cook only what it needs, and leave room for one more glass.',
  image: menuImage,
  imageAlt: 'Grilled scarlet prawn served on dark ceramic in warm candlelight',
  caption: ['THE SEA, SIMPLY SERVED', '✦', "CHEF'S TABLE · CHIADO"],
  categories: [
    {
      numeral: 'I',
      title: 'Raw bar',
      note: 'COLD WATER / CLEAN FLAVOURS',
      dishes: [
        {
          name: 'Atlantic oysters',
          note: 'three',
          description: 'Natural, with shallot vinegar and lemon',
          price: 15,
        },
        {
          name: 'Sea bass crudo',
          description: 'Green olive, citrus, sea fennel',
          price: 19,
        },
        {
          name: 'Scarlet prawn tartare',
          description: 'Tomato water, basil, a little heat',
          price: 24,
        },
        {
          name: 'Percebes',
          description: 'Goose barnacles, warm seawater, 100 g',
          price: 29,
        },
      ],
    },
    {
      numeral: 'II',
      title: 'Small plates',
      note: 'FOR THE MIDDLE OF THE TABLE',
      dishes: [
        {
          name: 'Clams à Bulhão Pato',
          description: 'Garlic, coriander, lemon, bread for the sauce',
          price: 19,
        },
        {
          name: 'Crisp cod cheeks',
          description: 'Saffron aioli, pickled fennel',
          price: 17,
        },
        {
          name: 'Charred octopus',
          description: 'Smoked paprika, crushed new potatoes',
          price: 21,
        },
        {
          name: 'Roasted autumn squash',
          description: 'Smoked almond, brown butter, thyme',
          price: 15,
        },
      ],
    },
    {
      numeral: 'III',
      title: 'Mains',
      note: 'THE HEART OF THE EVENING',
      dishes: [
        {
          name: 'Wild sea bass',
          description: 'Grilled whole, lemon leaf, coastal greens',
          price: 34,
        },
        {
          name: 'Atlantic turbot',
          note: 'for two',
          description: 'On the bone, brown butter, capers',
          price: 78,
        },
        {
          name: 'Carabineiro rice',
          description: 'Scarlet prawn, carolino rice, shellfish broth',
          price: 39,
        },
        {
          name: 'Monkfish cataplana',
          description: 'Clams, tomato, white wine, coriander',
          price: 36,
        },
      ],
    },
    {
      numeral: 'IV',
      title: 'Desserts',
      note: 'ONE LAST INDULGENCE',
      dishes: [
        {
          name: 'Pastel de nata mille-feuille',
          description: 'Cinnamon, vanilla custard, crisp pastry',
          price: 12,
        },
        {
          name: 'Olive oil cake',
          description: 'Orange, crème fraîche, sea salt',
          price: 11,
        },
        {
          name: 'Dark chocolate crémeux',
          description: 'Hazelnut, salted caramel',
          price: 12,
        },
        {
          name: 'Pear in vinho verde',
          description: 'Almond cream, lemon zest',
          price: 11,
        },
      ],
    },
  ],
  footnote:
    'The menu follows the catch and may change with the day. Please tell us about allergies when you arrive.',
};
