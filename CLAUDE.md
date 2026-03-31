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

## Stack & Dependencies

- **Next.js 16.1.6** (Pages Router) + **React 19** + **TypeScript 5.9.3**
- **Framer Motion 12** — page transitions, skill bar animations, tag cloud animations
- **next-seo 6** — SEO meta/OpenGraph per page
- **react-github-calendar 5** — GitHub activity calendar (dynamic import, ssr: false)
- **dayjs 1.11** — date formatting utilities
- **Sass** — SASS modules per component + global variables/theme

## Architecture

**Build output**: Static HTML via `output: 'export'` → `/out/`. No server runtime, no API routes.

**Data flow**: All content in `/public/data.json` → fetched client-side in `utils/DataProvider.tsx` → exposed via `DataContext` → consumed with `useSiteData()` hook.

**Pages** (`/pages/`): `index`, `experience`, `skills`, `projects`, `404` — each wraps content in `<PageTransition>`.

**Components** (`/components/`): Feature-based directories. Each folder has: `Component.tsx`, `Component.test.tsx`, `styles.module.sass`, `index.ts` barrel, and optionally `types.ts` / `constants.ts` / `utils.ts`.

**Styling**: SASS modules per component; global theme in `/styles/theme.css` (CSS custom properties); global reset + shared styles in `/styles/globals.sass`; breakpoint variable in `/styles/variables.sass` (mobile: 768px).

## Theme

Dark theme (`--body-background: #1b1b1b`) with golden accent (`--highlight-color: #ffc107`). Container width: `800px`. Font: system-ui stack.

## Component Inventory

| Component | Purpose |
|-----------|---------|
| `Header` | Navigation bar with active link state |
| `Introduce` | Hero section: avatar, name, live age/exp counters, contact links |
| `About` | Bio section with photo and paragraphs |
| `GithubActivity` | GitHub calendar (dynamic import, ssr: false) |
| `Projects` | Project cards with images, links, GitHub links |
| `Experience` | Job history timeline with duties and tech stack |
| `Skills` | Grouped skill progress bars (10 segments, Framer Motion) |
| `SkillsCloud` | Tag cloud from all experience stacks |
| `Progress` | Single skill bar: 10 animated segments, 0–100 level |
| `PageTransition` | Framer Motion wrapper for route transitions |
| `PrintResume` | Hidden printable resume layout (triggered on /experience) |
| `StarField` | Canvas-based 3D starfield background animation |
| `Icon` | SVG icon switch (github, telegram, linkedin, facebook, web, left, right) |

## Special Cases

- `GithubActivity` — dynamic import with `ssr: false` (browser API dependency)
- `StarField` — `useRef` canvas, `requestAnimationFrame` loop, 1000 stars desktop / 400 mobile
- `PageTransition` — accepts `variants` prop; children stagger 0.2–0.5s
- `Introduce` — live counters update every 100ms; age & experience to 9 decimal places
- `PrintResume` — `aria-hidden`, print media query hides canvas/header/main

## data.json Structure

```
biography       — name, title, location, timezone, birthDate
contactLinks[]  — icon, label, link (GitHub, Telegram, Facebook, LinkedIn)
skills[]        — group, skills[{ name, level 0–100 }]
projects[]      — image, title, link, github?, description
experience[]    — period[start, end?], role, duties, skills[{ area, stack[] }]
seo             — { index, skills, experience, projects } × { title, description }
```

## Code Conventions

- **Prettier**: 4-space indent, single quotes, 120 char line width, trailing commas off, one JSX attribute per line
- **Path alias**: `@/` maps to the project root
- **Tests**: RTL + Jest; mocks for Next.js `Image`/`Link` and `react-github-calendar` in `jest.setup.ts`
- Coverage collected from `/components/` only (excludes `.d.ts`, `.test.tsx`, `index.ts`, `types.ts`, `constants.ts`)
- ESLint: `simple-import-sort`, `react`, `react-hooks`, `jest`, `prettier`
