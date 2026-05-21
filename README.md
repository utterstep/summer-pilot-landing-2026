# Summer Teacher Pilot 2026 — Landing

Single-page static landing for the foundation's summer teacher pilot in Tbilisi (July–August 2026). Russian-only, no build step.

## Files

- `index.html` — the page.
- `styles.css` — all styling.
- `script.js` — sticky-CTA logic + `APPLY_URL` injection.
- `docs/plans/summer-teacher-pilot-landing.md` — design plan / decisions.

## Run locally

Open `index.html` in any browser. No server, no build.

Optional: `python3 -m http.server 8000` from this directory if you want a real URL for testing OG meta.

## Deploy

Drop the four root files (`index.html`, `styles.css`, `script.js`, plus any future image assets) onto any static host:

- Cloudflare Pages — connect repo, build command empty, output directory `/`.
- Netlify — drag-and-drop the folder.
- GitHub Pages — push to `gh-pages` branch and enable Pages.
- Or just `rsync` to any web root.

There are no environment variables and no backend.

## Placeholders to replace before launch

Every TODO is marked with an HTML comment `<!-- TODO -->` or a `// TODO` line. Run `grep -RIn "TODO" .` to list them. Specifically:

| Where | What | Current placeholder |
|---|---|---|
| `index.html` head | `<link rel="canonical">` and `<meta og:url>` | `https://example.com/` |
| `index.html` head | `<meta og:image>` | not added yet |
| `index.html` header / footer | Fund name | `Фонд` |
| `index.html` §06 | Eligibility criteria text | generic placeholder |
| `index.html` §06 + hero badge | Cohort size | `~15` |
| `index.html` §06 | Application deadline | `5 июня 2026` |
| `index.html` §07 | FAQ answers | placeholder answers under real questions |

The form URL is hardcoded directly into the `href` of every `[data-apply]` element in `index.html` (currently `https://forms.gle/m8J9WSR4fBe7s9ZJA`). To change it later, do a single find-and-replace in `index.html`. The page works without JS — `script.js` only handles the sticky-CTA observers.

## Notes on design

- Palette: pale sage background (`--bg`), dark ink text, deep green accent (`--accent`). All tokens live in `:root` of `styles.css`.
- Fonts are system stacks — no web-font request, fast on slow networks.
- The page uses native `<details>` for the FAQ — fully keyboard-accessible, no JS dependency.
- The sticky "Подать заявку" pill is hidden while the hero is on screen and re-hides over the green §08 apply section so the two CTAs don't compete.
- `prefers-reduced-motion` is respected.

## Accessibility quick check

- Skip-to-content link at top.
- All sections use `aria-labelledby` to their heading.
- All CTAs are real `<a href>`.
- Contrast: `--ink` on `--bg` passes AA at body text size; verify any new colors before adding.
