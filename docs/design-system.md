# Design System

This portfolio uses a dark-only design system inspired by Apple, OpenAI,
GitHub, Linear, and Vercel. The interface should feel premium, minimal,
technical, calm, and confident.

## Source Of Truth

Runtime tokens live in `app/globals.css`. Reusable visual patterns live in
`components/ui/`.

## Theme

- Background: `#09090B`
- Surface: `#18181B`
- Primary: `#2563EB`
- Accent: `#38BDF8`
- Text: `#F8FAFC`
- Muted: `#94A3B8`
- Border: `rgba(255, 255, 255, 0.08)`

## Typography

- Headings: Space Grotesk
- Body: Inter
- Letter spacing should stay neutral unless used for small uppercase labels.

## Components

- Cards use 20-24px radii, thin borders, and soft shadows.
- Buttons use clear primary and secondary states.
- Hover motion stays subtle and purposeful.
- Interactive motion uses Framer Motion and respects reduced motion.

## Architecture

- Server Components by default.
- Client Components only for interaction.
- Portfolio content belongs in typed files under `content/`.
- Shared UI belongs in `components/ui/`.
- Shared utilities and services belong in `lib/`.
- GitHub API access stays isolated in `lib/github.ts`.

## Future Features

Prepare future features through boundaries, not placeholders:

- Blog routes can live under `app/blog/` with content isolated from UI.
- LeetCode, contribution graph, analytics, AI assistant, and CMS integrations
  should each get a dedicated service module under `lib/` when implemented.
- Do not add inactive UI for future features.
