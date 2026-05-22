# A/B Variant: `/lessons.html`

## Context

A friend's feedback proposes a different narrative arc for the landing: lead with *authority* (we know how to teach), then *method* (we'll teach you, here's the format), then *conditions* (timeline, terms, application). The current `/index.html` is mission-first ("Учитель — главная переменная" / "Исследовательский подход в обучении"). To validate the friend's hypothesis without committing, ship a parallel `/lessons.html` at the same domain. The user will share both URLs in different channels and watch conversion via a `?source=lessons` query string on the apply form.

This is an A/B *content* experiment, not an A/B *infrastructure* experiment — no JS routing, no analytics platform, no traffic-splitting code. Two files, shared in different places.

## Decisions captured from interview

| | |
|---|---|
| A/B mechanic | Share two URLs manually; no JS routing |
| Form tracking | Append `?source=lessons` to `APPLY_URL` on `/lessons.html`; `/index.html` unchanged |
| Hero H1 | "Мы проводим классные уроки. Научим и вас." |
| Hero eyebrow | Same as index: "Методический интенсив для учителей начальной и средней школы" |
| Block 1 contents | Lead from methodology doc + key-distinction block + team cards |
| Block 2 contents | Format facts (offline / no Zoom / small cohort / Тбилиси) + 3-phenomena intro + modules + camp practicum + outcomes |
| Block 3 contents | Timeline + Честный обмен + Кому подойдёт + FAQ + Заявка |
| Outcomes placement | End of Block 2 (closes "we'll teach you" with "you'll be able to") |
| CSS | Shared `styles.css`; one small new component for format-facts |
| JS | Shared `script.js` unchanged |

## File changes

```
/Users/utterstep/work/fund/summer-georgia-2026/landing/
├── lessons.html                                # NEW — A/B variant
├── styles.css                                  # MOD — add .format-facts component
├── docs/plans/lessons-html-variant.md          # NEW — mirror of this plan
└── index.html                                  # UNCHANGED (control variant)
```

No changes to `script.js`, `README.md`, or `CNAME`. The new page is served at `https://summer-pilot-2026.utterstep.app/lessons.html` via the existing GitHub Pages config.

## Page structure — `/lessons.html`

Reuses the existing header/footer pattern and the same hero scaffold. Three thematic "Part" blocks, each introduced by a single intro section, then the relevant content sections.

### Header
- Same as index, identical brand, identical nav links (Программа/Команда/FAQ/Подать заявку).
- `[data-apply]` href → `https://forms.gle/m8J9WSR4fBe7s9ZJA?source=lessons` (with `target="_blank" rel="noopener"`).

### Hero (`.hero`)
- Eyebrow: "Методический интенсив для учителей начальной и средней школы"
- H1: `Мы проводим классные уроки.<br>Научим <span class="nowrap">и вас</span>.`
- Lead: "Мы — благотворительный образовательный фонд. Учитель — главная переменная в том, как сложится жизнь ребёнка, и мы помогаем учителям становиться той самой переменной: удерживать внимание и внутреннюю мотивацию ребёнка в эпоху быстрого дофамина и «домашки от ИИ»."
- (Drop the `.hero-distinct` block here — it migrates into Block 1.)
- CTAs: Подать заявку + Узнать больше → `#part-1`
- Badge row: identical to index.

### Part 1 — "Мы знаем, как проводить классные уроки"
Two regular sections introduced by one part-intro:

**§01 part-intro**
- Mono label: `ЧАСТЬ 1 ИЗ 3`
- Big serif title: "Мы знаем, как проводить классные уроки"
- Lead paragraph (drawing from the methodology doc): "Десятилетиями мы строим уроки, на которых дети не пересказывают учебник, а сами проходят путь к открытию. Мы знаем, как ставить вопрос, который запускает мышление; как удерживать дискуссию, в которой говорят все; как поддержать ребёнка, который застрял на «белом листе»."

**§02 — Подход**
- Key-distinction block (`.key-distinction`, moved verbatim from current index §03): «Главное отличие нашего подхода — 80% программы — это сам опыт быть учеником…»
- Followed by the methodology-doc-flavored paragraph about why this matters now (15-second video / AI homework era).

**§03 — Команда**
- The four team cards (Влад, Аня, Антон, Борис) — verbatim from current `team-card` block.
- "И другие — анонсируем имена в ближайшее время."

### Part 2 — "Мы научим вас. Вот как."

**§04 part-intro**
- Label: `ЧАСТЬ 2 ИЗ 3`
- Title: "Мы научим вас. Вот как."
- Lead: "Программа короткая и плотная. Никакого Zoom, никаких записей — только живая работа в небольшой когорте."

**§05 — Формат** *(new component on this page)*
- `.format-facts` strip: 4 mini-tiles. Each tile has a mono label, big serif value, short muted line.
  - `ОЧНО` · **Тбилиси** · школа «Проектор», без Zoom и записей
  - `КОГОРТА` · **~15 учителей** · работаем в группе, а не в зале
  - `ИНТЕНСИВ` · **24 ак. часа** · за 2 недели
  - `ПРАКТИКА` · **~12 ак. часов** · ваши собственные уроки с детьми
- Below the strip: short paragraph: "Никаких Zoom-сессий, никаких записей. На интенсиве и в лагере — живая работа лицом к лицу. По-другому это просто не работает."

**§06 — Содержание интенсива**
- `.section-subhead` "Про что будут занятия?"
- `.modules-intro` callout (3-phenomena reassurance, verbatim).
- `.section-subhead` "Что мы пройдём за интенсив"
- The 5-item `.modules` numbered list (verbatim).

**§07 — Практика с детьми**
- Content from current §05 (`Как устроены занятия с детьми`): the section-lead about pilot evaluation + the paragraph-lead + the 5-item `.criteria` list.
- Reframed eyebrow to fit the "what you'll do" arc.

**§08 — Что вы сможете после программы**
- Verbatim from current §04: 6 outcomes via `.outcomes` list. Closes Part 2.

### Part 3 — "Условия и заявка"

**§09 part-intro**
- Label: `ЧАСТЬ 3 ИЗ 3`
- Title: "Условия и заявка"
- Lead: "Когда, где, на каких условиях — и как податься."

**§10 — Расписание**
- Current §01 timeline content: 2-phase timeline + `.timeline-note` ("Точные даты определим до 10 июня").

**§11 — Честный обмен**
- Verbatim from current §02: two-column give/get with stipend.

**§12 — Кому подойдёт**
- Verbatim from current §07: topics list + facts dl (cohort/deadline/response).

**§13 — FAQ**
- Verbatim from current §08: 6 `<details>` accordions.

**§14 — Заявка**
- Verbatim from current §09: green section, big CTA, contact email.

### Footer
- Same as index.
- Sticky CTA (`.sticky-cta`) carried over, with the `?source=lessons` URL.

## CSS additions — `styles.css`

One new component: `.format-facts`. Place near `.stats` (both are "facts strip" patterns). Approximate spec:

```css
.format-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 1.5rem;
}
.format-facts__tile {
  padding: 1.25rem;
  background: var(--bg);
  border: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.section--alt .format-facts__tile { background: var(--bg-alt); /* or invert */ }
.format-facts__label { mono uppercase, --ink-muted, 0.75rem }
.format-facts__value { serif, 1.5rem, --ink, line-height 1.1 }
.format-facts__note  { sans, 0.875rem, --ink-muted, line-height 1.4 }
```

Optional minor addition: a `.part-intro` modifier that gives the part-intro section a slightly larger title and a clear mono label, distinct from regular `.section-label`. Could be done by simply reusing `.section-label` and bumping `.section-title` size via a one-off class — cheap to ship.

No other CSS changes anticipated. All other sections reuse existing components (`.hero`, `.stats`, `.timeline`, `.key-distinction`, `.modules-intro`, `.modules`, `.outcomes`, `.criteria`, `.team-card`, `.exchange`, `.topics`, `.facts`, `.faq`, `.btn`, `.section--apply`, `.sticky-cta`).

## Apply-URL handling

`script.js` previously did URL injection but was simplified to only handle the sticky CTA observers — apply URLs are hardcoded in HTML now. `/lessons.html` will use a different hardcoded URL: `https://forms.gle/m8J9WSR4fBe7s9ZJA?source=lessons`. Find-and-replace target later when the user adds the real `entry.<id>` to the form.

## Section alternation

Page rhythm: `bg / alt / bg / alt / bg / alt / bg / alt / bg / alt / bg / alt / bg / apply`. With 14 sections (3 part-intros + 11 content + apply), alternation is easy. Part-intros use `section--alt`-style sage tinting to set them apart from content sections; content sections then alternate normally beneath. Exact pattern to be tuned during build.

## Verification

1. Open `/lessons.html` directly in browser. Confirm three Part blocks render in order, each with a part-intro and the listed sections.
2. Verify section-label numbering reads `§01` through `§14` cleanly.
3. Click any "Подать заявку" CTA: confirm URL `https://forms.gle/m8J9WSR4fBe7s9ZJA?source=lessons` opens in a new tab.
4. Compare to `/index.html` in two browser tabs — they should look distinctly different in narrative flow but visually consistent in palette, typography, spacing.
5. Responsive view at 360 px, 640 px, 768 px, 1024 px — check `.format-facts` collapses cleanly on narrow widths.
6. Keyboard: tab through hero, all CTAs, FAQ accordions. Sticky CTA reveal/hide behavior identical to index.
7. Run `grep -RIn "TODO" .` — same TODO list as index (cohort/deadline/eligibility/FAQ-answers placeholders), plus `?source=lessons` URL noted as "swap for real entry ID later."
8. Push to main; GitHub Pages auto-builds; verify at `https://summer-pilot-2026.utterstep.app/lessons.html`.

## Out of scope

- Analytics platform / split-traffic infrastructure.
- Separate Google Form for variant B.
- Hashed asset filenames.
- Cross-link between variants (deliberate — A/B test integrity).
- Translations.
- New imagery.

## Implementation order

1. Copy `index.html` → `lessons.html`; gut the body but keep `<head>` and skeleton.
2. Write the new hero with the new H1 and methodology-flavored lead.
3. Build Part 1 (intro + key-distinction + team).
4. Build Part 2 (intro + format facts + modules-intro + modules + camp criteria + outcomes).
5. Build Part 3 (intro + timeline + честный обмен + кому подойдёт + FAQ + заявка).
6. Wire `?source=lessons` into every `[data-apply]` element (4 of them: nav CTA, hero CTA, §14 CTA, sticky CTA).
7. Add `.format-facts` block to `styles.css`.
8. Open in browser, walk verification.
9. Mirror plan to `docs/plans/lessons-html-variant.md`.
10. Commit + push when user approves.
