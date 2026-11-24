export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'facebook' | 'tiktok';
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  priceRange: {
    dishes: { min: number; max: number };
    roomsPerNight: { min: number; max: number };
    eventsFrom: number;
  };
  social: SocialLink[];
  mapEmbedUrl: string;
}

// DEMO: central Lisbon waterfront coordinates used by the contact map.
const demoLatitude = 38.7082; // DEMO
const demoLongitude = -9.1394; // DEMO

const demoMapBounds = [
  demoLongitude - 0.012,
  demoLatitude - 0.008,
  demoLongitude + 0.012,
  demoLatitude + 0.008,
]
  .map((value) => encodeURIComponent(value.toFixed(4)))
  .join('%2C');

// DEMO: single source of truth for hotel identity, contact details and pricing format.
export const siteConfig: SiteConfig = {
  name: 'Sea_Food Hotel & Resort', // DEMO: competition entry hotel name
  shortName: 'SEA_FOOD', // DEMO: short brand
  tagline: 'Where the Atlantic comes to stay.', // DEMO: final tagline
  description:
    'A seaside hotel and resort for long lunches, slow evenings and the freshest catch on the coast.', // DEMO: final description
  phone: '+351 213 456 789', // DEMO: demo phone number
  email: 'hello@seafoodhotel.example', // DEMO: demo email address (reserved .example domain)
  address: {
    line1: 'Rua do Mar 28', // DEMO: demo street address
    line2: 'Chiado', // DEMO: demo district
    city: 'Lisboa', // DEMO: demo city
    country: 'Portugal',
  },
  coordinates: {
    latitude: demoLatitude, // DEMO
    longitude: demoLongitude, // DEMO
  },
  currency: {
    code: 'EUR', // DEMO
    symbol: '€', // DEMO
    locale: 'en-IE', // DEMO
  },
  priceRange: {
    // DEMO: matches the min/max in dishes.ts, rooms.ts and events.ts.
    dishes: { min: 11, max: 185 },
    roomsPerNight: { min: 185, max: 340 },
    eventsFrom: 35,
  },
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/seafoodhotel', icon: 'instagram' }, // DEMO
    { label: 'Facebook', href: 'https://www.facebook.com/seafoodhotel', icon: 'facebook' }, // DEMO
    { label: 'TikTok', href: 'https://www.tiktok.com/@seafoodhotel', icon: 'tiktok' }, // DEMO
  ],
  mapEmbedUrl: `https://www.openstreetmap.org/export/embed.html?bbox=${demoMapBounds}&layer=mapnik&marker=${demoLatitude}%2C${demoLongitude}`, // DEMO: built from the coordinates above
};

export interface NavigationItem {
  label: string;
  to: string;
}

export const navigation: NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Build a Boil', to: '/build-your-boil' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat(siteConfig.currency.locale, {
    style: 'currency',
    currency: siteConfig.currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}
