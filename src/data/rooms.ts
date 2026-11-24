import type { Room } from '../types';

export const rooms: Room[] = [
  {
    id: 'coastal-king',
    slug: 'coastal-king',
    name: 'Coastal King',
    type: 'King room',
    description:
      'A calm, light-filled room with a king bed, linen bedding and a private balcony that looks straight out to the Atlantic. The perfect base for long seafood dinners and slower mornings by the water.',
    image: '/images/rooms/coastal-king.jpg',
    imageAlt: 'Coastal King room with a king bed and a balcony overlooking the Atlantic',
    amenities: [
      'Free Wi-Fi',
      'Private balcony',
      'Sea view',
      'King bed',
      'Rainfall shower',
      'Coffee machine',
      'Daily breakfast included',
    ],
    pricePerNight: 185, // DEMO: nightly demo rate
    capacity: 2,
    size: '32 m²',
    isFeatured: true,
  },
  {
    id: 'ocean-suite',
    slug: 'ocean-suite',
    name: 'Ocean Suite',
    type: 'Suite',
    description:
      'A spacious suite with a separate sitting area, floor-to-ceiling windows and a deep soaking tub set beside the sea. Made for couples who want to linger a little longer.',
    image: '/images/rooms/ocean-suite.jpg',
    imageAlt: 'Ocean Suite with floor-to-ceiling windows, a sitting area and a soaking tub',
    amenities: [
      'Free Wi-Fi',
      'Panoramic sea view',
      'Separate living area',
      'King bed',
      'Soaking tub',
      'Minibar',
      'Daily breakfast included',
      'Late checkout on request',
    ],
    pricePerNight: 265, // DEMO: nightly demo rate
    capacity: 2,
    size: '48 m²',
    isFeatured: true,
  },
  {
    id: 'family-loft',
    slug: 'family-loft',
    name: 'Family Loft',
    type: 'Family loft',
    description:
      'A bright, practical loft with two bedrooms, a small kitchen and plenty of room for everyone to spread out after a day on the beach. Steps from the restaurants and the shore.',
    image: '/images/rooms/family-loft.jpg',
    imageAlt: 'Family Loft with two bedrooms, a compact kitchen and a shared living space',
    amenities: [
      'Free Wi-Fi',
      'Two bedrooms',
      'Kitchenette',
      'Partial sea view',
      'Family bathroom',
      'Laundry facilities',
      'Daily breakfast included',
    ],
    pricePerNight: 295, // DEMO: nightly demo rate
    capacity: 4,
    size: '60 m²',
  },
  {
    id: 'sunset-terrace-suite',
    slug: 'sunset-terrace-suite',
    name: 'Sunset Terrace Suite',
    type: 'Terrace suite',
    description:
      'Our most private suite, with a wraparound terrace made for watching the light fade over the water. An outdoor lounge, a generous bedroom and the sound of the tide at night.',
    image: '/images/rooms/sunset-terrace-suite.jpg',
    imageAlt: 'Sunset Terrace Suite with a private wraparound terrace and outdoor lounge seating',
    amenities: [
      'Free Wi-Fi',
      'Private terrace',
      'Full sea view',
      'King bed',
      'Outdoor lounge',
      'Outdoor rainfall shower',
      'Minibar',
      'Daily breakfast included',
    ],
    pricePerNight: 340, // DEMO: nightly demo rate
    capacity: 2,
    size: '55 m²',
  },
];
