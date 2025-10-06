# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Netflix hidden category codes generator - a multi-language Gatsby site that displays Netflix's secret category codes with search and infinite scroll functionality.

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
- Localization strings are hardcoded within components (see Generator component)

**Data Flow**
1. Netflix category codes stored in [src/data/codes.json](src/data/codes.json)
2. Gatsby transforms JSON via `gatsby-transformer-json` plugin
3. Components query data using GraphQL (`allCodesJson` query)
4. [src/components/generator.tsx](src/components/generator.tsx) renders virtualized grid

**Component Structure**
- [src/templates/index.js](src/templates/index.js): Main template with lazy-loaded Generator
- [src/components/generator.tsx](src/components/generator.tsx): Core functionality - virtualized grid using TanStack Virtual with responsive columns (lg: 5, md: 3, sm: 1), row-based virtualization with 220px estimated row height
- [src/components/layout.js](src/components/layout.js): Base layout wrapper
- [src/components/hero.tsx](src/components/hero.tsx): Hero section
- [src/components/seo.js](src/components/seo.js): SEO/meta tags via react-helmet

**State Management**
- React hooks for local state (useState, useEffect)
- [src/context/LangContext.js](src/context/LangContext.js) for language context
- No global state management library

**GraphQL Usage**
- Site metadata configured in [gatsby-config.js](gatsby-config.js)
- Static queries via `useStaticQuery` in components
- Page queries via `export const query` in page files

## Important Notes

- Mix of .tsx (TypeScript) and .js (JavaScript) files - maintain consistency when editing
- Generator component uses `@tanstack/react-virtual` for virtualization
- Category data deduplicated by `link_href` before rendering
- Virtualized container has fixed height `h-[calc(100vh-200px)]` with overflow scroll
- Row virtualizer uses `overscan: 3` for smooth scrolling experience
