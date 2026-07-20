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

**Package manager**: Yarn 4.9.2 (use `yarn`, not `npm`). Node version pinned in `.nvmrc` (20.11.0).

## Stack & Dependencies

- **Next.js 16** (Pages Router) + **React 19** + **TypeScript 5.9**
- **Framer Motion 12** — page transitions, skill bar animations, tag cloud animations
- **next-seo 6** — SEO meta/OpenGraph per section
- **dayjs 1.11** — date formatting utilities
- **Sass** — SASS modules per component + global variables/theme

## Architecture

**Build output**: Static HTML via `output: 'export'` in `next.config.js` → `/out/`. No server runtime, no API routes. `images.unoptimized: true` since there's no image optimization server.

**Single-page landing**: As of v2.0.0, `pages/index.tsx` renders the entire site as one scrollable page with anchor sections (`#intro`, `#activity`, `#projects`, `#experience`, `#skills`, `#contact`), each with an `id` used for in-page navigation from `Header`. There are no separate routes for skills/experience/projects — only `index.tsx`, `404.tsx`, `_app.tsx`, `_document.tsx` exist under `/pages/`.

**Two independent data sources, two providers**:

- `DataProvider` (`utils/DataProvider.tsx`) — wraps the whole app in `_app.tsx`; reads `/public/data.json` at build time and exposes it via `useSiteData()`. This is the static personal/portfolio content (bio, skills, projects, experience, SEO copy).
- `GithubDataProvider` (`utils/GithubDataProvider.tsx`) — wraps only the page content in `pages/index.tsx`; fetches live GitHub data client-side on mount (contributions, user stats, language distribution, top repos) via `utils/github-fetch.ts`, exposed via `useGithubData()`. Fetches hit the GitHub REST API directly plus a public contributions-proxy (`github-contributions-api.jogruber.de`); an optional `GITHUB_TOKEN` env var raises the GitHub API rate limit, `GITHUB_USERNAME` overrides the default user (`miksrv`).

**Theming**: `ThemeProvider` (`utils/ThemeProvider.tsx`) wraps `DataProvider` in `_app.tsx` and manages a dark/light toggle, persisted via `data-theme` attribute on `<html>` and `localStorage`. Both palettes are defined as CSS custom properties in `/styles/theme.css` (`:root` = dark defaults, `[data-theme='light']` = overrides).

**Provider nesting order in `_app.tsx`**: `StarField` (background canvas, outside providers) → `ThemeProvider` → `DataProvider` → `Header` / page content / `PrintResume` / `Footer`. `GithubDataProvider` is nested one level deeper, inside `pages/index.tsx` itself, not in `_app.tsx`.

**Components** (`/components/`): Feature-based directories, barrel-exported from `components/index.ts`. Each folder has: `Component.tsx`, `Component.test.tsx`, `styles.module.sass`, `index.ts`, and optionally `types.ts` / `constants.ts` / `utils.ts` (+ `utils.test.ts`) / `__snapshots__/`.

**Styling**: SASS modules per component; global theme in `/styles/theme.css` (CSS custom properties, dark + light); global reset + shared styles in `/styles/globals.sass`; breakpoint variable in `/styles/variables.sass` (mobile: 768px).

## Theme

Dark theme by default (`--body-background: #1b1b1b`) with a golden accent (`--highlight-color: #ffc107`); light theme overrides live in `[data-theme='light']`. Container width: `960px`. Font: system-ui stack.

## Component Inventory

| Component         | Purpose                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `Header`          | Navigation bar with active-section anchor state + theme toggle                                       |
| `Footer`          | Site footer                                                                                          |
| `Introduce`       | Hero section: avatar, name, live age/exp counters, contact links                                     |
| `Stats`           | Summary stat tiles under the hero                                                                    |
| `About`           | Bio section with photo and paragraphs                                                                |
| `GithubCalendar`  | GitHub contribution calendar (dynamic import, ssr: false)                                            |
| `GithubStats`     | Stat cards from live GitHub user/repo data                                                           |
| `GithubLanguages` | Language distribution breakdown from GitHub repos                                                    |
| `GithubSparkline` | Contribution sparkline chart                                                                         |
| `GithubRepos`     | Top-repos card list                                                                                  |
| `Projects`        | Project cards with images, links, GitHub links                                                       |
| `Experience`      | Job history timeline with duties and tech stack                                                      |
| `Skills`          | Grouped skill progress bars (10 segments, Framer Motion)                                             |
| `SkillsCloud`     | Tag cloud from all experience stacks                                                                 |
| `Progress`        | Single skill bar: 10 animated segments, 0–100 level                                                  |
| `Contact`         | Contact section                                                                                      |
| `PageTransition`  | Framer Motion wrapper for entrance transitions (used within sections, e.g. `Experience`, `Projects`) |
| `PrintResume`     | Hidden printable resume layout (rendered on every non-404 page)                                      |
| `StarField`       | Canvas-based 3D starfield background animation, rendered outside all providers in `_app.tsx`         |
| `Icon`            | SVG icon switch (github, telegram, linkedin, facebook, web, left, right)                             |

## Special Cases

- `GithubCalendar` — dynamic import with `ssr: false` (browser API dependency); shown with a skeleton loading state
- `GithubDataProvider` — fetches live GitHub data client-side; failures are swallowed (`.catch(() => {})`) so `useGithubData()` consumers must handle `null`
- `StarField` — `useRef` canvas, `requestAnimationFrame` loop, 1000 stars desktop / 400 mobile (breakpoint check on mount only, not on resize)
- `PageTransition` — accepts a `variants` prop; children stagger 0.2–0.5s
- `Introduce` — live counters update every 100ms; age & experience to 9 decimal places
- `PrintResume` — `aria-hidden`, print media query hides canvas/header/main
- `_app.tsx` — loads Yandex.Metrika analytics only when `NODE_ENV === 'production'`

## data.json Structure

```
biography       — name, title, location, timezone, birthDate, availableForWork, bio
contactLinks[]  — icon, label, link (GitHub, Telegram, Facebook, LinkedIn)
skills[]        — group, skills[{ name, level 0–100 }]
projects[]      — image, title, link, github?, description
experience[]    — period[start, end?], role, duties, skills[{ area, stack[] }]
seo             — { index, activity, skills, experience, projects } × { title, description }
```

## Code Conventions

- **Prettier**: 4-space indent, single quotes, 120 char line width, trailing commas off, one JSX attribute per line
- **Path alias**: `@/` maps to the project root
- **Tests**: RTL + Jest; mocks for Next.js `Image`/`Link` in `tests/jest.setup.tsx`
- Coverage collected from `/components/` only (excludes `.d.ts`, `.test.tsx`, `index.ts`, `types.ts`, `constants.ts`)
- ESLint: `simple-import-sort`, `react`, `react-hooks`, `jest`, `prettier`
- CI (`.github/workflows/checks.yml`) runs ESLint check, Prettier check, then a cached production build on every PR/push to `main`
