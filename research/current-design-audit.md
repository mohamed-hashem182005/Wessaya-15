# Current Design Audit — وصايه الـــ 15

**Audited:** 30 October 2026, against the running build (`/` and `/menu`), desktop 1440 and mobile 390.
**Verdict:** functional, authentic, and readable — but visually it reads as a competent first draft, not a brand. It uses the right ingredients in a generic arrangement.

## What the current site gets right (must be preserved)

- Real brand assets: the official circular W badge, real restaurant food photos, the real storefront.
- Accurate menu data: 124 items, 16 categories, printed variants/extras, source date 2025-10-09, confirmation notes.
- Complete craft: search/filter, item dialog with variants and extras, cart with review step, WhatsApp message encoding, lightbox, reduced motion, focus states, JSON-LD, sitemap.
- One clear idea: “printed menu / tray paper” with a saffron-and-ink palette.

None of that is the problem. The presentation is.

## Problems, section by section

### 1. Colour is applied, not composed

- Ink `#17110D`, brand red `#E11B28`, saffron `#F6BE0F`, cream `#FBF3E4` are correct **brand** colours, but they are used at the same intensity nearly everywhere. Result: every section shouts the same volume and the palette feels like a flag, not a system.
- The cream `#FBF3E4` + red + yellow combination on the menu page produces a “fast-food flyer” feel. The dark hero is strong; the light sections lose that strength immediately.
- Red is used for prices, links, eyebrow marks, focus rings, borders, NEW stamps, and errors — so red no longer signals anything in particular.

### 2. Typography has no display voice

- Alexandria + IBM Plex Sans Arabic is a safe, correct Arabic pairing, but Alexandria at 800 with normal tracking is used for every heading at almost the same size ratio. Nothing has the compressed, confident, poster-like weight of the real menu boards.
- Eyebrows are all the same: a 15 badge + small label. Six sections in a row repeat this exact pattern.
- English micro-type is used inconsistently as tiny uppercase labels. It reads as decoration rather than an editorial system.
- The Arabic hero is good, but it is still a standard two-column title + image composition.

### 3. The menu cards are the weakest element

- Every item is a white rectangle with a 1px border, a 3px top border, a small shadow, a name, optional description, a red price, and a small outlined add button. It is a generic SaaS/product card with food names.
- There is no price hierarchy: price and button compete, and the variant summary is tiny and detached.
- There is no image strategy because there is no verified item-to-photo mapping. The current design solves this by showing no images at all, but the card still looks like it *should* have one. That empty white rectangle is the visual problem.
- The “NEW” stamp is a tilted red sticker, repeated on every card that has it. It feels like a pasted-on promo.
- Category headers are thin text rules. They do not create chapters, rhythm, or a sense of browsing a real menu.

### 4. Repeated motifs flatten the page

- Ticket perforations, dashed rules, circular 15 badges, rotated stamps, halftone dots, and 2px red borders repeat across hero, featured, delivery, contact, footer. The site has one trick, used everywhere.
- The dot pattern and ember blobs are attractive individually but generic “restaurant landing page” effects. They do not come from the restaurant’s actual materials.
- The gallery uses an inconsistent masonry with mixed crops, including an interior image that is mostly a TV and wall. It does not feel art-directed.

### 5. Mobile loses the plot

- On mobile the hero becomes a single stacked column: eyebrow, huge title, lead, two full-width buttons, facts, then a short image. The image — the most persuasive asset — arrives late.
- The menu page puts the source card before search and filters, pushing the actual menu far below the fold.
- Menu cards become one per row with large empty areas. The page is long and repetitive.
- Header controls (WhatsApp, cart, menu) are three equal circular buttons; the brand is reduced to a small badge.

### 6. What the redesign must change

1. Replace the “red + yellow + cream” flyer with a composed, material palette: charcoal/forest, limestone, pomegranate, brass.
2. Replace Alexandria with a display face with architectural character; keep body Arabic highly legible.
3. Replace the white product card with a **menu ledger**: typographic rows with a strong price column, hairline rules, and one signature treatment for featured items. No fake item photos.
4. Give categories real chapter headers: oversized numerals, name, count, and a clear rule.
5. Move the mobile hero image up and make the type/photo relationship intentional, not stacked.
6. Use one motif consistently: the **arch / niche** and the **brass rule**. Remove the ticket perforations, rotated stickers, and dot fields.
7. Keep all ordering, cart, validation, WhatsApp, accessibility, and SEO functionality intact.

## Functionality that must not be lost

- Cart provider and drawer, quantity controls, variant/extras selection, notes, review step, form validation, WhatsApp handoff.
- Search, category filter, empty state, item dialog, deep links to `/menu#category-*`.
- Gallery lightbox and keyboard controls.
- Menu source/availability notes.
- Canonical/OG metadata, JSON-LD, sitemap/robots.
- Focus-visible states, reduced-motion support, skip link, semantic headings.
