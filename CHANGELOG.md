# Changelog — 57Blocks Website V4

Grouped into rounds, newest first. Each round lists the changes made and the
files touched.

---

## Round 8 — Button rendering, logo swaps, mobile polish (latest)

### Buttons (`assets/site-v2.css`)
- **Fixed the low-res / jagged pill outline** on `.btn`. The rounded-corner clip
  used for the hover fill-swipe was aliasing on its composited layer; added the
  `-webkit-mask-image:-webkit-radial-gradient(#fff,#000)` clip so the corners
  antialias crisply, keeping the original slide-up hover animation.

### Logos
- **Home trusted-by marquee (`index.html`):** LI.FI → Rain, Story Protocol →
  Brale (images + alt text).
- **Work partner marquee (`work.html`):** replaced the Lightspeed and Foothill
  Ventures logos with new artwork.

### About (`about.html`)
- **Hero:** removed the two hero buttons ("See our work" / "Read our research").
- **Values — Reliable:** copy now opens "言行一致, words and actions align. …".
- **Values — "High quality" → "Craft":** retitled and rewritten around holding a
  high standard, expanding capability, and taste/judgment.
- **Global-presence map, mobile (≤640px):** shrank the glowing location dots and
  their halos; tapping a dot now reveals its city label (one at a time, tap
  elsewhere to dismiss); removed the country hover/tap fill on mobile.

### Work (`work.html`)
- **No-detail cards** (rendered as `<div class="case">` rather than `<a>`) no
  longer lift on hover, keep the default cursor, and don't turn their border
  accent — visually distinguishing them from clickable case cards.
- **Mobile card height** unified to 225px so cards in a column match.

### Engine cards (`assets/site-v2.css`)
- **`.acc-item` on mobile** gained horizontal padding so the icon and text no
  longer sit flush against the hover fill edge.

### AI & Blockchain services (`ai.html`, `blockchain.html`, `assets/site-v2.css`)
- **"Four capability lines" on mobile** is now an accordion: each detail card
  moves directly beneath its own row, so switching a line shows the change right
  there instead of at the bottom of the list. Row title size reduced, the active
  row's arrow rotates to point down, and the open card has wider top spacing.
  Desktop keeps the two-column hover-switch behavior.

### Enterprise AI (`enterprise-ai.html`)
- **Hero sub-lead reworded** to avoid a single dangling word on the last line
  (no em-dashes): shortened the tail to "…delivers software you own."

### Mobile nav (`assets/site-v2.css`)
- **Burger → X animation fixed for Safari.** The bars are now absolutely centered
  and rotate from a shared center (instead of flex-gap + translateY math), with
  `backface-visibility:hidden` to remove Safari rendering artifacts.

### Note
- All changes mirrored into the `package/` snapshot; `package/about.html` was
  stale and was re-synced to the current version.

---

## Round 7 — About/team copy, Financial Services hero illustration

### About (`about.html`)
- **Hero title** now reads "An AI-native technology services firm."
- **Hero sub-lead added** below the title: "57Blocks is an AI-native technology
  services firm, spun out of Adobe in 2018. Around 200 engineers work as one
  distributed team across nine countries in the Americas, Europe, and Asia. We
  build, we invest, and we operate."
- **Stats row relabeled:** "5 · Global hubs" → "9 · Countries"; "2018 · Spun
  out of Adobe" → "2018 · Founded".
- **Team titles:** Kamil Krupa → "Web3 Lead, Europe"; Kevin Wang → "General
  Partner, 57b Capital".
- **Values — Reliable card:** removed the leading Chinese phrase; the copy now
  opens "Words and actions align. …".
- **Global-presence map, small screens:** at ≤640px the city labels and country
  names are hidden, leaving only the glowing dots + links (avoids the crowded
  overlap); at ≤1100px the pin labels drop 12px→11px.

### Work (`work.html`)
- Replaced three partner logos — Lightspeed, Foothill Ventures, Swift Ventures
  (alt text updated to match).

### Engineering subscription (`engineering-subscription.html`)
- Each plan's scope ("one senior engineer" / "a small team") is now a small
  pill tag on the line **below** "Fixed monthly fee", keeping both plan cards
  the same width.

### Financial Services — hero illustration (`financial-services.html`)
- Replaced the money-rail hero art with a **layered financial stack**: a
  "Financial product" glass card on top, connected by a flowing link into four
  frosted-glass infrastructure layers — Wallet (Custody & balances), Payments
  (In & out rails), Settlement (Clearing & reconciliation), Compliance
  (KYC · AML · audit), the last accented green. Each layer has an icon, label,
  descriptor, and an animated rail.
- On narrow screens (≤768px) the layer text is forced left-aligned.
- (Three alternate illustrations — Apple-Wallet card stack, isometric labeled
  glass slabs, and a full product-dashboard+layers+compliance composition —
  were explored behind a temporary switcher; the switcher was removed and the
  Layered version kept as the shipped default. The alternates remain in source,
  hidden.)

### Scroll-reveal (`assets/site-v2.js`)
- Reveal-on-scroll elements (`.rv`) that are already within the initial viewport
  on load are now shown immediately instead of waiting for a scroll — fixes tall
  near-the-fold blocks (e.g. the first Work case grid) appearing blank until the
  user scrolls. Below-fold elements still animate in on scroll.

### Note
- Changes were mirrored into the `package/` site snapshot.

---

## Round 6 — About page story/values & Work Brale card

### About (`about.html`)
- **Map section reworked:** heading changed to "One team, nine countries." on a
  single line; removed the sub-lead and the bottom country/city hub-card list;
  balanced the section's top/bottom padding.
- **New "Our story" section** below the map — a vertical timeline (The team →
  Fifty-seven → 2018 → Today) with the phase label stacked above each entry's
  heading and copy, a sticky section heading on the left, and a pull-out summary
  line ("Fifty-seven startups, building in blocks. That is the name.").
- **New "What guides us — Four values, held daily." section** — a 2×2 grid of
  value cards (Reliable / Responsive / Flexible / High quality), each with an
  icon in a rounded tile; uses the site's standard `.feat` card hover (lift +
  violet border, icon fills on hover).
- Removed the old "Who we are" intro block; hero top/bottom padding aligned with
  the Ventures hero.

### Work (`work.html`)
- Added a **Brale** card to the Blockchain group — wordmark logo with a dark
  hover cover; no case-study link.

### Industries — Construction & property (`construction-property.html`)
- Standardized the Offerings section heading to "Lead with the solution, pair
  with the offer." (was "Build, rebuild, or embed."), matching the other
  Industries subpages.

---

## Round 5 — Global map expansion & homepage marquee

### About / world map (`about.html`)
- **Added 5 new locations across 4 new countries:** Toronto (Canada),
  Monterrey (Mexico), Buenos Aires (Argentina), Ljubljana (Slovenia), and
  São Paulo (added to the existing Brazil). Each has a map pin + label and a
  bottom hub-card entry.
- **Country hover-highlight for the new countries** was generated from
  `countries.geo.json`, projected to the map's equirectangular projection
  (derived from the existing pins). Highlight lights up dot clusters (same
  effect as existing countries), not a flat fill — dots are grid-sampled inside
  each country outline to match the baked dot-map texture.
- **Hovering any pin** now shows its country name and highlights that country
  (previously only hovering the country shape did).
- **Hub-card list** switched to a single 9-across row on wide screens
  (responsive fallback to 5 / 2 / 1 columns); fixed left-alignment so wrapped
  rows line up column-for-column with the row above.

### Homepage kinetic marquee (`index.html`, `assets/site-v2.css`)
- Fixed the outlined (`-webkit-text-stroke`) statement text where tight letter
  spacing made adjacent letters' strokes overlap — loosened the stroked spans'
  letter-spacing (−.04em → −.01em) while keeping the solid words tight.
- Display font for the marquee set to **Space Grotesk** (its geometric letters
  keep the outlined strokes cleaner than Geist). Loaded via the existing Google
  Fonts link; solid and outlined words share the family.

### "How we deliver" panel (`blueprint.html`, `agentic-builder.html`, `compass.html`, `excavator.html`)
- Added the "One stage of the harness." engage panel to Agentic Builder,
  Compass, and Excavator (previously only on Blueprint), each linking across all
  four harness stages with a fitting one-line description.
- On every stage page the current stage's tag is now a non-clickable, dimmed
  `is-current` state (matching the create.html pattern) instead of a live link —
  including Blueprint, which was previously still linking to itself.

---

## Round 4 — Blog layout polish & Financial Services link

### Blog (`blog.html`)
- **Featured cards are now layout-driven, not tag-driven.** Previously only
  articles carrying a "New" badge were shown as big featured cards; every
  category now defaults to its **first two articles as featured cards** (image +
  title + one-line description + Read), with any remaining articles in the
  small-row list. This fixes sparse categories (App Growth, FinTech, QA — 2
  articles each), which no longer show an awkward "1 big + 1 lonely small row."
  Management (1 article) is a single featured card.
- **Small (list) thumbnails enlarged** from 96×60 to 128×80 (matching the
  featured cards' 16:10 ratio) so the size gap between featured and list cards
  is less jarring; row min-height bumped 96→112px to suit.

### Financial Services (`financial-services.html`)
- Added an external link **chainsmith.xyz → https://www.chainsmith.xyz/** on the
  "EVM · Solana · Cosmos · Sui" chain card, styled to match the existing
  blocksmith.co link (new tab, `rel="noopener"`).
- The two chain-card external links are now bottom-aligned across the row
  (pinned to the card bottom regardless of body-copy length).

---

## Round 3 — Responsive & mobile polish

Started from the feedback: *"this size's left/right screen margin is too small."*
Focus: tablet + phone layout correctness across the site.

### Global (`assets/site-v2.css`)
- **Side padding by breakpoint:** tablet / narrow-desktop (601–1024px) restored
  to 40px — it was dropping to 22px too early; phones ≤600px use 20px; desktop
  stays 40px.
- **Scroll-reveal load flash (affects all pages):** the reveal script no longer
  hides sections that are already in the viewport on load, so above-the-fold
  content never "disappears then slides up" on entry. Below-fold sections still
  animate in on scroll. (Applied to all 38 root HTML pages.)
- Shared mobile rule: `.hm-hero` pages get reduced hero→section gap (see below).

### "How we deliver" pages (blueprint, compass, agentic-builder, excavator)
- Two-column "why" layout now collapses to one column at ≤1024px (was 768px),
  so the right-hand illustration is never squeezed off-screen on tablets.
- The illustration column is given a guaranteed minimum width
  (`minmax(460px,1fr)`) so it can't be clipped in the narrow-desktop range
  (1025–1090px). The 460px floor covers the widest illustration (blueprint).
- **agentic-builder & excavator** (blueprint already had this): step rows stack
  on mobile (icon + title, sub-text on the line below) at ≤768px; agentic's
  harness function/agent grids go single-column at ≤560px — fixes right-edge
  clipping on phones.

### Hero → first section mobile gap
Reduced the large empty band (hero bottom + 120px section top ≈ 180px) on:
- `contact.html`, `research.html`
- all `.hm-hero` pages (12 case studies + llm-data-extraction +
  harness-mediated-delivery) via one shared rule.
- (`blog.html` was done at the end of Round 2.)

### financial-services
- The "stack" partner logos now sit in a single left-aligned row at 26px tall on
  mobile (they were wrapping / overflowing the content column).

---

## Round 2 — Content, blog filter & first responsive pass

### Blog — search & category filter (`blog.html`)
- Client-side search box + 7 category filter chips above the post list; empty
  groups hide and counts update live; on-page groups renamed to the 7 category
  names. Category stored as `data-cat` on each row's title span.
- All 29 articles re-classified into the 7 categories.
- NOTE for devs: 4 Blockchain articles are referenced but not yet present
  (Solana migration — Backend, Frontend Part 1, Frontend Part 2, Contracts
  Part 2). Add when content exists.
- Eyebrow changed from the star-dot style to the site-standard breadcrumb
  ("Thinking › Blog"); same on `research.html`.

### Homepage (`index.html`)
- **Removed the intro loading animation** (the "00 → 100" overlay); content
  shows immediately. Added a small inline script after the hero so it reveals on
  parse (no blank hero while the deferred bundle loads).
- "Two ways we engage" tiles keep two columns on tablet, stack only at ≤640px.
- Trusted-by marquee logos given `aspect-ratio` to reserve width before load,
  removing the load-time flicker.

### Article page (`blog-post.html`)
- Centered article body (max-width 760px); white page background; one avatar per
  author name (no overlap); light-theme code blocks; restored X + LinkedIn share
  buttons; reduced hero→toolbar gap.

### Contact page (`contact.html`)
- Added optional "City & Country" field; renamed message label to "How can we
  help" and removed the required constraint; removed the reply-time note.

### Industry pages (financial-services, consumer, legal, health, construction-property)
- Reduced the mobile gap between the hero illustration and the following content.
- Constrained the hero illustration's decorative rings on mobile so they are not
  clipped by the viewport edge.
- `financial-services`: shrank the mobile hero card and unified its ring
  proportion with the other industry pages.

### Offering pages (create, transform, engineering-subscription, enterprise-ai)
- The tag pointing to the current page is now a non-clickable "current" state
  instead of a self-link.
- `transform.html`: fixed a missing `.t` closing tag that pushed the intro
  paragraph into the wrong grid column.

### Category / work pages
- `work.html`: reordered the Blockchain case cards.
- `robotics.html`: removed a stray mark on the "World-builder AI" icon; moved
  technology logos from `uploads/` into `assets/logos/`.

### Case study detail pages (all `case-study-*.html`)
- Left "Case studies" sidebar hides at ≤1024px (was ≤768px), removing the empty
  right-hand space on tablet.

### Responsive fixes
- `blueprint.html`: two-column layout collapses at ≤1024px (was 768px).
- `compass.html`: chip row wraps below 1200px (was forced single-line to 1025px).

### Global styles
- Stats descriptions use `text-wrap:balance` to avoid orphaned last words.

### Cleanup
- Removed design-process artifacts not needed to run the site (`uploads/`,
  `screenshots/`, `dist/`).

---

### Files that make up the site
- All `*.html` pages
- `assets/` (CSS, JS, fonts, images, logos)
- `image-slot.js`
- `countries.geo.json`
