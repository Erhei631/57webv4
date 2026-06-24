# 57Blocks Website V3 — Engineering Handoff

This package is a complete, runnable reference implementation of the homepage. Every
animation, hover state, and interaction in here is real code — treat it as the source of
truth for both design and behavior. This doc tells a frontend engineer how to take it to
production.

---

## 1. What's in the box

```
deploy/
├─ index.html            # full page markup (semantic sections, in document order)
├─ vercel.json           # clean URLs + immutable asset caching
├─ image-slot.js         # drag-and-drop image placeholder web component
├─ HANDOFF.md            # this file
├─ README.md             # quick deploy instructions
└─ assets/
   ├─ site-v2.css        # ALL styles (≈690 lines, token-driven, no preprocessor)
   ├─ site-v2.js         # loader, scroll-reveal, accordion, industries tabs
   ├─ hero-fx.js         # floating colour-aura that drifts behind the hero + CTA
   ├─ logo-57blocks.svg
   ├─ logos/             # client logo marquee (c1–c11.png)
   └─ cases/             # selected-work covers (supio, fanatics, gmi, rain, huma, lifi)
```

No build step, no dependencies, no framework. Open `index.html` and it runs.

---

## 2. Design tokens

All defined as CSS custom properties in `:root` (top of `site-v2.css`). Port these first.

### Color
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#EDEDEF` | page background (light grey canvas) |
| `--paper-2` | `#E2E2E6` | inset panels |
| `--ink` | `#0C0C0E` | primary text / near-black |
| `--ink-soft` | `#26262B` | secondary headings |
| `--muted` | `#6C6C73` | body / captions |
| `--line` | `rgba(12,12,18,.13)` | hairline dividers |
| `--line-2` | `rgba(12,12,18,.22)` | stronger dividers |
| `--accent` | `#6A4DFF` | interaction / links / hover (violet) |
| `--violet` | `#7C5CFF` | aura blob |
| `--pink` | `#A66BFF` | aura blob |
| `--cyan` | `#46C7FF` | aura blob |
| `--lime` | `#56D2E8` | aura blob |
| `--glass` | `rgba(255,255,255,.55)` | frosted surfaces |

### Type
| Role | Family | Notes |
|---|---|---|
| Display | **Bricolage Grotesque** (fallback Space Grotesk) | headings, weight 600, tight tracking `-.02 to -.035em` |
| Body | **Geist** (fallback system-ui) | weight 400, line-height 1.5 |
| Mono | **JetBrains Mono** | labels, eyebrows, numbers, `letter-spacing .1em uppercase` |

All three load from Google Fonts in `<head>` of `index.html`. **For production, self-host
them** (next/font, fontsource, or local `@font-face`) to remove the render-blocking CDN
request and for privacy/compliance.

### Other
- `--ease: cubic-bezier(.16,1,.3,1)` — the single easing curve used for every transition.
- `--maxw: 1340px`, content padding `0 40px` (`.wrap`).
- Section rhythm: `.sec{padding:120px 0}`.

---

## 3. Page structure (sections, top → bottom)

| # | Section | id | Notes |
|---|---|---|---|
| 1 | Loader | `#loader` | counts 00→ then unlocks scroll; `body.locked` |
| 2 | Nav | `.nav` | sticky, logo + anchor links + "Talk to us" |
| 3 | Hero | `#top` | headline, CTAs, animated bg (starfield + wire comets + drifting aura) |
| 4 | Stats | — | scroll-reveal numbers |
| 5 | Client marquee | `.marquee-band` | infinite logo scroll (`logos/c1–c11`) |
| 6 | The Engine | `#engine` | accordion of Blueprint / Builder / Compass / Excavator |
| 7 | What AI-native delivery changes | `.wc` | editorial split: sticky statement + numbered list |
| 8 | Industries | `#industries` | 4-column index, hover flips icon + accent rule |
| 9 | Selected work | `#work` | case grid, cover image revealed on hover |
| 10 | Research | — | papers list |
| 11 | Company / Operator | `#operator` | Build / Invest / Operate, hover flips icon |
| 12 | Final CTA | `#contact` | matches hero bg, drifting aura |
| 13 | Footer | `footer` | logo + nav columns |

---

## 4. Interactions & motion (in JS)

- **`site-v2.js`**
  - *Loader*: locks scroll, runs a count-in, then removes `body.locked`.
  - *Scroll reveal*: `IntersectionObserver` toggles `.is-in` on `.rv` / `.sec-reveal`
    elements; staggered via `.rv-d1`, `.rv-d2` delay classes.
  - *Engine accordion*: single-open; click toggles `.open`, animates `max-height`.
  - *Industries tabs* (if present): `.tab` ↔ `.tpanel` activation.
- **`hero-fx.js`**: spawns soft gradient "aura" blobs inside every `.aura` container
  (hero + final CTA) that drift and morph autonomously. Pure transform animation, GPU-cheap.
- **CSS-only**: marquee scroll, icon flip on hover (`rotateY(180deg)`), case-cover reveal,
  button fills, accent rule thickening. All gated behind `prefers-reduced-motion`.

> Accessibility: motion already respects `@media (prefers-reduced-motion: reduce)`. Keep
> this when porting — reduced-motion users should see the end state, not the animation.

---

## 5. Productionization checklist

**Required before launch**
- [ ] Wire the **"Talk to us / Talk to our team"** CTAs — currently `href="#contact"` /
      `href="#"`. Hook to a real form + backend (see open questions §7).
- [ ] Replace placeholder `href="#"` on Engine "Explore", case cards, research links with
      real destinations (or remove if not yet live).
- [ ] Self-host fonts; drop the Google Fonts `<link>`s.
- [ ] Add `<meta>` SEO + Open Graph/Twitter tags, favicon set, `robots.txt`, `sitemap.xml`.
- [ ] Convert raster images (`logos/`, `cases/`) to WebP/AVIF; add `width`/`height` and
      `loading="lazy"` / `decoding="async"`.
- [ ] Confirm final, license-cleared client logos and case-study covers.

**Recommended**
- [ ] If the corporate site is React/Next, split `index.html` into the components in §3,
      move CSS into the project's styling system (CSS Modules / Tailwind / styled), and
      re-implement `hero-fx.js` + scroll reveal as hooks/components.
- [ ] Extract copy, cases, logos into data (CMS or JSON) so non-engineers can update them.
- [ ] Add analytics (GA4 / Plausible) and a cookie/consent banner if EU traffic.
- [ ] Lighthouse pass: target LCP < 2.5s, CLS < 0.1; the hero bg animation and fonts are
      the two things to watch.
- [ ] i18n scaffold if a Chinese/English toggle is needed.

---

## 6. Browser support
Modern evergreen (Chrome, Edge, Safari, Firefox). Uses CSS grid, custom properties,
`IntersectionObserver`, `backdrop-filter`. No IE. `backdrop-filter` degrades gracefully.

---

## 7. Open questions for the business (please answer for the engineer)
1. Where do form submissions go — email / HubSpot / Salesforce / 飞书?
2. Multi-language (中/英)?
3. Analytics platform + consent requirements?
4. Domain & hosting owner (Vercel / Netlify / 自有)?
5. CMS for cases & logos, or hard-coded for now?
6. Final asset pack (logos, case covers, OG image) and their usage rights?

---

## 8. Deploy
See `README.md`. Short version: it's static — `vercel --prod` from this folder, or drag
the folder into vercel.com/new with Framework = **Other** and an empty build command.
