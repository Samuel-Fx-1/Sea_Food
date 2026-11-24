export interface NavLink {
  label: string;
  href: string;
}

export interface HeadingContent {
  lines: string[];
  prefix?: string;
  emphasis: string;
}

export interface TextLinkContent {
  label: string;
  href: string;
  external?: boolean;
}

export interface SectionToplineContent {
  left: string;
  right: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: HeadingContent;
  description: string;
  cta: TextLinkContent;
  image: string;
  imageAlt: string;
  footLeft: string;
  scrollLabel: string;
  footRight: string;
}

export interface IntroContent {
  kicker: string;
  heading: HeadingContent;
  paragraphs: string[];
  cta: TextLinkContent;
  bottomLabel: string;
  bottomMark: string;
}

export interface Dish {
  /** Unique identifier; used as the React key for card dishes. */
  id?: string;
  slug?: string;
  category?: string;
  name: string;
  note?: string;
  description: string;
  price: number;
  /** Renders an intentional placeholder instead of a misleading price. */
  priceIsPlaceholder?: boolean;
  image?: string;
  imageAlt?: string;
  ingredients?: string[];
}

export interface MenuCategoryContent {
  numeral: string;
  title: string;
  note: string;
  dishes: Dish[];
}

export interface MenuContent {
  topline: SectionToplineContent;
  overline: string;
  heading: HeadingContent;
  description: string;
  image: string;
  imageAlt: string;
  caption: string[];
  categories: MenuCategoryContent[];
  footnote: string;
}

export interface InterludeContent {
  ariaLabel: string;
  eyebrow: string;
  heading: HeadingContent;
  image: string;
  imageAlt: string;
  ornament: string;
}

export interface StoryContent {
  topline: SectionToplineContent;
  image: string;
  imageAlt: string;
  imageCaption: string;
  overline: string;
  heading: HeadingContent;
  paragraphs: string[];
  quote: string;
  signature: string;
}

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface VisitContent {
  topline: SectionToplineContent;
  overline: string;
  heading: HeadingContent;
  lede: string;
  addressTitle: string;
  addressLines: string[];
  mapLink: TextLinkContent;
  hoursTitle: string;
  hours: OpeningHour[];
  walkins: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
}

export interface ReservationOption {
  value: string;
  label: string;
}

export interface ReservationContent {
  eyebrow: string;
  heading: HeadingContent;
  description: string;
  sparkle: string;
  formTitle: string;
  formIndex: string;
  dateLabel: string;
  dateHint: string;
  timeLabel: string;
  timePlaceholder: string;
  timeSelectPlaceholder: string;
  timeNoSeatings: string;
  partyLabel: string;
  partyPlaceholder: string;
  partyOptions: ReservationOption[];
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  noteLabel: string;
  optionalLabel: string;
  notePlaceholder: string;
  submitLabel: string;
  disclaimer: string;
  successTitle: string;
  successDisclaimer: string;
  editLabel: string;
}

export interface FooterContent {
  brand: string;
  brandWave: string;
  taglineLines: string[];
  copyright: string;
  links: NavLink[];
  backToTop: string;
}

export interface ReservationRequest {
  date: string;
  time: string;
  party: number;
  name: string;
  email: string;
  note: string;
  savedAt: string;
}

export type ReservationField = 'date' | 'time' | 'party' | 'name' | 'email' | 'note';

export interface ReservationFormValues {
  date: string;
  time: string;
  party: string;
  name: string;
  email: string;
  note: string;
}

export interface ReservationError {
  message: string;
  field?: ReservationField;
}

export interface DateBounds {
  min: string;
  max: string;
}
