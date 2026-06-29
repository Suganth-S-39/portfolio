# Suganth S Portfolio

Production-focused personal portfolio for Suganth S, built with Next.js 15,
TypeScript, Tailwind CSS, Framer Motion, Lucide React, and the GitHub REST API.

## Architecture

- `app/` contains App Router routes, metadata, sitemap, robots, and global CSS.
- `components/layout/` contains page chrome such as the header and footer.
- `components/sections/` contains homepage sections composed from smaller UI.
- `components/ui/` contains reusable primitives with consistent styling.
- `content/` stores typed portfolio data separate from presentation.
- `lib/` stores reusable utilities and GitHub REST API access.

Design system rules are documented in `docs/design-system.md`; runtime tokens
live in `app/globals.css`.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, sitemap, robots,
and social metadata point at the deployed domain.
