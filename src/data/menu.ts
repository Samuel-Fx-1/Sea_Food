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
      numeral: 'V',
      title: 'Platters',
      note: 'FOR THE MIDDLE OF THE TABLE',
      dishes: [
        {
          id: 'seafood-platter',
          slug: 'seafood-platter',
          category: 'Platters',
          name: 'Seafood Platter',
          description:
            'A big mixed platter with prawns, fresh oysters, sliced raw fish, lobster tails, crab and mussels, served with lemon wedges, fresh parsley and dipping sauces.',
          ingredients: [
            'prawns',
            'oysters',
            'raw fish slices',
            'lobster tail',
            'crab',
            'mussels',
            'lemon',
            'parsley',
            'dipping sauce',
          ],
          image: '/images/seafood/seafood-platter.png',
          imageAlt:
            'Mixed seafood platter with prawns, oysters, raw fish, lobster tails, crab and mussels with lemon and parsley',
          price: 148, // DEMO: matches the main dish catalogue
        },
        {
          id: 'grilled-seafood-platter',
          slug: 'grilled-seafood-platter',
          category: 'Platters',
          name: 'Grilled Seafood Platter',
          description:
            'Fire-grilled crabs, shrimp and baked scallops with a savory topping, served with baby potatoes and sweet corn.',
          ingredients: [
            'crab',
            'shrimp',
            'scallops',
            'baby potatoes',
            'corn',
            'garlic',
            'herbs',
            'butter',
          ],
          image: '/images/seafood/grilled-seafood-platter.png',
          imageAlt:
            'Grilled crabs, shrimp and baked scallops served with baby potatoes and sweet corn',
          price: 112, // DEMO: matches the main dish catalogue
        },
      ],
    },
    {
      numeral: 'VI',
      title: 'Boils',
      note: 'SPICED / BUTTERY / TO SHARE',
      dishes: [
        {
          id: 'cajun-seafood-boil',
          slug: 'cajun-seafood-boil',
          category: 'Boils',
          name: 'Cajun Seafood Boil',
          description:
            'Lobster tails, shrimp and mussels boiled in Cajun butter spices, served with corn on the cob, lemon, parsley and fresh bread.',
          ingredients: [
            'lobster tail',
            'shrimp',
            'mussels',
            'corn',
            'Cajun spice',
            'butter',
            'lemon',
            'parsley',
            'bread',
          ],
          image: '/images/seafood/cajun-seafood-boil.png',
          imageAlt:
            'Cajun seafood boil with lobster tails, shrimp, mussels, corn, lemon and fresh bread',
          price: 98, // DEMO: matches the main dish catalogue
        },
        {
          id: 'lobster-corn-boil',
          slug: 'lobster-corn-boil',
          category: 'Boils',
          name: 'Lobster and Corn Seafood Boil',
          description:
            'A big shared platter of langoustines, lobster claws, corn, baby potatoes, cherry tomatoes and sausage slices, finished with garlic herb butter and lemon.',
          ingredients: [
            'langoustines',
            'lobster claw',
            'corn',
            'baby potatoes',
            'cherry tomatoes',
            'sausage',
            'garlic butter',
            'herbs',
            'lemon',
          ],
          image: '/images/seafood/lobster-corn-boil.png',
          imageAlt:
            'Shared boil with langoustines, lobster claws, corn, baby potatoes, tomatoes and sausage',
          price: 152, // DEMO: matches the main dish catalogue
        },
      ],
    },
    {
      numeral: 'VII',
      title: 'Grilled',
      note: 'FIRE / SMOKE / HERBS',
      dishes: [
        {
          id: 'spiced-prawns-chickpeas',
          slug: 'spiced-prawns-chickpeas',
          category: 'Grilled',
          name: 'Spiced Prawns with Chickpeas',
          description:
            'Large grilled prawns in a red spice marinade on a warm tomato and chickpea stew, with a spoon of creamy yogurt, lemon wedges and fresh herbs.',
          ingredients: [
            'king prawns',
            'chickpeas',
            'tomato',
            'red spice mix',
            'yogurt',
            'lemon',
            'parsley',
          ],
          image: '/images/seafood/spiced-prawns-chickpeas.png',
          imageAlt:
            'Grilled spiced prawns on tomato and chickpea stew with yogurt, lemon and herbs',
          price: 48, // DEMO: matches the main dish catalogue
        },
      ],
    },
    {
      numeral: 'VIII',
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
