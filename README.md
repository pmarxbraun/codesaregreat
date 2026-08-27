# Codes Are Great

**A multilingual, accessibility-audited directory of Netflix's ~1,650 hidden category codes.**

🔗 **[codesaregreat.com](https://codesaregreat.com)** · 5 languages · WCAG 2.2 AA · 0 axe violations

Netflix hides hundreds of hyper-specific genres behind numeric URLs — `netflix.com/browse/genre/2` is
"Scary Cult Movies from the 1980s". They're real, they work, and they're almost impossible to find.
This site makes all 1,658 of them searchable in English, Spanish, French, German and Arabic.

---

## Table of contents

- [Why this exists](#why-this-exists)
- [Stack](#stack)
- [Quick start](#quick-start)
- [Architecture](#architecture)
- [Accessibility](#accessibility)
- [The data pipeline](#the-data-pipeline)
- [Project structure](#project-structure)
- [Commands](#commands)
- [Contributing](#contributing)
- [Known gaps](#known-gaps)

---

## Why this exists

Netflix's own UI surfaces maybe 30 genres. The underlying taxonomy has thousands — "Movies Based on
Books", "Understated Romantic Dramas", "Films Featuring Marriage" — each reachable only if you already
know its ID. Community lists of these codes exist but are typically one long unsearchable HTML table,
English-only, and full of dead links.

Three things this project tries to do better:

1. **Make it searchable.** 1,658 entries with instant fuzzy filtering, not Ctrl-F on a wall of text.
2. **Make it multilingual.** Five locales, each a statically generated page with proper `hreflang`.
3. **Make it usable by everyone.** See [Accessibility](#accessibility) — this is the part the project
   is actually about.

## Stack

| Concern | Choice |
|---|---|
| Framework | [Gatsby 5](https://www.gatsbyjs.com/) (React 18, static site generation) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) via PostCSS |
| Virtualization | [TanStack Virtual](https://tanstack.com/virtual) (`useWindowVirtualizer`) |
| Search UI | [Radix Popover](https://www.radix-ui.com/) + [cmdk](https://cmdk.paco.me/) |
| Icons | [lucide-react](https://lucide.dev/) |
| Data | Static JSON → GraphQL via `gatsby-transformer-json` |
| Language | Mixed TypeScript / JavaScript |

Everything renders at build time. There is no server, no database, and no client-side data fetching —
the 1,658 categories are baked into each of the five pages.

## Quick start

**Requirements:** Node 18+ (Gatsby 5 requirement; developed on Node 22).

```bash
git clone git@github.com:pmarxbraun/codesaregreat.git
cd codesaregreat
npm install
npm start          # gatsby develop -> http://localhost:8000
```

GraphQL explorer runs at `http://localhost:8000/___graphql`.

To check a change the way CI would see it, always build first — the dev server and the production
build differ in hydration behaviour:

```bash
npx gatsby build && npx gatsby serve -p 9000
```

## Architecture

### Routing and localization

Five locales, each a real page file rather than a runtime language switch:

| Locale | Route | Page file |
|---|---|---|
| English (default) | `/` | `src/pages/index.tsx` |
| Spanish | `/es/` | `src/pages/es.tsx` |
| French | `/fr/` | `src/pages/fr.tsx` |
| German | `/de/` | `src/pages/de.tsx` |
| Arabic (RTL) | `/ar/` | `src/pages/ar.tsx` |

Each page file supplies its own SEO metadata and delegates to the shared
[`src/templates/index.js`](src/templates/index.js), passing `lang` down as a prop. Routes and their
endonyms live in [`src/data/routes.tsx`](src/data/routes.tsx); `hreflang` alternates (plus
`x-default`) are emitted by [`src/components/seo.js`](src/components/seo.js).

**All user-facing strings live in [`src/data/translations.ts`](src/data/translations.ts)**, keyed by
language code and read via `t(lang)`. Add keys there rather than hardcoding copy in a component —
five locales have to stay in sync, and several of the strings are screen-reader-only.

### Data flow

```
src/data/codes.json          3,292 scraped rows
        │
        ▼  gatsby-transformer-json          (hyphens -> underscores: link-href -> link_href)
   allCodesJson GraphQL node
        │
        ▼  useStaticQuery in generator.tsx
   dedupe by link_href                      3,292 -> 1,658 unique
        │
        ▼  useWindowVirtualizer
   ~50 DOM nodes at a time
```

### Virtualization

Rendering 1,658 cards as DOM would tank the page. The grid is row-virtualized against the **window**
scroll (`useWindowVirtualizer`) — there is no fixed-height overflow wrapper. Rows hold 5 / 3 / 1 cards
at `lg` / `md` / base, recalculated on resize, at a 200px estimated row height with `overscan: 5`.

The consequence worth knowing: **only ~50 links exist in the DOM at any moment.** That's invisible to a
sighted user and completely invisible to a screen reader, which is why the grid carries an explicit
count — see below.

## Accessibility

This is the part of the project worth reading. The site was audited against **WCAG 2.2 AA** using
[`@axe-core/playwright`](https://github.com/dequelabs/axe-core-npm) across 12 page-states
(5 locales × static, plus a 390px mobile viewport, plus the search combobox open and queried).

**Result: 13 violation nodes across 2 rules → 0.**

What that involved:

### What the automated scan caught

- **Unnamed search combobox** *(critical, all 5 locales)* — the trigger carried `role="combobox"`
  wrapping visible placeholder text. ARIA **forbids name-from-content on `combobox`**, so that text was
  discarded and the accessible name resolved to `""`. The site's primary control announced as
  "combobox, collapsed", unnamed. The popover's dialog and input were unnamed too.
- **Contrast** — hero subtitle at 3.65:1, below the 4.5:1 floor at its mobile size.

### What the automated scan could *not* catch

axe returned **525 nodes as `incomplete`** — it will not compute contrast against a CSS gradient, and
nearly every surface here is one. Those ratios were computed manually against each gradient stop.
Cards passed at 7.5:1; the footer language links did not (3.25:1, black on red), nor did the header
title and copyright (4.39:1). **None of those three were flagged by axe.**

Six further defects came from reading the Chrome accessibility tree linearized in reading order — the
sequence a screen reader actually speaks — all in code that axe reported clean:

| SC | Defect |
|---|---|
| 2.4.1 | No skip link past 1,658 links; grid `<section>` mapped to `role="generic"` |
| 1.3.1 | Virtualized list silently "ended" at 50 of 1,658 with nothing announcing the rest |
| 3.1.2 | Arabic set `lang` but never `dir` — every `rtl:` Tailwind variant was dead code |
| 1.4.1 | Current language conveyed by colour alone; exonyms unmarked |
| 1.3.1 | Two `<h1>`s; site title inside a `<nav>` containing no navigation |
| 3.2.5 | 1,658 unannounced `target="_blank"`, label hardcoded English on all locales |

### Invariants — please don't regress these

- **The combobox `aria-label` is load-bearing.** Removing it silently reproduces a critical
  `button-name` failure, because the visible text is not a valid accessible name for that role.
- **Exactly one `<h1>`** (the Hero). Header title is a `<span>`; cards are `<h3>` under the grid's
  visually-hidden `<h2>`.
- **The skip link needs the grid's `tabIndex={-1}`** or focus scrolls without moving.
- **Category names carry `lang="en" dir="ltr"`.** They're English data; without this, bidi reorders
  them inside the Arabic page and "90-Minute Movies" renders as "Minute Movies-90".
- **New-tab notices belong on the link, never inside the `<h3>`** — otherwise heading navigation
  repeats "(opens in a new tab)" on every single card.
- **Header/footer bars are `from-red-700 to-red-800`** so white text clears 4.5:1. Lightening them
  breaks AA.
- **A clean axe run does not mean the cards were checked.** Gradients report `incomplete`, not `pass`.

### Reproducing the audit

`@axe-core/playwright` is not currently a project dependency — the audit was run against the
production build with:

```bash
npx gatsby build && npx gatsby serve -p 9000
```

```js
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext();   // axe requires a context, not browser.newPage()
const page = await context.newPage();
await page.goto('http://localhost:9000/', { waitUntil: 'networkidle' });

const { violations, incomplete } = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  .analyze();

console.log(violations.length, 'violations |', incomplete.length, 'need manual review');
await browser.close();
```

Read `incomplete` as well as `violations`, or you will miss most of this page.

## The data pipeline

[`src/data/codes.json`](src/data/codes.json) is a Web Scraper export of the
[What's on Netflix ID bible](https://www.whats-on-netflix.com/news/the-netflix-id-bible-every-category-on-netflix/).
It keeps the scraper's original field names, which matters in two ways:

- Rows carry scraper artifacts (`web-scraper-order`, `web-scraper-start-url`) that aren't used.
- Fields are **hyphenated** (`link-href`), but `gatsby-transformer-json` rewrites hyphens to
  underscores, so GraphQL queries and component code use **`link_href`**. This trips people up.

3,292 rows dedupe to 1,658 unique categories — the source lists many codes under several names.
Deduplication happens at render time, keyed on `link_href`.

[`clean_categories.py`](clean_categories.py) prunes dead entries by requesting each Netflix URL and
dropping 404s. It needs Python 3 and `requests`, and is run manually — Netflix retires codes
periodically, so it's worth re-running occasionally rather than on a schedule.

```bash
pip install requests
python3 clean_categories.py
```

## Project structure

```
src/
├── components/
│   ├── generator.tsx        Virtualized category grid — the core of the app
│   ├── search-combobox.tsx  Radix Popover + cmdk search
│   ├── header.tsx           Banner bar + skip link
│   ├── footer.tsx           Language switcher (the site's <nav> landmark)
│   ├── hero.tsx             Hero — holds the page's single <h1>
│   ├── layout.js            Shell: header / main / footer
│   ├── seo.js               Helmet meta, hreflang alternates, lang + dir
│   └── ui/                  Thin shadcn-style primitives (button, popover, combobox)
├── data/
│   ├── codes.json           3,292 scraped rows
│   ├── routes.tsx           Locale codes, endonyms, slugs
│   └── translations.ts      All user-facing strings + RTL_LANGS
├── pages/                   One file per locale + 404
├── templates/index.js       Shared page template
├── hooks/useSearch.ts       ⚠️ currently unreferenced
├── context/LangContext.js   ⚠️ currently unreferenced
└── styles/global.css        Tailwind entrypoint
```

## Commands

```bash
npm start              # gatsby develop — dev server on :8000
npm run build          # gatsby build — production build to public/
npm run serve          # gatsby serve — serve the production build
npm run clean          # gatsby clean — clear .cache and public/
```

## Contributing

Read [Architecture](#architecture) and the accessibility
[invariants](#invariants--please-dont-regress-these) first — between them they cover the things most
likely to break by accident.

A few house rules:

- **Strings go in `src/data/translations.ts`**, never inline. All five locales, or none.
- **Run a build before opening a PR.** Dev-server behaviour is not production behaviour here.
- **If you touch the header, footer, grid, or combobox, re-run the axe audit.** Those four components
  hold every invariant listed above.
- The codebase mixes `.tsx` and `.js`. Match the file you're in rather than converting it.

## Known gaps

Stated plainly, because pretending otherwise wastes a contributor's afternoon:

- **No test suite and no CI.** The a11y audit is currently a manual step, not a gate. Wiring
  `@axe-core/playwright` into GitHub Actions as a required check is the single highest-value
  contribution available.
- **The audit scripts aren't committed.** They ran locally; only the snippet above is reproducible
  from this repo today.
- **No screen-reader pass has been done by a human.** The audit read the accessibility tree, which
  covers structure and naming — it does not tell you whether hearing 1,658 links read aloud is
  actually bearable. That judgement is still owed.
- **`useSearch.ts` and `LangContext.js` are dead code.** Either wire them up or delete them.
- **`clean_categories.py` has no scheduled run**, so dead Netflix codes accumulate between manual runs.
- **No `LICENSE` file.** The repo is public but unlicensed, which by default means no reuse rights.
  Worth resolving.
- **Translations are hand-written**, not managed — adding a sixth locale means adding every key by hand.

## Credits

Category data from the [What's on Netflix ID bible](https://www.whats-on-netflix.com/news/the-netflix-id-bible-every-category-on-netflix/).
Not affiliated with, endorsed by, or connected to Netflix.
