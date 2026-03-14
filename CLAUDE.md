# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Start development server
yarn build            # Build for production (static export to /out)
yarn test             # Run tests
yarn test:coverage    # Run tests with coverage
yarn eslint:check     # Check linting
yarn eslint:fix       # Auto-fix lint issues
yarn prettier:check   # Check formatting
yarn prettier:fix     # Auto-fix formatting
```

Run a single test file: `yarn test components/header/Header.test.tsx`

**Package manager**: Yarn 4.9.2 (use `yarn`, not `npm`)

## Architecture

**Stack**: Next.js (Pages Router) + React 19 + TypeScript, compiled to static HTML (`output: 'export'`).

**Data flow**: All site content lives in `/public/data.json`. `utils/DataProvider.tsx` fetches it client-side on mount and exposes it via `DataContext`. Components consume it with the `useSiteData()` hook — no backend, no API routes.

**Pages** (`/pages/`): `index`, `experience`, `skills`, `projects`, `404` — each wraps content in `<PageTransition>` for Framer Motion animations.

**Components** (`/components/`): Feature-based directories. Each component folder contains the `.tsx`, `.test.tsx`, `styles.module.sass`, `index.ts` barrel, and optionally `types.ts` / `constants.ts` / `utils.ts`.

**Styling**: SASS modules per component for scoped styles; global theme variables in `/styles/`.

**Special cases**:
- `GithubActivity` is dynamically imported with `ssr: false` (uses `react-github-calendar`)
- `StarField` uses a canvas-based animation with `useRef`
- `PageTransition` accepts animation `variants` as props (Framer Motion)

## Code Conventions

- **Prettier**: 4-space indent, single quotes, 120 char line width, trailing commas off, one JSX attribute per line
- **Path alias**: `@/` maps to the project root
- **Tests**: RTL + Jest; mocks for Next.js `Image`/`Link` and `react-github-calendar` are in `jest.setup.ts`
- Coverage is collected from `/components/` only
