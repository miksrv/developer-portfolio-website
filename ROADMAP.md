# ROADMAP — Developer Portfolio Redesign

Personal portfolio modernization plan. Goal: a single-page landing that is fast, visually striking, and works flawlessly on any device.

---

## Phase 1 — Single-Page Landing Architecture ✅

The site currently has 4 separate pages (`/`, `/projects`, `/experience`, `/skills`). Convert to a single scrollable landing with anchor-based navigation.

### 1.1 Remove multi-page routing
- Delete `pages/experience.tsx`, `pages/skills.tsx`, `pages/projects.tsx`
- Keep `pages/index.tsx` as the only real page; keep `pages/404.tsx`
- All content sections live in `index.tsx`: `#intro`, `#about`, `#projects`, `#experience`, `#skills`, `#contact`

### 1.2 Scroll-based header navigation
- Replace `next/router` active link detection with Intersection Observer
- Header links scroll to section anchors (`href="#projects"`) with `scroll-behavior: smooth`
- Active section highlighted in header as user scrolls
- Header becomes sticky with backdrop blur on scroll (add transparency → solid transition)

### 1.3 Remove PageTransition for inter-page navigation
- `PageTransition` wrapping becomes per-section scroll-reveal instead
- Use Framer Motion `whileInView` / `useInView` for section entrance animations
- Keep `StarField` as fullscreen fixed background

---

## Phase 2 — Mobile-First Responsive Redesign ✅

Current layout is desktop-centric (800px container, no hamburger menu).

### 2.1 Hamburger menu for mobile ✅
- ✅ Add animated burger button in `Header` (visible ≤768px)
- ✅ Slide-down mobile menu with Framer Motion AnimatePresence
- ✅ Close on link click or outside tap
- ✅ Burger → X CSS transform animation via `aria-expanded`

### 2.2 Responsive layout improvements ✅
- ✅ Hero (`Introduce`) — stacked vertically on mobile, center-aligned
- ✅ Project cards — single column ≤480px, 2-col 480–768px, horizontal cards on desktop
- ✅ Experience — duties collapsed with CSS line-clamp (3 lines) + "Show more / Show less" toggle
- ✅ Skills grid — already single column on mobile (no change needed)
- ✅ Container max-width: 800px → 960px; added `$smallMobileMaxWidth: 480px`

### 2.3 Touch & tap improvements ✅
- ✅ Contact links: min-width/min-height 44×44px
- ✅ Active states added (`:active` opacity) on links and buttons
- ✅ Burger button: 44×44px tap target

---

## Phase 3 — Visual & UX Modernization ✅

### 3.1 Hero section redesign ✅
Current hero is functional but minimal. Make it more impactful:
- Larger avatar with subtle ring/glow animation using `--highlight-color`
- Typing animation for the title ("Software Architect & Tech Lead") — use `framer-motion` or CSS
- Animated gradient or particle effect in background (keep `StarField` or augment it)
- Prominent CTA buttons: "View My Work" (scrolls to projects) + "Download CV" (PDF)
- Live counters (`age`, `experience`) styled as stat pills, not plain text

### 3.2 Stats / numbers section ✅
New section between Hero and About — quick impact numbers:
- **19+** years of experience
- **8** companies / roles
- **5** production side-projects
- **X** GitHub contributions (from calendar data)
- Animated count-up on scroll-in (Framer Motion)

### 3.3 Section visual design ✅
- Add section labels (`<span class="section-label">— 03 —</span>`) for visual rhythm
- Alternating section backgrounds: `--body-background` and `--container-background` for visual separation
- Subtle dividers between sections (gradient lines, not hard borders)

### 3.4 Project cards redesign ✅
Current cards are plain image + text. Improve:
- Image hover zoom with overlay showing action buttons (Live / GitHub)
- Card hover: subtle lift (`translateY(-4px)` + enhanced shadow)
- Category/tech tags on each card
- Lazy load images (already unoptimized in Next config, add `loading="lazy"`)

### 3.5 Experience timeline ✅
Replace plain list with a proper vertical timeline:
- Left-side timeline line with dot markers per entry
- Company/role prominent, period in a badge
- Collapsible tech stack tags (show top 5, expand on click)
- "Current" marker for ongoing role

### 3.6 Skills section improvements ✅
- Radar/spider chart as an overview (optional, assess bundle cost)
- Keep progress bars but improve visual: show percentage label on hover
- Group tabs or accordion to switch between skill categories
- SkillsCloud: add hover highlight + link to relevant experience entry

### 3.7 Contact section (new) ✅
Add a dedicated contact section at the bottom before footer:
- Social links (existing `contactLinks`) styled as large icon buttons
- Email address with one-click copy to clipboard
- "Available for opportunities" status indicator (green dot)
- Optional: simple contact form (static → mailto or Formspree)

### 3.8 Footer ✅
Add a minimal footer:
- Copyright line
- "Built with Next.js" credit
- Back-to-top button

---

## Phase 4 — Dark / Light Mode

### 4.1 Theme toggle
- Add toggle button in header (sun/moon icon)
- CSS custom properties already in `theme.css` — add a light theme variant
- Persist preference in `localStorage`
- Respect `prefers-color-scheme` as default
- Smooth CSS transition on theme switch (`transition: background 0.3s, color 0.3s`)

### 4.2 Light theme palette
- Background: `#f5f5f5` / `#ffffff`
- Text: `#1b1b1b`
- Accent: keep `#ffc107` or shift to `#e6a800` for contrast
- StarField: reduce opacity in light mode

---

## Phase 5 — Performance & Technical Quality ✅

### 5.1 Image optimization ✅
- ✅ Convert `photo.jpg` (About component) and `avatar.jpg` to `.webp` (avatar: 207KB → 76KB)
- ✅ Project images already `.webp`
- ✅ Add `sizes` attribute and `priority` to avatar `next/image` in Introduce
- ✅ Jest config updated to mock `.webp` imports

### 5.2 Loading states ✅
- ✅ Shimmer skeleton added for `GithubActivity` dynamic import (`loading:` option in `dynamic()`)
- DataProvider uses a static `import` — no async loading state needed

### 5.3 Accessibility (a11y) ✅
- ✅ Skip-to-content link (`#main-content`) with CSS slide-in on focus
- ✅ `*:focus-visible` outline styles added globally
- ✅ `aria-label` added to all icon-only contact links in Introduce
- ✅ `aria-label` on GithubActivity section and index sections
- ✅ `id="main-content"` on `<main>` element

### 5.4 SEO improvements ✅
- ✅ JSON-LD `Person` schema added to `_document.tsx`
- ✅ `sitemap.xml` updated to single-page (old multi-page routes removed)
- ✅ `robots.txt` already existed and is correct

### 5.5 Analytics ✅
- ✅ Yandex.Metrika loads via `next/script` (already in place)
- ✅ `reportWebVitals` export added to `_app.tsx`

---

## Phase 6 — Content & Copy Improvements ✅

### 6.1 Bio / About section ✅
- ✅ Added `biography.bio` field (`lead` + `bullets`) to `data.json`
- ✅ `About.tsx` now renders bio from data instead of hardcoded text
- ✅ Scannable layout: lead paragraph + bullet highlights with `—` accent markers

### 6.2 Testimonials / References (optional)
- Add a `testimonials` array to `data.json`
- Simple card carousel or static 2–3 quote blocks

### 6.3 Downloadable CV ✅
- ✅ "Download CV" button added to hero CTA group, links to `/cv.pdf`
- Note: place the generated PDF at `public/cv.pdf` (print `PrintResume` via browser to export)

### 6.4 Open-to-work indicator ✅
- ✅ `availableForWork: true/false` flag exists in `data.json`
- ✅ Green animated badge "Open to opportunities" shown near title in hero when true

---

## Phase 7 — GitHub Integration (Deep Dive)

> **Architectural decision:** The site uses `output: 'export'` (fully static). All GitHub data must be
> fetched either **at build time** (via `getStaticProps` in Pages Router) or **client-side** (on page
> load, with a cache layer). No server runtime is available. Recommended strategy — **build-time fetch**
> using a GitHub Personal Access Token stored as a CI/CD secret, so the data is always fresh on deploy
> and there are zero runtime API calls.
>
> **Data sources:**
> - **REST API** — `api.github.com` (60 req/hr unauthenticated, 5000/hr with token)
> - **GraphQL API** — `api.github.com/graphql` (single request for complex queries, requires token)
> - **Contribution proxy** — `github-contributions-api.jogruber.de/v4/{username}` (same source used
>   by `react-github-calendar`, no auth required)

---

### 7.1 Custom Contribution Calendar (replaces `react-github-calendar`) ✅

**Problem with current implementation:**
- `react-github-calendar` renders cells at a fixed pixel size — calendar does not stretch to fill
  container width on desktop, leaving whitespace on the right
- No control over cell shape, gap, or animation
- Bundle includes the full `react-activity-calendar` dependency

**Custom implementation plan:**
- **Data:** fetch from `https://github-contributions-api.jogruber.de/v4/{username}?y=last` at build
  time (returns `{ total, contributions: [{ date, count, level }] }`)
- **Layout:** CSS Grid — 53 columns (weeks) × 7 rows (days); `grid-template-columns: repeat(53, 1fr)`
  makes every cell equal-width and fills 100% of container automatically
- **Cell size:** `aspect-ratio: 1` — cells are always square regardless of container width
- **Colors:** 5-level scale tied to `--highlight-color` CSS variable (levels 0–4)
- **Mobile:** show last 16 weeks instead of full 52-week year (controlled by `weeksToShow` prop)
- **Tooltip:** hover shows `"{count} contributions on {date}"` using a CSS `title` or a Framer Motion
  tooltip component
- **Animation:** Framer Motion stagger — cells fade in column by column on scroll-in (`whileInView`)
- **Month labels:** rendered above each column group, auto-calculated from date data
- **Legend:** 5 sample squares (None → High) below the grid
- **Year selector:** optional tab strip to switch between years (data supports multiple years)
- **Files:** `components/github-calendar/GithubCalendar.tsx`, `types.ts`, `utils.ts`, `styles.module.sass`

---

### 7.2 GitHub Stats Panel

A compact stats bar (or card grid) showing high-level GitHub account numbers. Positioned either inside
the existing `Stats` section or as a standalone row below the calendar.

**Data — single REST call:** `GET /users/{username}` returns:
- `public_repos` — total public repositories
- `followers` — follower count
- `following` — following count

**Data — aggregate from repos list:** `GET /users/{username}/repos?per_page=100`
- Total **stars** earned: `sum(repo.stargazers_count)`
- Total **forks**: `sum(repo.forks_count)`
- Total **open issues**: `sum(repo.open_issues_count)`
- **Most used language** (by repo count): `mode(repo.language)`

**Metrics to display (suggested layout — 4–5 cards):**

| Metric | Source | Icon |
|--------|--------|------|
| Public Repositories | `/users` | repo icon |
| Total Stars Earned | repos aggregate | star icon |
| Total Forks | repos aggregate | fork icon |
| Followers | `/users` | people icon |
| Contributions (this year) | calendar data | commit icon |

- Animated count-up on scroll-in (reuse existing `Stats` component pattern)
- Skeleton loading state while data fetches (if client-side strategy)
- **Files:** extend `public/github-stats.json` (generated at build), update `Stats` component or create
  `components/github-stats/GithubStats.tsx`

---

### 7.3 Language Usage Chart

Visual breakdown of programming languages used across all public repositories.

**Data:** `GET /users/{username}/repos?per_page=100` — each repo has a `language` field (primary
language). For a deeper breakdown per-repo, requires N calls to `GET /repos/{owner}/{repo}/languages`
(returns bytes per language) — feasible at build time with a token but expensive (1 call per repo).

**Recommended approach — primary language per repo** (single API call):
- Count repos per language, sort descending, take top 8
- Show as a horizontal bar chart or segmented progress bar
- Each language has a color (use a standard language→color map, e.g. from `linguist`)

**Alternative — byte-level accuracy** (N+1 calls at build time):
- Aggregate `{ language: totalBytes }` across all repos
- Calculate `%` for each language
- More accurate but requires auth token and more build time

**Display options:**
- **Segmented bar** — single horizontal bar divided into colored segments, language labels below
- **Donut chart** — SVG or Canvas-based, no external chart library needed (custom SVG arc path)
- **Horizontal bar list** — each language as a labeled row with a progress bar (consistent with
  existing `Skills` component style)

- **Files:** `components/github-languages/GithubLanguages.tsx`, `styles.module.sass`

---

### 7.4 Pinned / Top Repositories Showcase

A curated grid of the most notable public repositories — stars, forks, last commit, and tech stack.

**Data:**
- **Option A — REST:** `GET /users/{username}/repos?sort=stars&per_page=6` (top 6 by stars)
- **Option B — GraphQL:** fetch pinned repos via `pinnedItems` query (requires token) — better control,
  shows exactly what's pinned on the GitHub profile

**Card content per repo:**
- Repository name (links to GitHub)
- Description
- Primary language + color badge
- Star count, fork count
- Last commit date (formatted, e.g. "3 days ago")
- Topics/tags (from `GET /repos/{owner}/{repo}/topics`)

**Layout:**
- 3-column grid on desktop, 2-col on tablet, 1-col on mobile
- Card style consistent with existing `Projects` cards
- Hover: subtle lift + border highlight

**Note:** overlaps with existing `Projects` section. Could replace it entirely, or be kept as a
separate "Open Source" section showing repos not in the curated projects list.

- **Files:** `components/github-repos/GithubRepos.tsx`, `types.ts`, `styles.module.sass`

---

### 7.5 Commit Activity Sparkline

A lightweight sparkline chart showing commit frequency over the last 52 weeks — useful for showing
consistent activity without the full calendar.

**Data:** `GET /repos/{owner}/{repo}/stats/commit_activity` returns weekly commit counts for a single
repo. For a cross-repo aggregate, use the contribution calendar data (already fetched in 7.1) — sum
contributions per week.

**Display:**
- SVG polyline — no external chart library
- 52 data points (one per week), last 12–26 weeks on mobile
- Area fill below the line using site accent color with opacity
- Hover: tooltip with week start date and commit count
- Optional: animated draw-on effect using SVG `stroke-dasharray` + Framer Motion

**Placement:** inline in the Stats section or below the calendar as a compact secondary visual.

- **Files:** `components/github-sparkline/GithubSparkline.tsx`, `styles.module.sass`

---

### 7.6 Contribution Streak Counter

Derived from the calendar data already fetched in 7.1 — no additional API call required.

**Metrics:**
- **Current streak** — consecutive days with ≥1 contribution up to today
- **Longest streak** — longest consecutive run in the full dataset
- **Best day** — day of week with highest average contributions
- **Total contributions (this year)** — already in calendar response as `total`

**Display:** compact badge row or extend the `Stats` section with these four cells.
Streak breaks on weekends can optionally be ignored (configurable).

- **Files:** `utils/github-streak.ts` (pure calculation util), extend stats display

---

### 7.7 Build-Time Data Fetcher & Cache Layer ✅

Infrastructure piece that all features above depend on.

**Architecture:**
```
build time:
  getStaticProps (pages/index.tsx)
    └─ fetchGithubData() [utils/github-fetch.ts]
         ├─ fetch contributions  → { weeks[], total }
         ├─ fetch user profile   → { repos, followers, ... }
         ├─ fetch repos list     → [{ name, stars, lang, ... }]
         └─ fetch pinned repos   → [{ name, desc, ... }]  (GraphQL, optional)
         → returns GithubData type → passed as page prop
```

**Files:**
- `utils/github-fetch.ts` — all fetch functions, typed responses
- `types/github.ts` — shared TypeScript types for all GitHub data
- `pages/index.tsx` — add `getStaticProps`, pass `githubData` prop to components that need it

**Token handling:**
- `GITHUB_TOKEN` env var — used at build time only, never shipped to the client
- Without token: falls back to unauthenticated calls (60 req/hr limit, sufficient for one-off builds)
- GitHub Actions secret: add `GITHUB_TOKEN` to repo secrets, pass to build step

**Fallback / error handling:**
- If fetch fails at build time: components receive `null` data and render gracefully (skeleton or hidden)
- Stale data is acceptable (portfolio rebuilds on every push)

**Optional: daily auto-rebuild via GitHub Actions:**
```yaml
# .github/workflows/rebuild.yml
on:
  schedule:
    - cron: '0 6 * * *'   # rebuild daily at 06:00 UTC
```
This ensures contribution data stays fresh without manual deploys.

---

### 7.8 Implementation Order for Phase 7

| Priority | Feature | API calls | Effort | Visual Impact |
|----------|---------|-----------|--------|---------------|
| 1 | **7.7** Build-time fetcher ✅ | foundation | Low | — |
| 2 | **7.1** Custom calendar ✅ | 1 (proxy) | Medium | Very High |
| 3 | **7.6** Streak counter | 0 (derived) | Low | High |
| 4 | **7.2** Stats panel | 2 (user + repos) | Low | High |
| 5 | **7.3** Language chart | 1–N (repos) | Medium | Medium |
| 6 | **7.4** Pinned repos | 1 (GraphQL) | Medium | Medium |
| 7 | **7.5** Sparkline | 0 (derived) | Low | Medium |

---

## Phase 8 — i18n / Localization (future)

- Add `next-i18next` or a lightweight custom solution
- Two locales: `en` (default) and `ru`
- All text strings in `data.json` become locale-keyed objects
- Language switcher in header

---

## Implementation Order (full roadmap)

| Priority | Phase | Effort | Impact |
|----------|-------|--------|--------|
| 1 | Phase 1 — Single-page landing | High | Very High |
| 2 | Phase 2 — Mobile responsive | Medium | Very High |
| 3 | Phase 3.1–3.3 Hero + Stats + Sections | Medium | High |
| 4 | Phase 3.4–3.6 Cards + Timeline + Skills | Medium | High |
| 5 | Phase 3.7–3.8 Contact + Footer | Low | High |
| 6 | Phase 4 — Dark/Light mode | Medium | Medium |
| 7 | Phase 5 — Performance & a11y | Medium | High |
| 8 | Phase 6 — Content | Low | Medium |
| 9 | Phase 7 — GitHub Integration | Medium | High |
| 10 | Phase 8 — i18n | High | Low |

---

## Non-Goals

- No CMS integration (keep data.json as single source of truth)
- No backend/API routes (keep static export)
- No App Router migration (Pages Router works fine for this use case)
- No blog/articles section unless explicitly requested
