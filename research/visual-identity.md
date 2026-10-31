# Visual Identity — وصايه الـــ 15

**Built from:** the official profile image, the 2025 Menu Egypt menu scans, recent official Facebook reel thumbnails, RestaurantGuru food/interior photos, and the storefront photo. Checked 29 October 2026.

## The real brand, in one sentence

A red-and-saffron street-food/grill brand from Street 15, Sohag: a circular “W” badge, bold Arabic menu boards, halftone yellow fields, red “NEW” stamps, paper tray liners, and a playful tuxedo-waiter mascot. It is energetic and local — not a quiet fine-dining brand.

## Logo and brand assets

- **Profile image:** official 200×200 raster from the Facebook page (`graph.facebook.com/425928660836238/picture?type=large`). A circular ring: saffron-yellow top arc, ember-red bottom arc, white centre, a rounded red “W”, four white stars, and “WESAYA 15 ST.” around the top.
- **Cover image:** public page metadata references media `1268342888723382`; the cover image itself was not retrievable as a clean file (Facebook lookaside redirect). Not used.
- **Menu scans:** yellow `#F4BE1D` fields, red headings, black type, white brush-stroke section headers, dotted halftone textures, red “NEW” stamps, hand-drawn arrows.
- **Interior:** red vinyl booths, black tables, dark ceiling, warm pendant lamps, green artificial-plant wall, black/red staff polos with the circular W badge.
- **Storefront:** red fascia with the Arabic name “وصايه” and two illuminated W badges; glass frontage, warm interior light.
- **Packaging:** red-and-white tray paper with the W badge, “وصايه”, and the line “استمتع بأصل الطعم”.

**Limitation:** no vector logo or official brand guide was found. The site uses the official raster logo at small sizes and does not redraw or recolour it.

## Palette derived from the materials

| Token | Hex | Where it comes from | Use |
|---|---|---|---|
| `--ink` | `#17110D` | Black trays, interior ceiling, menu type | Main dark background, body text on light |
| `--coal` | `#241A14` | Dark wood / black surfaces | Secondary dark surfaces, cards |
| `--brand-red` | `#E11B28` | Logo red; storefront fascia | Primary actions, stamps, accents |
| `--red-deep` | `#A80F1A` | Shadow side of logo red | Hover/depth, gradients |
| `--saffron` | `#F6BE0F` | Logo yellow | Brand highlights, focus rings, ticket bands |
| `--saffron-soft` | `#FFD66B` | Menu yellow highlights | Soft glows, tags |
| `--cream` | `#FBF3E4` | Rice, paper, menu white space | Light section background |
| `--paper` | `#FFFDF8` | Menu paper | Cards, form surfaces |
| `--olive` | `#4F5A3C` | Green wall in the dining room | Small secondary accent, gallery captions |
| `--warm-grey` | `#CDBFB0` | Warm interior neutrals | Muted text on dark |

The palette is intentionally **red + saffron on charcoal and paper**, not a generic cream-and-terracotta restaurant palette. The yellow is the brand’s own menu-board yellow, not a decorative beige.

## Typography

- **Display:** Alexandria (Google Fonts, Arabic + Latin) — geometric, confident, and close in spirit to the rounded W badge. Used at 700–800 for headlines, section titles, and the wordmark.
- **Body/UI:** IBM Plex Sans Arabic (400/500/600) — high legibility for Arabic paragraphs, prices, and form labels.
- **Latin micro-type:** Alexandria 600, small sizes, with tracking only where it is a real label (e.g. “WESSAYA 15” in the footer), not as a decorative eyebrow on every section.
- These are design interpretations, not official brand fonts. The real brand appears to use a bold Arabic sans and a rounded geometric Latin W; no font files were published.

## Layout and component language

- **RTL-first editorial grid.** Asymmetric hero: a dark type panel on the right (start), a tall food photo on the left (end), and a saffron ticket/stamp overlapping the seam.
- **Menu as a printed menu board, not a SaaS card grid.** Cream paper, thin red rules, dashed perforations, tabular prices, small red “NEW” stamps. Category headers are full-width bands with an authentic photo and a dark overlay.
- **Ticket/receipt motif.** Dashed separators, small caps-like metadata (but not all-caps labels everywhere), stamped circles, and a “من 2007” seal. This comes from the tray liners and menu print.
- **Photography treatment.** Warm, high-contrast food photos with a subtle dark vignette and a thin saffron keyline; no heavy duotone that would make the food unrecognisable.
- **Shapes.** Mostly square or 2–6px radii for a printed/tray feel; circular badges for stamps and the logo. Avoid a single large radius applied to every card.
- **Icons.** Inline SVG, 1.75px stroke, rounded caps. No emoji as structural icons. WhatsApp, phone, pin, clock, search, cart, plus/minus, close, arrow, star, Facebook, Instagram.

## Motion direction

The restaurant is a grill; the background should feel like **warm ember light and a slow drift of saffron haze**, not flames or floating ingredients.

- A CSS-only ember field: three large, blurred radial gradients in red/saffron drifting very slowly behind the hero and CTA band.
- A fine halftone dot pattern (from the menu’s yellow dotted texture) at low opacity, slowly shifting.
- A single page-load reveal for the hero (headline + image), and hover/active micro-interactions on cards and buttons. No per-section fade-up-on-scroll.
- A slow marquee band with brand phrases (“من قلب شارع 15 · على الفحم · من 2007 · أصل الطعم”) that pauses on hover/focus and stops completely under `prefers-reduced-motion`.
- All non-essential motion is disabled under `prefers-reduced-motion: reduce`; the page remains complete and readable.

## What to avoid

- Generic cream + terracotta + serif “restaurant template” styling.
- Fruit, flames, floating ingredients, or unrelated decorative food.
- Recolouring or redrawing the official logo.
- Claiming a stock photo is the restaurant’s food.
- Using the watermarked Menu Egypt scans as website imagery.
- Rounded white cards with the same soft shadow on every section.
