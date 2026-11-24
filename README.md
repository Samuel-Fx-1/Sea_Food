# Sea_Food Hotel & Resort

A multi-page seaside hotel and booking platform built with **React + TypeScript + Vite**. It brings together Atlantic seafood, a build-your-own bag boil wizard, rooms and suites, experiences, a gallery with lightbox, and a local reservation flow — all in one ocean-blue, sand and coral design system.

> **Placeholder launch:** the hotel name, tagline, contact details, prices, map coordinates and many photographs are intentional placeholders for the competition entry. Search `TODO` across `src/` to see everything that still needs real content.

## Preview

<!-- TODO: add a hero screenshot here, e.g. ![Sea_Food home](docs/screenshots/home.png) -->

_A screenshot will be added before the final handover._

## What's included

- **12 lazy-loaded routes** with animated transitions, scroll-to-top and per-page SEO metadata.
- **Shared layout** — sticky navbar that starts transparent over the hero and turns solid on scroll, mobile hamburger menu, newsletter/social footer, light/dark theme toggle persisted to `localStorage`.
- **Menu** — 29 typed dishes across Crab Boil, Bag Boil, Platters, Grilled and Starters, with category filters, search, sorting, badges, spice meters and placeholder pricing.
- **Dish detail pages** — ingredients, serving size, heat level, tags, and “Add to reservation”.
- **Bag Boil Builder** — five-step wizard (size → seafood → extras → sauce & heat → review) with an animated bag illustration and a live indicative total.
- **Bookings** — react-hook-form + zod validated table reservations and room enquiries, saved in `localStorage`, with a confirmation page and a “My Reservation” drawer.
- **Rooms & Suites** — four seaside rooms with amenity lists and enquiry links that pre-fill the room form.
- **Gallery** — 16-item masonry gallery with category filters, keyboard/swipe lightbox and graceful image fallbacks.
- **Experiences & Events**, **About**, **Contact & Location** with an embedded map, plus a friendly **404**.
- **Home page** — hero with parallax, original bistro sections, featured dishes, chef's pick carousel, testimonials, counters and calls to action.
- **Accessibility and polish** — semantic landmarks, skip link, labelled controls, visible focus states, `aria-*` state, reduced-motion support, responsive layouts at 375 px / 768 px / 1280 px, lazy images with explicit dimensions, and reusable fallbacks for missing photos.

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Routing | react-router-dom 7 |
| Motion | framer-motion |
| Forms | react-hook-form + zod + @hookform/resolvers |
| Icons | lucide-react |
| SEO | react-helmet-async |
| Styling | Plain CSS design system with CSS variables (two fonts: Cormorant Garamond + DM Sans) |
| Linting | ESLint 10 flat config with typescript-eslint |

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run build   # type-check + production build
npm run lint    # ESLint
npm run preview # preview the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero, dining story, featured dishes, teasers, testimonials |
| `/menu` | Full menu with filters, search and sort |
| `/menu/:slug` | Dish detail and add-to-reservation |
| `/build-your-boil` | Bag Boil Builder wizard |
| `/rooms` | Rooms & Suites |
| `/reservations` | Table reservation + room enquiry forms |
| `/reservations/confirmation` | Saved booking confirmation |
| `/gallery` | Photo gallery with lightbox |
| `/experiences` | Experiences & Events |
| `/about` | Our story and values |
| `/contact` | Contact details and map |
| `*` | 404 |

## Folder structure

```text
src/
├── assets/images/          Original WebP photography
├── config/site.ts          Hotel name, contact details, currency, social links, TODOs
├── context/                Cart and UI drawer providers
├── data/                   dishes, rooms, events, testimonials, gallery, legacy site copy
├── hooks/                  Theme, scroll reveal, hero parallax, legacy reservation hook
├── types/                  Strict shared domain types
├── utils/                  Storage, booking persistence, boil pricing, date helpers
├── components/
│   ├── layout/             Navbar, Footer, RootLayout, PageTransition, ScrollToTop, ReservationDrawer
│   ├── common/             Seo, PageHero, SectionHeading, ImageWithFallback, Badge, Price, SpiceMeter, Counter
│   ├── cards/              DishCard, RoomCard, EventCard, TestimonialCard
│   ├── home/               HomeHero, FeaturedDishes, BuildTeaser, RoomsPreview, ChefPick, TestimonialsCarousel, GalleryStrip, HomeCta
│   ├── menu/               MenuFilters, DishGrid
│   ├── builder/            BoilBuilder, BagIllustration
│   ├── gallery/            GalleryGrid, Lightbox
│   └── forms/              ReservationForm, RoomEnquiryForm
├── pages/                  All 12 route components (lazy-loaded)
├── styles/                 Design system, component styles, page styles, theme, responsive
├── App.tsx                 Router
└── main.tsx                Providers and entry point
```

## Images and placeholders

- Existing dish photos live in `public/images/seafood/*.png`.
- New dish, room, event and gallery photos follow `/images/<group>/<slug>.jpg` paths. Missing files render a reusable gradient + fish icon fallback with the item name, so the site never shows broken images.
- **All prices are placeholders** and display as `€—` unless they are indicative builder totals. The builder total is computed from clearly marked TODO prices in `src/utils/boilPricing.ts`.
- Contact details, address, social URLs and map coordinates are placeholder values in `src/config/site.ts`.

## Notes

The original one-page Ondine site and its working reservation form are preserved inside the Home route; the new reservation flow adds the react-hook-form/zod version without removing the earlier functionality. The archived static site remains under `old/`.
