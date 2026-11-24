export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'facebook' | 'twitter';
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
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  social: SocialLink[];
  mapEmbedUrl: string;
}

export const siteConfig: SiteConfig = {
  name: 'Sea_Food Hotel & Resort', // TODO: replace with the competition entry hotel name
  shortName: 'SEA_FOOD', // TODO: replace with the final short brand
  tagline: 'Where the Atlantic comes to stay.', // TODO: replace with final tagline
  description:
    'A seaside hotel and resort for long lunches, slow evenings and the freshest catch on the coast.', // TODO: replace with final description
  phone: '+351 000 000 000', // TODO: replace with real phone number
  email: 'hello@example.com', // TODO: replace with real email address
  address: {
    line1: 'TODO: street address', // TODO: replace with real street address
    line2: 'TODO: district',
    city: 'Lisboa', // TODO: confirm city
    country: 'Portugal',
  },
  currency: {
    code: 'EUR',
    symbol: '€',
    locale: 'en-IE',
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' }, // TODO: replace social URLs
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'X', href: 'https://x.com', icon: 'twitter' },
  ],
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=-9.16%2C38.69%2C-9.10%2C38.73&layer=mapnik', // TODO: replace with exact hotel coordinates
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

export function formatPrice(
  amount: number,
  isPlaceholder = false,
): string {
  if (isPlaceholder || amount === 0) {
    return `${siteConfig.currency.symbol}—`;
  }

  return new Intl.NumberFormat(siteConfig.currency.locale, {
    style: 'currency',
    currency: siteConfig.currency.code,
    maximumFractionDigits: 0,
  }).format(amount);
}
