# New Brand Identity — وصايه الـــ 15

**Direction:** *“The Street 15 Dining Room”* — a warm, architectural Egyptian grill house. Printed-menu clarity, dark dining-room atmosphere, brass detailing, and pomegranate accents. Local and confident, not costumed “ancient Egypt”, not a generic burger joint.

## Why this direction

The restaurant’s real materials point to a **dining room**, not a food truck:

- Deep red vinyl booths, black tables, warm pendant lamps, a green living wall, and a red-painted facade.
- A circular “W” badge with a brass-like ring.
- Printed menus with bold Arabic headings and tabular prices.
- Real photography: charcoal-grilled chicken, yellow rice, trays, pizza being built by hand.

The strongest art direction is therefore an **evening grill house**: charcoal and deep green surfaces, warm limestone paper, pomegranate red for action and appetite, and brass for premium detail. This keeps the brand’s real red/yellow DNA as accents inside a richer, calmer system instead of turning the whole page into a flyer.

Three directions were explored internally:

1. **Bold Egyptian street brand** — full red/yellow blocking, sticker type. Rejected: loud, ages quickly, repeats the current problem.
2. **Editorial premium restaurant** — serif, cream, tiny type. Rejected: too quiet for a family grill with delivery; loses appetite.
3. **Warm architectural grill house (selected)** — dark green/charcoal, limestone, pomegranate and brass; oversized Arabic display type; menu-as-ledger. It is distinctive, works with the real photos, and supports ordering.

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-forest` | `#10211B` | Primary dark surface (hero, story, footer, cart header) |
| `--color-forest-2` | `#173027` | Raised dark surface / hover |
| `--color-charcoal` | `#0B1410` | Deepest background, dialog backdrop |
| `--color-limestone` | `#F3EDE1` | Main light background |
| `--color-paper` | `#FBF7EE` | Cards, menu ledger paper |
| `--color-paper-2` | `#EFE7D7` | Recessed paper, table rows |
| `--color-pomegranate` | `#B3261E` | Primary action, price, appetite accent |
| `--color-pomegranate-deep` | `#8C1B15` | Hover / pressed |
| `--color-brass` | `#C9A227` | Premium detail, focus rings, small labels |
| `--color-brass-soft` | `#E2C766` | Hover on brass, soft highlights |
| `--color-olive` | `#5F6B4A` | Secondary accent, notes |
| `--color-ink` | `#1C1A16` | Body text on light |
| `--color-ink-soft` | `#4C463C` | Secondary text on light |
| `--color-cream` | `#F6EFE2` | Body text on dark |
| `--color-cream-soft` | `#CBBFA9` | Muted text on dark |
| `--color-rule` | `#D9CDB8` | Hairline rules on light |
| `--color-rule-strong` | `#B9A98E` | Strong rules, borders |

Contrast: ink on limestone ≈ 13:1; cream on forest ≈ 12:1; pomegranate on paper ≈ 6.4:1; brass on forest ≈ 7.1:1. Brass is never used for body text on light.

## Typography

- **Display / Arabic:** **Reem Kufi** (Google Fonts). Geometric Kufic with architectural, poster-like character. Weights 500–800. Used for headlines, category names, prices, and the wordmark. This is a deliberate move away from the rounded Alexandria look.
- **Body / UI Arabic:** **IBM Plex Sans Arabic** (400/500/600/700). Excellent legibility for paragraphs, forms, and dense menu data.
- **Latin / numerals:** **Archivo** (500–800), with `font-variant-numeric: tabular-nums` for all prices and counts. Gives the ledger a precise, printed rhythm.
- **Scale:** hero `clamp(3rem, 9vw, 7rem)` with `line-height 1.02`; section titles `clamp(2.1rem, 4.6vw, 3.6rem)`; category `clamp(1.6rem, 3vw, 2.4rem)`; body 1rem/1.7; micro labels 0.68–0.78rem, letter-spacing 0.14em only in Latin.

## Composition system

- **Arch / niche motif.** A repeated rounded-top arch derived from the storefront windows and the circular badge. Used as a photo frame in the hero and gallery, and as a subtle background outline in section headers. One motif, consistently.
- **Brass rule.** A 1px brass line with a 6px brass square at the start. Replaces the ticket perforations and dashed rules.
- **Menu ledger.** The menu is a printed ledger: item name and description on the start side, price in a right-hand tabular column, a hairline rule between rows. Featured/new items get a filled pomegranate tab, not a rotated sticker.
- **Asymmetric editorial grid.** 12-column grid; text blocks offset from images; large negative space around section titles. No centered “hero card”.
- **Photography.** Authentic photos only. Food photos are editorial/category imagery, never claimed as a specific item. Warm grade, dark vignette, 8–12px radius maximum.
- **Radius:** 2px for paper/ledger, 999px only for the circular logo and the primary pill button. No rounded cards everywhere.
- **Shadows:** almost none on light surfaces; depth comes from rules, paper tone, and the arch frame. Dark surfaces use a soft 40px ambient shadow.
- **Icons:** 1.6px stroke, rounded caps, consistent 20/24 grid.

## Motion

- Hero: one 700ms reveal (title lines, then photo) with a slow 20s scale drift on the photo; no bouncing.
- Section headers: brass rule draws in (scaleX) on first view via CSS only where possible; otherwise static.
- Menu ledger rows: background tint + price color shift on hover; add button becomes solid pomegranate.
- Cart/lightbox/dialogs: 220ms ease-out, translate 12px, no scale bounce.
- Marquee: slower, 48s, pauses on hover/focus; static wrap under reduced motion.
- Everything non-essential is removed under `prefers-reduced-motion: reduce`.

## What is removed

- The saffron marquee band as a screaming yellow stripe (replaced by a thin brass ticker).
- Rotated “NEW” stickers, ticket perforations, dashed rules, repeated circular 15 badges.
- The dot-grid background and blurred ember blobs.
- White product cards with 3px top borders.
- The “15” badge used as the eyebrow in every section.

## Assets

- Official raster logo remains untouched (no redraw/recolour).
- Real photos: hero grill, mixed tray, chicken tray, kofta tray, burger, pizza prep, pizza craft, storefront, dining detail.
- No new stock photos, no invented item images.
