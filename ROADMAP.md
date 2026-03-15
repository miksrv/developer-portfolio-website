# ROADMAP — Full Portfolio Audit & Improvement Plan

Comprehensive assessment from the perspective of a **Senior Full-Stack Engineer,
UX Architect, and Product Strategist**. Covers content, UI/UX, code architecture,
performance, and accessibility. Tasks are grouped by theme and ordered by impact.

---

## Current State Summary

The site is a clean, well-typed Next.js static export with strong visual identity
(dark theme, starfield, amber accent), smooth Framer Motion animations, and a
single-source-of-truth data model (`data.json`). Component structure is solid and
consistently organised.

**Primary gaps:**

- Homepage signals nothing about what has been built (zero project preview)
- No call to action or contact path anywhere on the site
- Hardcoded text in components breaks the single source of truth
- No mobile navigation — 4 nav links can overflow on small screens

---

## Section 2 — Homepage Enhancements

The home page currently has no project signal and no contact path. These additions
have the highest recruiter-effectiveness ROI.

---

### H1 — Selected Work block on the homepage

**Priority:** Highest single improvement.

A principal engineer's homepage must show what they've built. Currently a visitor
sees: name, a facts list, a bio paragraph, and a GitHub calendar — nothing about
what was actually shipped.

**Scope:**

- Add `"featured": true` flag to 2–3 entries in `data.json` projects array.
  Recommended: Observatory, Geometki, Asteroid Monitoring.
- Add an optional `limit` prop to the existing `Projects` component, or create a
  thin `FeaturedProjects` wrapper that filters by `featured` flag.
- Place the block between `<About>` and `<GithubActivity>` in `index.tsx`.
- Add a "View all projects →" link to `/projects` below the cards.

**Data change:** `data.json` projects entries → add `"featured": true`.

---

### H2 — Compact tech-stack strip on the homepage

The stack is invisible from the homepage. Recruiters screening for TypeScript,
React, or Python have to navigate to `/skills` and parse progress bars.

**Scope:**

- Create a `TechStack` component that renders a single inline row of technology
  name tags.
- Add a curated `"stack"` array to the `biography` object in `data.json`
  (8–10 items: `["TypeScript", "React", "Next.js", "Node.js", "PHP", "Python",
"PostgreSQL", "Docker"]`).
- Place below `<Introduce>`, above `<About>`.
- Style: small pill tags, `container-background`, hover → `highlight-color`. No
  levels or icons. Purely a fast-scan signal.

---

### H3 — Contact / CTA section at the bottom of the homepage

There is no call to action anywhere on the site. Social icons exist but are small
and easy to miss. Every effective engineering portfolio has a clear contact path.

**Scope:**

- Create a `ContactCta` component with:
    - One line of text (e.g., "Open to senior engineering roles and consulting."),
      sourced from a new `"availability"` field in `data.json` biography.
    - Two link buttons: primary → LinkedIn, secondary → email (pulled from
      `contactLinks` in `data.json` by icon type).
- Place after `<GithubActivity>`, before the footer nav links.
- Keep minimal: one `<section>`, two `<a>` tags, no form.

**Data change:** Add `"availability"` and `"email"` to `data.json` biography.

---

### H4 — Current role / availability badge in the hero

Recruiters need to know current status in the first 3 seconds. The facts list
shows location and timezone but not current employer or open-to-work status.

**Scope:**

- Add `"availability"` string to `data.json` biography object.
- Add a new fact row to `factsList` in `Introduce.tsx`: label "Status", value from
  `data.biography.availability`.
- Optionally render a small coloured dot (green = open) before the value.

---

## Section 3 — Content & Data Improvements

---

### D1 — Move hardcoded text from components into `data.json`

**Files:** `components/introduce/Introduce.tsx:125–139`, `components/about/About.tsx:27–36`,
`pages/skills.tsx:34–37`

Three components contain hardcoded prose strings that should come from `data.json`
to maintain a single source of truth. Currently, updating copy requires editing
component source files rather than data.

**Scope:**

- Add `"description"` (array of paragraphs) to `data.json` biography for the hero.
- Add `"about"` (array of paragraphs) to `data.json` biography for the about section.
- Add `"skillsIntro"` string to `data.json` seo.skills for the skills page intro.
- Update components to render from context data instead of hardcoded strings.

---


## Section 4 — UI / UX Enhancements

---

### U1 — Collapsible/expandable duties in Experience

**File:** `components/experience/Experience.tsx`

The duties field for each role is a dense paragraph of 3–8 sentences. On the
experience page this creates walls of similar-looking text, making it hard to
scan. Top engineering portfolios use expand/collapse for details.

**Scope:**

- Show only the first 2 sentences (or first 140 characters) of duties by default.
- Add a "Show more / Show less" toggle per entry.
- Use a `useState<boolean>(false)` per list item, or a shared `expandedIndex` state.
- No external dependency needed — use max-height CSS transition or Framer Motion.

---

### U2 — Mobile navigation drawer (hamburger menu)

**File:** `components/header/Header.tsx`

The header renders 4 navigation links in a row. On screens narrower than ~360px,
these can overflow. More importantly, on mobile the touch targets are small.
A standard hamburger drawer resolves both issues.

**Scope:**

- Render a hamburger button on screens ≤ 768px (`$mobileMaxWidth`).
- Show/hide a full-screen or slide-in nav overlay on toggle.
- Use `useState<boolean>` for open/close; close on link click or outside tap.
- Keep the desktop header unchanged.

---

### U3 — Project category filtering on the `/projects` page

**File:** `components/projects/Projects.tsx`, `public/data.json`

Currently all projects are listed statically with no way to filter. Adding a
category filter (Frontend, Full-Stack, Hardware, Astronomy) lets visitors quickly
find relevant work and signals product thinking.

**Scope:**

- Add an optional `"tags": string[]` field to each project in `data.json`.
- Create a `ProjectFilter` component: a row of tag buttons.
- `Projects` receives an active filter prop and renders matching items only.
- Animate filter transitions with Framer Motion `AnimatePresence`.

---

### U4 — Print / PDF-friendly resume stylesheet

**File:** `styles/globals.sass` or new `styles/print.sass`

Many recruiters want a one-page resume. A CSS `@media print` block can hide the
starfield, header nav, and footer links while formatting the experience section
as a clean resume printout.

**Scope:**

- Add `@media print` styles: hide `<header>`, `<canvas>`, `.footerLinks`,
  `.activitySection`, `About`, and `SkillsCloud`.
- Print experience and skills in a two-column layout with standard black-on-white.
- Add a "Print Resume" `<button>` on the `/experience` page that calls
  `window.print()`.
- No new dependencies.

---

### U5 — Add a loading skeleton for `GithubActivity`

**File:** `pages/index.tsx`, `components/github-activity/GithubActivity.tsx`

The GitHub calendar is loaded client-side with `dynamic(..., { ssr: false })`. There
is no loading state — the section appears blank then pops in. A skeleton prevents
layout shift and looks polished.

**Scope:**

- Pass a `loading` JSX element as the `fallback` option in the `dynamic()` call.
- The skeleton can be a `<div>` with `container-background`, matching the
  approximate calendar dimensions, with a subtle pulse animation.
- No external dependency — CSS `@keyframes` pulse is sufficient.

---

### U6 — Add a skip-to-content link for keyboard navigation

**File:** `pages/_app.tsx` or `pages/_document.tsx`

Keyboard-only users need a way to skip the navigation and jump directly to main
content. This is a standard WCAG 2.4.1 pattern and is present on every accessibility-
compliant site.

**Scope:** Add a visually hidden `<a href="#main-content">Skip to content</a>` as
the first element in `_app.tsx`. Set `id="main-content"` on the `<main>` element.
Reveal the link on `:focus` with absolute positioning and highlight color.

---

### U7 — Visible `:focus-visible` styles on all interactive elements

**File:** `styles/globals.sass`

The site has hover styles but no `:focus-visible` styles. Keyboard navigation is
essentially invisible. All links, buttons, and interactive tags should show a clear
focus ring (amber outline matching the `--highlight-color`).

**Scope:** Add to `globals.sass`:

```sass
:focus-visible
    outline: 2px solid var(--highlight-color)
    outline-offset: 2px
    border-radius: var(--border-radius)
```

---

### U8 — `aria-label` on the StarField canvas

**File:** `components/star-field/StarField.tsx:112`

The canvas has `role="img"` but no `aria-label`. Screen readers will announce it
as an unnamed image.

**Fix:** Add `aria-label={'Animated starfield background'}` to the `<canvas>` element.

---

## Section 5 — Code & Architecture Improvements

---

### A1 — Extract TypeScript interfaces into a shared `types/` directory

**Current situation:** Each component has its own `types.ts`. The site-wide data
shape is inferred from `data.json` via `typeof data`, which makes the type system
brittle — any change to the JSON file silently changes all downstream types.

**Scope:**

- Create `/types/data.ts` with explicit interfaces: `BiographyType`,
  `ProjectType`, `ExperienceType`, `SkillGroupType`, `SeoType`, `SiteDataType`.
- `DataProvider.tsx` imports from `/types/data.ts` instead of using `typeof data`.
- Component-level `types.ts` files import from `/types/data.ts` to avoid duplication.
- Benefits: explicit type contracts, no silent drift, better IDE autocomplete.

---

### A2 — Centralise OpenGraph configuration

**Files:** `pages/index.tsx:20–31`, `pages/projects.tsx:17–28`, `pages/experience.tsx:17–28`,
`pages/skills.tsx:17–28`

The same `openGraph` object (with hardcoded image URL, locale, siteName) is
copy-pasted into every page. If the image URL or siteName changes, all 4 files
need updating.

**Scope:** Create a `config/seo.ts` constants file:

```ts
export const defaultOpenGraph = {
    images: [{ height: 1333, url: 'https://miksoft.pro/avatar.jpg', width: 1000 }],
    locale: 'en-US',
    siteName: 'miksoft.pro'
}
```

Each page spreads `defaultOpenGraph` and overrides only what differs.

---

### A3 — Add an `ErrorBoundary` component

No error boundaries exist. A rendering error in `GithubActivity` (which calls an
external API) or any component would crash the entire page.

**Scope:**

- Create `components/error-boundary/ErrorBoundary.tsx` — a standard class component
  implementing `componentDidCatch` and `getDerivedStateFromError`.
- Wrap `<GithubActivity>` and `<Projects>` with `<ErrorBoundary>`.
- Display a minimal fallback (`<p>Failed to load section</p>`) on error.

---

### A4 — Add Suspense fallback to the dynamic `GithubActivity` import

**File:** `pages/index.tsx:10`

`dynamic()` accepts a `loading` option that renders while the component is
being fetched. Currently it's undefined — the section is simply absent until loaded.

**Scope:**

```ts
const GithubActivity = dynamic(
    () => import('@/components/github-activity/GithubActivity'),
    { ssr: false, loading: () => <GithubActivitySkeleton /> }
)
```

---

### A5 — Replace `ExperienceType.period: string[]` with a discriminated tuple

**File:** `components/experience/types.ts`

`period: string[]` allows any number of strings. The actual shape is always 1 or 2
items. Using a tuple eliminates the need for optional chaining throughout
`Experience.tsx`.

```ts
period: [string] | [string, string]
```

---

### A6 — Refactor `Icon` switch to a lookup map

**File:** `components/icon/Icon.tsx`

A `switch` statement with 7 cases is readable but not scalable. When icons are
added (and they will be as the site grows), a map is easier to extend and test.

```ts
const ICONS: Record<IconTypes, JSX.Element> = {
    web: <svg>...</svg>,
    github: <svg>...</svg>,
    // ...
}

export const Icon: React.FC<IconProps> = ({ name }) =>
    ICONS[name] ?? (process.env.NODE_ENV === 'development'
        ? console.warn(`Icon: unknown "${name}"`) ?? null
        : null)
```

---

### A7 — Memoize `tick` in `Introduce.tsx` with `useCallback`

**File:** `components/introduce/Introduce.tsx:41`

`tick` is recreated on every render. While the `useEffect` dependency array now
correctly lists `[birthTime, expTime]`, wrapping `tick` in `useCallback` with
the same deps makes the data flow explicit and prevents unnecessary recreations.

```ts
const tick = useCallback(() => {
    setMyAge(((Date.now() - birthTime) / divisor).toFixed(9))
    setMyExp(((Date.now() - expTime) / divisor).toFixed(9))
}, [birthTime, expTime])
```

---

### A8 — Add `_document.tsx` with `lang` attribute and canonical link support

**File:** `pages/_document.tsx` (create)

Next.js Pages Router uses `_document.tsx` for customising the `<html>` and
`<body>` tags rendered server-side. Currently neither exists, so the `<html>`
element has no `lang` attribute (WCAG 3.1.1 violation, covered in C3).

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
```

---

## Section 6 — Performance Optimizations

---

### P1 — Pre-optimise project images

**File:** `next.config.js`, `/public/projects/`

`images: { unoptimized: true }` is set for the static export. This means all
project images are served at full resolution. The project card images are displayed
at 176×176px but the source files may be significantly larger.

**Scope:**

- Pre-process all images in `/public/projects/` to 352×352px (2× for retina).
- Convert to WebP format for ~30% size reduction.
- This is a build-time task, not a code change.

---

### P2 — Add resource hint for GitHub API

**File:** `pages/_document.tsx` or `pages/_app.tsx`

The `react-github-calendar` component calls `api.github.com` on mount. A
`<link rel="preconnect">` tag reduces the DNS + TLS handshake time.

```html
<link
    rel="preconnect"
    href="https://api.github.com"
/>
```

---

### P3 — Lazy-load project images

**File:** `components/projects/Projects.tsx`

Project images currently load eagerly. Cards below the fold should use
`loading="lazy"` (which Next.js Image supports natively). This reduces initial
page weight for the projects page.

**Fix:** Add `loading={'lazy'}` prop to the `<Image>` in Projects.tsx (or confirm
Next.js Image applies it automatically for off-screen images — it does for images
with `width`/`height`, but not for `fill` layout).

---

### P4 — Reduce StarField star count on mobile

**File:** `pages/_app.tsx:65`

The starfield renders 1000 stars unconditionally. On mobile devices this runs on
the main thread and can cause frame drops during scroll. Reducing to 300–400 stars
on mobile maintains the visual effect with significantly less GPU/CPU load.

**Scope:**

- Read `window.innerWidth` in a `useEffect` or use a CSS media query via a custom
  hook to conditionally pass a lower `starCount` prop.
- Alternatively, reduce the default from 1000 to 600 globally (the difference is
  visually imperceptible at 800px container width).

---

## Section 7 — New Components & Features

---

### N1 — `TechStack` component

**Purpose:** Instant technology signal above the fold on the homepage.

**Placement:** Between `<Introduce>` and `<About>` on `pages/index.tsx`.

**Implementation:**

- New `components/tech-stack/TechStack.tsx`.
- Reads a `stack: string[]` array from `data.biography` (add to `data.json`).
- Renders a `<ul>` of `<li>` pill tags identical in style to the SkillsCloud tags.
- No animations needed — it's above the fold and should render immediately.

---

### N2 — `FeaturedProjects` component

**Purpose:** Show the 2–3 most impressive projects directly on the homepage.

**Placement:** Between `<About>` and `<GithubActivity>` on `pages/index.tsx`.

**Implementation:**

- Add `"featured": true` to chosen projects in `data.json`.
- Add a `limit?: number` prop to the existing `Projects` component that slices
  the rendered list. Filter for `featured` items first.
- Add a "View all projects →" `<Link>` below the cards.
- Reuse all existing card styles — no new SASS needed.

---

### N3 — `ContactCta` component

**Purpose:** Convert page visitors into actual contacts. Currently the site has no
call to action.

**Placement:** Bottom of `pages/index.tsx`, after `<GithubActivity>`.

**Implementation:**

- New `components/contact-cta/ContactCta.tsx`.
- Reads `biography.availability` and `contactLinks` from `useSiteData()`.
- Renders:
    - H2 or short `<p>` from `availability` field.
    - Two `<a>` buttons: primary (LinkedIn, from `contactLinks`), secondary (email).
- Style: centred section, `container-background`, minimal padding.

---

### N4 — `PrintResume` button on the Experience page

**Purpose:** Recruiters frequently request a resume. A print-to-PDF button on
the experience page lets them generate one from the live data.

**Placement:** Top-right of `pages/experience.tsx`, or near the page title.

**Implementation:**

- A simple `<button onClick={() => window.print()}>Download Resume</button>`.
- Add `@media print` styles in `globals.sass` to:
    - Hide header, canvas, footer nav links, About, GitHub calendar.
    - Render experience and skills in resume format (white background, black text).
    - Remove animations from progress bars.
- No external library needed.

---

### N5 — `ErrorBoundary` component _(see A3 above)_

**Purpose:** Prevent external API failures (GitHub calendar) from crashing the page.

---

### N6 — Mobile navigation drawer _(see U2 above)_

---

### N7 — AI "Ask Me" widget (optional / stretch goal)

**Purpose:** Differentiate the portfolio with an interactive AI feature that
demonstrates both product thinking and AI engineering capability.

**Concept:** A floating "Ask me anything" button (bottom-right corner) that opens
a chat interface. The assistant has been given a system prompt containing the
resume data and answers questions like "What stack do you use?", "Are you available
for a role in X?", "Tell me about the Observatory project."

**Implementation hints:**

- Use the Anthropic Claude API (`claude-haiku-4-5` model for cost efficiency).
- System prompt built dynamically from `data.json` at build time.
- Client-side only (Next.js API route or direct fetch to Claude API with a
  server-side proxy to protect the key).
- UI: a `<dialog>` or slide-up drawer with a simple message list.
- Requires adding `ANTHROPIC_API_KEY` to environment variables.
- This is a stretch goal but would make the portfolio immediately memorable to
  any AI company recruiter.

---

## Priority Matrix

| ID  | Task                             | Impact                 | Effort  | Priority      |
| --- | -------------------------------- | ---------------------- | ------- | ------------- |
| C1  | Remove `maximum-scale=1`         | High (a11y)            | Trivial | P0            |
| C2  | Add sitemap.xml + robots.txt     | High (SEO)             | Low     | P0            |
| C3  | Add `_document.tsx` with lang    | High (a11y)            | Low     | P0            |
| C4  | Fix deprecated Image API         | Medium                 | Low     | P0            |
| C5  | Add `rel="noopener noreferrer"`  | Medium (security)      | Trivial | P0            |
| C6  | Fix color contrast failures      | High (a11y)            | Low     | P0            |
| H1  | Featured projects on homepage    | Very High              | Medium  | P1            |
| H2  | Tech-stack strip on homepage     | High                   | Low     | P1            |
| H3  | Contact CTA section              | High                   | Low     | P1            |
| H4  | Current role badge in hero       | Medium                 | Low     | P1            |
| D1  | Move hardcoded text to data.json | High (maintainability) | Medium  | P1            |
| U1  | Collapsible experience duties    | High (UX)              | Medium  | P2            |
| U2  | Mobile nav drawer                | Medium                 | Medium  | P2            |
| U3  | Project category filtering       | Medium                 | Medium  | P2            |
| U4  | Print/PDF resume stylesheet      | High (recruiter)       | Medium  | P2            |
| U5  | GitHub activity skeleton         | Low                    | Low     | P2            |
| U6  | Skip-to-content link             | Medium (a11y)          | Trivial | P2            |
| U7  | `:focus-visible` styles          | Medium (a11y)          | Low     | P2            |
| U8  | StarField aria-label             | Low                    | Trivial | P2            |
| A1  | Shared TypeScript interfaces     | Medium                 | Medium  | P2            |
| A2  | Centralise OpenGraph config      | Low                    | Low     | P2            |
| A3  | ErrorBoundary component          | Medium                 | Low     | P2            |
| A4  | Suspense for dynamic imports     | Low                    | Low     | P2            |
| A5  | ExperienceType period tuple      | Low                    | Trivial | P3            |
| A6  | Icon map refactor                | Low                    | Low     | P3            |
| A7  | Memoize tick with useCallback    | Low                    | Trivial | P3            |
| A8  | `_document.tsx` (see C3)         | —                      | —       | Covered by C3 |
| P1  | Pre-optimise project images      | Medium                 | Low     | P2            |
| P2  | Resource hint for GitHub API     | Low                    | Trivial | P3            |
| P3  | Lazy-load project images         | Low                    | Trivial | P3            |
| P4  | Reduce StarField on mobile       | Low                    | Low     | P3            |
| N7  | AI "Ask Me" widget               | Very High (diff.)      | High    | P3            |
