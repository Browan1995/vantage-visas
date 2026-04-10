# NorthBound Visas — Premium Concierge Website

A high-converting, multi-page visa concierge website for South African travelers. Built with
Next.js 14 (App Router), Tailwind CSS, and Lucide Icons.

## Aesthetic

- **Palette**: Deep Navy `#050C1B` + Metallic Gold `#D4AF37` + Cream `#F5EFE0`
- **Typography**: Fraunces (display serif) + Outfit (body sans) — loaded via `next/font/google`
- **Style**: Glassmorphism cards, gold hairline dividers, subtle grain overlay, radial navy gradients, shimmer-on-hover gold buttons

## Tech Stack

- Next.js 14 (App Router, JavaScript)
- Tailwind CSS 3
- Lucide Icons
- No external UI libraries — everything hand-built

## Project Structure

```
northbound-visas/
├── app/
│   ├── layout.jsx             # Root layout + fonts + chrome
│   ├── globals.css            # Design tokens, buttons, glass, grain
│   ├── page.jsx               # Home: hero, stats, destinations, reviews
│   ├── visa-quiz/page.jsx     # 6-step quiz wrapper
│   ├── pricing/page.jsx       # Concierge vs Standard
│   ├── about/page.jsx         # 98% story
│   └── destinations/[country]/page.jsx  # Dynamic country guide
├── components/
│   ├── Navbar.jsx             # Sticky, scroll-reactive, mobile drawer
│   ├── Footer.jsx             # Brand + contact + disclaimer
│   ├── WhatsAppButton.jsx     # Fixed, pulsing, pre-filled message
│   ├── DifficultyMeter.jsx    # Gold SVG gauge (1–5)
│   ├── ReviewSlider.jsx       # Auto-rotating Google/Trustpilot reviews
│   └── QuizClient.jsx         # 6-step depth quiz with WhatsApp hand-off
├── lib/
│   └── countries.js           # Top 10 destinations data
├── public/
│   └── logo.jpeg              # Brand mark
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

### WhatsApp number

Update the `PHONE` constant (international format, no `+`) in two files:

- `components/WhatsAppButton.jsx`
- `components/QuizClient.jsx` (`WA_PHONE`)

Example: `+27 82 123 4567` → `27821234567`

### Contact details

Update phone / email / address in `components/Footer.jsx`.

### Countries

Add, remove, or edit destinations in `lib/countries.js`. Each country needs a unique `slug`,
`difficulty` (1–5), requirements list, and tips. Dynamic country pages are statically generated
via `generateStaticParams()`.

## Pages

| Route                         | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| `/`                           | Home — hero, stats, destinations grid, reviews    |
| `/visa-quiz`                  | 6-step quiz → WhatsApp hand-off                   |
| `/pricing`                    | Concierge vs Standard comparison + guarantee     |
| `/about`                      | Brand story, 98% success rate, values            |
| `/destinations/[country]`    | Dynamic country guide with difficulty meter      |

## Key Features

- **Responsive**: Mobile-first. Tested breakpoints at 375px, 768px, 1024px, 1440px.
- **6-Step Depth Quiz**: Destination → Purpose → Employment → History → Timeline → Contact
- **Pulsing WhatsApp Button**: Fixed bottom-right with pre-filled message including quiz answers
- **Difficulty Meter**: Gold SVG gauge renders per-country on destination pages
- **Review Slider**: Auto-rotating 5-star reviews from Google / Trustpilot
- **Refund Guarantee**: Featured throughout with proper disclaimer language

## Disclaimer Language

The legal disclaimer (guarantee void conditions, non-refundable government fees) appears on:

- Home hero guarantee card
- Pricing guarantee section
- Footer (site-wide)

## License

© NorthBound Visa Agency. All rights reserved.
