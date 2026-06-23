# 57Blocks — Website V3 (static)

Static, framework-free site. No build step. `index.html` + `assets/`.

## Deploy to Vercel

### Option A — CLI
```bash
npm i -g vercel        # once
cd deploy
vercel                 # preview deploy
vercel --prod          # production deploy
```
When asked for settings, accept defaults — there is **no build command** and the **output directory is the project root** (`.`). Vercel auto-detects a static site.

### Option B — Dashboard (drag & drop)
1. Go to https://vercel.com/new
2. Drag this whole `deploy/` folder onto the page (or import the Git repo if you commit it).
3. Framework preset: **Other**. Build command: **(leave empty)**. Output directory: **(leave empty / `.`)**.
4. Deploy.

### Option C — Git
Commit the contents of `deploy/` to a repo and import it in Vercel. Same settings as above.

## Structure
```
index.html              # the page
vercel.json             # clean URLs + asset caching
image-slot.js           # drag-and-drop image placeholders
assets/
  site-v2.css           # all styles
  site-v2.js            # loader, scroll reveal, accordion, etc.
  hero-fx.js            # hero/CTA floating aura
  logo-57blocks.svg
  logos/                # client logo marquee (c1–c11)
  cases/                # selected-work cover images
```

## Notes
- Fonts (Bricolage Grotesque, Geist, JetBrains Mono) load from Google Fonts over the network.
- Everything else is self-contained and served as static files — no server, env vars, or runtime needed.
