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

export type DishCategory =
  | 'Crab Boil'
  | 'Bag Boil'
  | 'Platters'
  | 'Grilled'
  | 'Starters';

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Dish {
  id: string;
  slug: string;
  name: string;
  category: DishCategory;
  description: string;
  ingredients: string[];
  spiceLevel: SpiceLevel;
  price: number;
  image: string;
  imageAlt: string;
  gallery?: string[];
  isSignature?: boolean;
  isPopular?: boolean;
  serves: string;
  tags: string[];
  note?: string;
}

/** The original bistro menu item shape, kept for the archived menu section. */
export interface LegacyDish {
  id?: string;
  slug?: string;
  category?: string;
  name: string;
  note?: string;
  description: string;
  price: number;
  image?: string;
  imageAlt?: string;
  ingredients?: string[];
}

export interface MenuCategoryContent {
  numeral: string;
  title: string;
  note: string;
  dishes: LegacyDish[];
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

export interface Room {
  id: string;
  slug: string;
  name: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
  amenities: string[];
  pricePerNight: number;
  capacity: number;
  size: string;
  isFeatured?: boolean;
}

export interface HotelEvent {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  duration: string;
  capacity: string;
  priceFrom: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
}

export type GalleryCategory = 'Seafood' | 'Rooms' | 'Coast' | 'Events';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export type BoilSize = 'Couples' | 'Family' | 'Party';
export type SeafoodChoice =
  | 'crab'
  | 'shrimp'
  | 'lobster tail'
  | 'mussels'
  | 'clams'
  | 'crawfish';
export type AddOnChoice = 'corn' | 'potatoes' | 'sausage' | 'boiled eggs';
export type SauceChoice = 'Cajun' | 'Garlic Butter' | 'Lemon Pepper' | 'House Special';
export type SpiceChoice = 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';

export interface BoilConfiguration {
  size: BoilSize;
  seafood: SeafoodChoice[];
  addOns: AddOnChoice[];
  sauce: SauceChoice;
  spice: SpiceChoice;
}

export interface CartItem {
  id: string;
  kind: 'dish' | 'boil';
  name: string;
  unitPrice: number;
  quantity: number;
  configuration?: BoilConfiguration;
}

export interface TableBooking {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
  cart: CartItem[];
  reference: string;
  savedAt: string;
}

export interface RoomEnquiry {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomSlug: string;
  message: string;
  reference: string;
  savedAt: string;
}
