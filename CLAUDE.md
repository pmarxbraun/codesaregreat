# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Netflix hidden category codes generator - a multi-language Gatsby site that displays Netflix's secret category codes with search and a virtualized grid of ~1,650 categories.

## Development Commands

```bash
# Development
gatsby develop        # Start dev server (alias: npm start)
gatsby build         # Production build
gatsby serve         # Serve production build locally
gatsby clean         # Clear cache and public folder
```

## Architecture

### Tech Stack
- **Framework**: Gatsby 5 (React 18, Static Site Generation)
- **Styling**: Tailwind CSS with PostCSS/Autoprefixer
- **Data Source**: JSON files transformed via `gatsby-transformer-json`
- **Virtualization**: TanStack Virtual for efficient rendering of large lists
- **Language**: TypeScript + JavaScript (mixed)

### Key Patterns

**Multi-language Setup**
- Language routes defined in [src/data/routes.tsx](src/data/routes.tsx): en (default `/`), es, fr, de, ar
- Each language has its own page file in [src/pages/](src/pages/) (index.tsx, es.tsx, fr.tsx, de.tsx, ar.tsx)
- All pages use the shared [src/templates/index.js](src/templates/index.js) template
- All user-facing strings live in [src/data/translations.ts](src/data/translations.ts), keyed by language code; components read them via `t(lang)`. Add a key there rather than hardcoding copy in a component - five locales must stay in sync, and several strings are screen-reader-only (see Accessibility below)
- `RTL_LANGS` in the same file drives the `dir` attribute set by [src/components/seo.js](src/components/seo.js)

**Data Flow**
1. Netflix category codes stored in [src/data/codes.json](src/data/codes.json)
2. Gatsby transforms JSON via `gatsby-transformer-json` plugin
3. Components query data using GraphQL (`allCodesJson` query)
4. [src/components/generator.tsx](src/components/generator.tsx) renders virtualized grid

**Component Structure**
- [src/templates/index.js](src/templates/index.js): Main template with lazy-loaded Generator
- [src/components/generator.tsx](src/components/generator.tsx): Core functionality - virtualized grid using TanStack Virtual with responsive columns (lg: 5, md: 3, sm: 1), row-based virtualization with 200px estimated row height
- [src/components/layout.js](src/components/layout.js): Base layout wrapper
- [src/components/hero.tsx](src/components/hero.tsx): Hero section - holds the page's single `<h1>`
- [src/components/header.tsx](src/components/header.tsx): Banner bar + skip link
- [src/components/footer.tsx](src/components/footer.tsx): Language switcher (the site's `<nav>` landmark)
- [src/components/search-combobox.tsx](src/components/search-combobox.tsx): Radix Popover + cmdk search
- [src/components/seo.js](src/components/seo.js): SEO/meta tags via react-helmet

**State Management**
- React hooks for local state (useState, useEffect)
- `lang` is passed down as a prop from each page file through the template
- No global state management library
- [src/context/LangContext.js](src/context/LangContext.js) and [src/hooks/useSearch.ts](src/hooks/useSearch.ts) are currently unreferenced - do not assume they are wired up

**GraphQL Usage**
- Site metadata configured in [gatsby-config.js](gatsby-config.js)
- Static queries via `useStaticQuery` in components
- Page queries via `export const query` in page files

## Important Notes

- Mix of .tsx (TypeScript) and .js (JavaScript) files - maintain consistency when editing
- Generator component uses `@tanstack/react-virtual` for virtualization
- Category data deduplicated by `link_href` before rendering
- Grid uses `useWindowVirtualizer` (the window is the scroll container - there is no fixed-height overflow wrapper)
- Row virtualizer uses `overscan: 5` for smooth scrolling experience

## Accessibility

Audited against WCAG 2.2 AA with `@axe-core/playwright` across all 5 locales; currently 0 violations. These are load-bearing - check them before changing the relevant component:

- **Search combobox**: `role="combobox"` forbids name-from-content, so the visible placeholder is NOT the accessible name. The `aria-label` on the trigger, the `PopoverContent`, and the `CommandInput` is what names it. Removing it silently reproduces a critical `button-name` failure
- **Headings**: exactly one `<h1>` (Hero). Header title is a `<span>`, category cards are `<h3>` under the grid's visually-hidden `<h2>`
- **Skip link**: first tab stop, targets `#categories`. The grid `<section>` needs its `tabIndex={-1}` for focus to actually move there
- **Virtualization**: a visually-hidden line states the true total, since assistive tech cannot tell that more rows load on scroll
- **RTL**: `dir` comes from `RTL_LANGS`. Category names are English data and carry `lang="en" dir="ltr"` so bidi does not reorder them (otherwise "90-Minute Movies" renders as "Minute Movies-90")
- **New tabs**: every `target="_blank"` needs `rel="noopener noreferrer"` and a visually-hidden `opensNewTab` notice - placed on the link, never inside the `<h3>`, or heading navigation repeats it on every card
- **Contrast**: header/footer bars are `from-red-700 to-red-800` so white text clears 4.5:1. Lightening them breaks AA
- axe reports contrast over CSS gradients as `incomplete`, not `pass` - a clean axe run does not mean the cards were checked
