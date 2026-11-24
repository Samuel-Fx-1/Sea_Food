import type { HotelEvent } from '../types';

export const events: HotelEvent[] = [
  {
    id: 'sunset-beach-dinner',
    slug: 'sunset-beach-dinner',
    title: 'Sunset Beach Dinner',
    category: 'Dining',
    description:
      'A long-table dinner on the sand as the sun goes down. Five courses built around the days catch, with cold wine, warm bread and nothing between you and the horizon.',
    image: '/images/events/sunset-beach-dinner.jpg',
    imageAlt: 'Long dinner table set on the beach at sunset with candlelight and sea views',
    duration: '3 hours',
    capacity: 'Up to 40 guests',
    priceFrom: 0, // TODO: set real price
  },
  {
    id: 'seaside-wedding',
    slug: 'seaside-wedding',
    title: 'Seaside Wedding',
    category: 'Celebrations',
    description:
      'Exchange vows beside the water and gather everyone for a seafood feast under the stars. Our team shapes the day around you, from the first cocktail to the last plate.',
    image: '/images/events/seaside-wedding.jpg',
    imageAlt: 'Wedding celebration by the sea with guests seated at decorated outdoor tables',
    duration: 'Full day',
    capacity: 'Up to 120 guests',
    priceFrom: 0, // TODO: set real price
  },
  {
    id: 'family-weekend',
    slug: 'family-weekend',
    title: 'Family Weekend',
    category: 'Family',
    description:
      'Two easy days of beach walks, shared platters and time together. Rooms, meals and a guided shoreline exploration are bundled into one relaxed escape for all ages.',
    image: '/images/events/family-weekend.jpg',
    imageAlt: 'Family enjoying a seafood platter together on a terrace beside the coast',
    duration: 'Two nights',
    capacity: 'Up to 8 guests',
    priceFrom: 0, // TODO: set real price
  },
  {
    id: 'live-music-night',
    slug: 'live-music-night',
    title: 'Live Music Night',
    category: 'Music',
    description:
      'Local musicians, a short menu of small plates and a room that stays open late. Every Thursday the bistro fills with sound and the smell of grilled seafood.',
    image: '/images/events/live-music-night.jpg',
    imageAlt: 'Live musicians performing in a warmly lit seafood bistro filled with guests',
    duration: 'Evening, 20:00 to late',
    capacity: 'Up to 80 guests',
    priceFrom: 0, // TODO: set real price
  },
];
