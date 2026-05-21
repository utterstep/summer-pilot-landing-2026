# Summer Teacher Pilot 2026 — Landing Page

## Context

A new static landing page to recruit ~15 Russian-speaking teachers in Tbilisi for a paid pilot teaching-methodology program (workshops + summer-camp lessons) running July–August 2026. The audience is teachers deciding how to spend their summer; the page must (a) communicate mission and method quickly, (b) make the stipend/exchange explicit, (c) drive applications via an external form. The fund brand is unfinalized; tone is editorial and warm — distinct from generic edtech, inspired by the Jessy Grossi reference but lighter and friendlier.

The project directory `/Users/utterstep/work/fund/summer-georgia-2026/landing/` is currently empty — this is a greenfield build.

## Decisions from interview

| | |
|---|---|
| Stack | Static HTML + CSS + minimal JS (no build step) |
| Hosting | TBD — pure static, ship-anywhere |
| Form | External (Tally/Google Forms); single `APPLY_URL` placeholder used by all CTAs |
| Language | Russian only |
| Palette | Pale sage/olive bg, dark text, deep green accent |
| Photos | None in v1; typography + color blocks only |
| Brand | Placeholder "Фонд" |
| CTAs | Inline at key sections + sticky pill after hero scrolls past |
| Cohort | ~15; deadline 5 июня 2026 (placeholder); 3-day response promise |
| FAQ | 6 items, placeholder answers |
| Team | Vlad / Anya / Anton verbatim bios + "more team members coming soon" |
| Partners | Школа Проектор inline in venue blurb only |

## File structure

```
/Users/utterstep/work/fund/summer-georgia-2026/landing/
├── index.html        # The page (semantic HTML5)
├── styles.css        # All styling
├── script.js         # IntersectionObserver for sticky-CTA reveal
├── README.md         # Placeholder/TODO checklist + how to deploy
└── docs/plans/summer-teacher-pilot-landing.md  # Mirror of this plan
```

No build tooling. No package.json. Three files for the page itself. README lists every `<!-- TODO -->` so the placeholder swap before launch is one find-and-replace pass.

## Page structure (single scrollable page)

Section order:

1. **Header** — `Фонд` wordmark left; in-page anchor nav right (Программа · Команда · FAQ · primary "Подать заявку" button). Collapses on mobile to logo + apply button.
2. **Hero** — H1 mission line ("Учитель — главная переменная"), program one-liner subtitle ("Летняя пилотная программа · Тбилиси · июль–август 2026"), primary "Подать заявку" CTA, secondary "Узнать больше" anchor. Small badge row: dates · venue · cohort size.
3. **§01 — О программе** — Two blocks: *Воркшопы* (36 ч / 2 нед.) + *Занятия с детьми в летнем лагере* (8 уроков × 2 ак. часа). Title, duration tag, one-paragraph description each.
4. **§02 — Что вы вкладываете / Что вы получаете** — Two-column exchange. Left: time (36 + 16 ч), real classroom practice, peer cohort, openness to feedback. Right: training, stipend (~400 GEL обучение + ~600 GEL занятия = ~1000 GEL итого), methodology mentorship, post-pilot reflection materials.
5. **§03 — Как устроены воркшопы** — Bullet list of covered skills (storytelling, group dynamics, uncertainty management, individual thinking dynamics, age-specific behavior, curriculum design). Includes "80% программы — опыт быть учителем" callout. Venue mention: "Воркшопы проходят в школе **Проектор** в Тбилиси."
6. **§04 — Как устроены занятия с детьми** — Numbered list of the 5 pilot evaluation criteria (verbatim from brief).
7. **§05 — Кто в команде** — Vlad / Anya / Anton bios verbatim. Final line: "и другие — анонсируем в ближайшее время."
8. **§06 — Кто может участвовать** — Placeholder eligibility (subject area, experience, location), cohort size (~15), deadline (5 июня 2026), response promise ("Отвечаем на каждую заявку в течение 3 дней").
9. **§07 — Частые вопросы** — 6 items, `<details>`/`<summary>` accordions:
   1. Какой предмет / будут ли разные направления?
   2. На каком языке ведутся занятия?
   3. Нужен ли опыт / педобразование?
   4. Можно ли участвовать только в одной части?
   5. Как выбираете учителей?
   6. Что будет после пилота?
10. **§08 — Заявка** — Big final CTA "Подать заявку" + secondary "Остались вопросы? — utterstep@hey.com".
11. **Footer** — "© 2026 Фонд · placeholder" only.

**Sticky CTA**: small "Подать заявку" pill, bottom-right (full-width on mobile). Hidden until hero scrolls out of view; hidden again when §08 enters the viewport (so it doesn't compete with the big final CTA). Implemented via `IntersectionObserver` watching the hero and §08.

## Style system

CSS custom properties in `:root`:

```css
--bg: #eef0e6;          /* pale sage */
--bg-alt: #e3e7d8;      /* alternating section */
--ink: #1c2218;         /* primary text */
--ink-muted: #5a6253;
--accent: #2f5e3a;      /* deep green */
--accent-hover: #244a2c;
--rule: #c8cebb;        /* hairline */
--max-width: 920px;
```

**Typography** (system stacks — no web fonts to keep it fast and offline-friendly):
- Headings: `"Charter", "Iowan Old Style", Georgia, serif`
- Body: `-apple-system, system-ui, "Segoe UI", sans-serif`
- Labels / section numbers: `ui-monospace, "SF Mono", Menlo, monospace` — uppercase, letter-spaced, for the editorial `§01 —` markers
- Fluid sizing with `clamp()`

**Layout**:
- Single column, ≤ 920px content width, generous side padding (`clamp(1.25rem, 5vw, 2.5rem)`)
- 1px sage hairline (`--rule`) between sections
- Alternating section backgrounds (`--bg` / `--bg-alt`) for rhythm

**Interactivity** (`script.js`, ~30 lines total):
- `IntersectionObserver` on hero → toggles `body.is-scrolled-past-hero`
- `IntersectionObserver` on §08 → toggles `body.is-at-apply` (hides sticky CTA)
- That's it. No frameworks, no dependencies.

**Accessibility**:
- Semantic HTML5: `<header>`, `<main>`, `<section>` with `aria-labelledby`, `<footer>`, `<nav>`
- Skip-to-content link as first focusable element
- All CTAs are real `<a href>` with `target="_blank" rel="noopener"` for external form
- WCAG AA contrast verified against sage palette
- `<details>` for FAQ (no JS needed, keyboard-accessible by default)
- Reduced-motion respected (`prefers-reduced-motion`)

**Mobile** (≤ 640px):
- Single column always (no column drops)
- Header: logo + apply button only; anchor links hidden
- Sticky CTA: full-width pill at bottom
- Hero badge row wraps

## Placeholders (all marked `<!-- TODO -->` in HTML and listed in README)

| Placeholder | Value used | Replace with |
|---|---|---|
| `APPLY_URL` constant | `#apply-placeholder` | Real form URL (Tally/Google Forms) |
| Fund brand | `Фонд` | Real name |
| Eligibility criteria block | generic placeholder text | Final criteria |
| Cohort size | `~15` | Confirmed number |
| Deadline | `5 июня 2026` | Confirmed date |
| FAQ answers | placeholder | Real answers |
| `<meta og:url>` + canonical | `https://example.com` | Real domain |
| `<meta og:image>` | none yet | Social-share image URL |

The `APPLY_URL` lives as a constant at the top of `script.js`; the script substitutes it into every `[data-apply]` element's `href` on load. Single line to change for the swap.

## Verification

1. Open `index.html` directly in a browser (no server needed) — confirm all 11 sections render in order, no console errors.
2. DevTools responsive view: 360 px, 640 px, 768 px, 1024 px, 1440 px. Confirm header collapses, sticky CTA goes full-width on ≤ 640 px.
3. Scroll behavior:
   - Sticky CTA hidden at top → appears after hero leaves viewport → disappears when §08 enters.
   - Anchor links smooth-scroll to correct sections.
4. Open the form: change `APPLY_URL` in `script.js`, hard-refresh, click every CTA — all open the new URL.
5. Keyboard navigation: tab through header → hero → all CTAs → FAQ accordions. Confirm focus rings visible.
6. `prefers-reduced-motion: reduce` in DevTools → confirm no animations beyond instant transitions.
7. Lighthouse (Chrome DevTools): target Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
8. W3C HTML validator: zero errors.
9. Color contrast check: each text/bg pair against WCAG AA (`--ink` on `--bg`, `--accent` on `--bg`, `--ink-muted` on `--bg`).
10. Final placeholder check: `grep -n "TODO" index.html script.js README.md` — list must match the placeholder table above.

## Out of scope for v1

- Analytics (Plausible / GA) — wire when domain is confirmed
- OG/social-share image generation (placeholder meta only)
- English/Georgian translations
- Custom backend / native form
- Photo / illustration assets
- Email collection directly on the landing (delegated to external form)
- Multi-page (everything is single scrollable page)

## After plan approval

Implementation order:
1. Create `index.html` with full semantic skeleton + content + placeholders
2. Create `styles.css` with the sage palette + type system + layout
3. Create `script.js` for sticky-CTA + APPLY_URL injection
4. Create `README.md` with placeholder checklist + deploy notes
5. Mirror this plan to `docs/plans/summer-teacher-pilot-landing.md` in the project dir
6. Open in browser, walk through the verification checklist
