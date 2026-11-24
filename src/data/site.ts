import heroImage from '../assets/images/image-1.webp';
import storyImage from '../assets/images/image-3.webp';
import visitImage from '../assets/images/image-4.webp';
import interludeImage from '../assets/images/image-5.webp';
import type {
  FooterContent,
  HeroContent,
  InterludeContent,
  IntroContent,
  NavLink,
  ReservationContent,
  ReservationOption,
  StoryContent,
  VisitContent,
} from '../types';

export const siteBrand = 'ONDINE';
export const brandAriaLabel = 'Ondine, back to top';
export const skipLinkLabel = 'Skip to content';

export const navLinks: NavLink[] = [
  { label: 'The menu', href: '#menu' },
  { label: 'Our story', href: '#story' },
  { label: 'Find us', href: '#visit' },
];

export const reserveLink: NavLink = {
  label: 'Reserve a table',
  href: '#reservations',
};

export const heroContent: HeroContent = {
  eyebrow: 'LISBON · AFTER DARK',
  heading: {
    lines: ['Where the sea'],
    prefix: 'meets ',
    emphasis: 'the night.',
  },
  description:
    'Atlantic seafood, candlelit tables, and nowhere else you need to be.',
  cta: {
    label: 'Explore the menu',
    href: '#menu',
  },
  image: heroImage,
  imageAlt: '',
  footLeft: 'AN EVENING BY THE ATLANTIC',
  scrollLabel: 'SCROLL TO DISCOVER',
  footRight: 'CHIADO · LISBOA',
};

export const introContent: IntroContent = {
  kicker: 'THE ONDINE WAY',
  heading: {
    lines: ['The best evenings'],
    prefix: 'begin ',
    emphasis: 'with the tide.',
  },
  paragraphs: [
    'There is a certain hour when Lisbon slows down and the Atlantic feels close enough to touch. That is the hour we set the table.',
    'At Ondine, the catch is fresh, the wine is poured generously, and dinner is never in a hurry.',
  ],
  cta: {
    label: 'Make an evening of it',
    href: '#reservations',
  },
  bottomLabel: '01 / THE SEASON',
  bottomMark: '✳',
};

export const interludeContent: InterludeContent = {
  ariaLabel: 'An invitation to linger',
  eyebrow: 'THE PLEASURE OF TAKING YOUR TIME',
  heading: {
    lines: ['Good things come'],
    emphasis: 'in waves.',
  },
  image: interludeImage,
  imageAlt: 'Atlantic oysters and sea salt on a pewter tray',
  ornament: '✳',
};

export const storyContent: StoryContent = {
  topline: {
    left: '02\u00A0/\u00A0THE STORY',
    right: 'A DIFFERENT KIND OF CURRENT',
  },
  image: storyImage,
  imageAlt: 'Chef Inês Valente in the softly lit Ondine kitchen',
  imageCaption: 'INÊS VALENTE · CHEF & FOUNDER',
  overline: 'THE HAND BEHIND THE TIDE',
  heading: {
    lines: ['A kitchen that'],
    emphasis: 'listens to the sea.',
  },
  paragraphs: [
    "Chef Inês Valente grew up between Setúbal's fish markets and long family lunches that never ended when the plates were cleared. At Ondine, she brings that same generous spirit to the table.",
    'Her cooking is guided by the day’s catch, the seasons, and a simple belief: when an ingredient is this good, the kindest thing is to let it speak.',
  ],
  quote:
    '“The sea gives us the beginning. The evening is what we make of it.”',
  signature: 'Inês Valente',
};

export const visitContent: VisitContent = {
  topline: {
    left: '03\u00A0/\u00A0FIND US',
    right: 'A SEAT IS WAITING',
  },
  overline: 'COME IN FROM THE CITY',
  heading: {
    lines: ['Your place'],
    emphasis: 'for the evening.',
  },
  lede: 'Tucked into Chiado, just a short walk from Largo do Carmo. Follow the warm light in.',
  addressTitle: 'Find us',
  addressLines: ['Chiado', '1200 Lisboa, Portugal'],
  mapLink: {
    label: 'View the neighborhood',
    href: 'https://www.google.com/maps/search/?api=1&query=Chiado%2C%20Lisboa%2C%20Portugal',
    external: true,
  },
  hoursTitle: 'Opening hours',
  hours: [
    { days: 'Monday', hours: 'Closed' },
    { days: 'Tuesday – Thursday', hours: '18:30 – 23:00' },
    { days: 'Friday – Saturday', hours: '18:30 – 00:00' },
    { days: 'Sunday', hours: '18:30 – 22:30' },
  ],
  walkins: 'Walk-ins are always welcome at the bar.',
  image: visitImage,
  imageAlt:
    "Ondine's intimate candlelit dining room with tiled walls and a navy banquette",
  imageCaption: "THERE'S ALWAYS TIME FOR ONE MORE GLASS",
};

const partyOptions: ReservationOption[] = Array.from(
  { length: 8 },
  (_, index): ReservationOption => {
    const guests = index + 1;

    return {
      value: String(guests),
      label: `${guests} ${guests === 1 ? 'guest' : 'guests'}`,
    };
  },
);

export const reservationContent: ReservationContent = {
  eyebrow: '04\u00A0/\u00A0YOUR EVENING STARTS HERE',
  heading: {
    lines: ['Pull up'],
    emphasis: 'a chair.',
  },
  description:
    "Pick an evening and we'll keep the details close. A little anticipation is part of the pleasure.",
  sparkle: '✳',
  formTitle: 'Plan your visit',
  formIndex: '01 — 06',
  dateLabel: 'Date',
  dateHint: 'Tuesday to Sunday, up to 90 days ahead',
  timeLabel: 'Time',
  timePlaceholder: 'Choose a date first',
  timeSelectPlaceholder: 'Select a time',
  timeNoSeatings: 'No seatings on this date',
  partyLabel: 'Party size',
  partyPlaceholder: 'Select guests',
  partyOptions,
  nameLabel: 'Your name',
  namePlaceholder: 'Full name',
  emailLabel: 'Email address',
  emailPlaceholder: 'your@email.com',
  noteLabel: 'A note for the evening',
  optionalLabel: 'OPTIONAL',
  notePlaceholder:
    'A special occasion, a quiet corner, anything we should know...',
  submitLabel: 'Save my table request',
  disclaimer:
    'Requests are saved on this device only. This does not confirm a reservation or send a message to the restaurant.',
  successTitle: 'Your evening is noted.',
  successDisclaimer:
    'Saved on this device only. No message has been sent, and your table is not confirmed.',
  editLabel: 'Edit this request',
};

export const footerContent: FooterContent = {
  brand: 'ONDINE',
  brandWave: '~',
  taglineLines: ['An Atlantic evening,', 'right here in Lisbon.'],
  copyright: 'ONDINE · LISBOA',
  links: [
    { label: 'MENU', href: '#menu' },
    { label: 'STORY', href: '#story' },
    { label: 'VISIT', href: '#visit' },
    { label: 'RESERVATIONS', href: '#reservations' },
  ],
  backToTop: 'BACK TO TOP ↑',
};
