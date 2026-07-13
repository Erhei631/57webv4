# Changelog — 57Blocks Website V4

Grouped into rounds, newest first. Each round lists the changes made and the
files touched.

---

## Round 3 — Responsive & mobile polish (latest)

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
