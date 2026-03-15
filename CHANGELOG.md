# Changelog

## 1.2.2

### Patch Changes

- Project titles updated and renamed for clarity
- Added AI & Automation skill group and improved skills page intro
- Refactored skills data and removed hardcoded content
- Cleaned up completed tasks from roadmap and priority matrix
- Improved accessibility: added aria-label to StarField canvas
- Enhanced performance: optimized project images, lazy loading, preconnect, and mobile star count
- Added PrintResume component with print-to-PDF support from any page
- Unified button styles for footer links and Print Resume, extracted shared ghost-button class
- Improved print layout and accessibility for resume
- Various UI and style improvements, removed redundant sections

## 1.2.1

### Patch Changes

- Fixed stale closure in `Introduce.tsx` setInterval by adding birthTime/expTime to deps array
- Cancelled requestAnimationFrame loop on cleanup in `StarField.tsx`; removed window.onresize = null
- Replaced runtime fetch with static JSON import in `DataProvider.tsx`
- Renamed `experience.tsx` component from ProjectsPage to ExperiencePage
- Replaced unstable list keys in `Experience.tsx` with index-based keys
- Added WAI-ARIA attributes to progressbar in `Progress.tsx`
- Memoized skill-set derivation and changed motion keys in `SkillsCloud.tsx`
- Reduced setInterval interval in `Introduce.tsx` for fewer re-renders
- Added default case and dev warning for unknown names in `Icon.tsx`
- Fixed active-class test in `Header.test.tsx`
- Updated messaging and copy in data.json, Introduce, and About components
- Revised biography, hero, About section, skills, and project descriptions for senior engineering focus
- Updated SEO titles and meta descriptions for senior/staff positioning
- Refreshed tests and snapshots for new copy
- Removed maximum-scale=1 from viewport meta tag for accessibility (`pages/_app.tsx`)
- Improved sitemap.xml with lastmod dates and homepage priority (`public/sitemap.xml`)
- Added lang="en" to html in `_document.tsx` for accessibility (`pages/_document.tsx`)
- Replaced deprecated Next.js Image props in `Introduce.tsx`
- Added rel="noopener noreferrer" to all target="\_blank" links in Introduce and Projects
- Lightened --text-color-third for WCAG AA/AAA contrast in `styles/theme.css`
- All tests pass; refreshed Projects snapshot for rel attribute addition

## 1.2.0

### Minor Changes

- Migrated all data (projects, experience, skills) to JSON format, removed old TypeScript data files
- Updated UI components to work with new JSON data
- Added and improved animations for main UI components (PageTransition, SkillsCloud, Progress, Experience)
- Refactored project image storage: moved images to the public directory
- Updated and added unit tests, removed outdated snapshots
- Fixed and improved TypeScript types, optimized component imports
- Improved SEO for project, experience, and skills pages
- Regularly updated UI libraries and dependencies
- Enhanced code structure and quality, maintained consistent code style

## 1.1.17

### Patch Changes

- Fixed ESLint config, Improved UI Tests
- Updated Jest setup, added new mocks
- Created new UI Unit tests and Updated old Ui Unit tests
- Refactoring UI Component types and constants
- Refactoring UI Unit tests
- Refactoring code-style, removed default imports
- Added CI/CD timeout
- Fixed and Improved CI/CD deploy action
- Update README.md
- Updated UI Libraries

## 1.1.16

### Patch Changes

- Upgraded yarn version from `4.8.1` to `4.9.2`
- Added description for `experience` page

## 1.1.15

### Patch Changes

- Updated UI libraries
- New config for ESLint and Prettier
- Updated config files
- Fixed ESLint and Prettier issues
- Refactoring code-style

## 1.1.14

### Patch Changes

- Added Timezone for an Introduce section
- Updated UI libraries
- Added sitemap.xml
- Updated .htaccess

## 1.1.13

### Patch Changes

- Added robots.txt
- Implemented script for generating sitemap.xml
- Removed unused webpack section from next.config.js
- Implemented 404 page
- Improved global styles
- Improved ESLint ignore config (`eslint.config.mjs`)

## 1.1.12

### Patch Changes

- Added new one project - `Asteroid Monitoring`
- Updated yarn version from `4.5.0` to `4.8.1`
- Updated all UI libraries
- Improved package.json
- Fixed App meta tags for dark mode
- Improved site manifest

## 1.1.11

### Patch Changes

- Improved CSS styles
- Replaced main photo
- Updated UI libraries
- Added animation for each section on pages
- Improved PageTransition component

## 1.1.10

### Patch Changes

- Migrate from 18 to 19 React
- Updated all UI libraries
- Improved UI SASS files
- Implemented PageTransition component
- Added StarField for all pages
- Improved StarField component
- Updated README.md
- Removed CI/CD Release Action

## 1.1.9

### Patch Changes

- Updated UI libraries
- Fixed theme layout for mobile devices

## 1.1.8

### Patch Changes

- Updated UI libraries
- Fixed SonarCloud issues
- Improved Release GitHub Action

## 1.1.7

### Patch Changes

- Updated UI libraries
- Created function cn (concat class names)
- Improved CSS
- Added favicon
- Fixed code-style

## 1.1.6

### Patch Changes

- Upgraded Next.js version from 14.2.16 to 15.0.2
- Updated UI libraries
- Refactoring Icon UI component
- Added UI tests for Progress and Icon components

## 1.1.5

### Patch Changes

- Updated UI libraries
- Setup UI tests
- Implemented UI tests for components
- Fixed Linter and Prettier issues
- Updated SonarCloud config file
- Added new UI tests
- Fixed experience data

## 1.1.4

### Patch Changes

- Updated UI libraries
- Updated README.md
- Added SonarCloud
- Fixed experience dates
- Improved SkillCloud UI component

## 1.1.3

### Patch Changes

- Updated UI libraries
- Improved experience data
- Improved UI Experience component
- Fixed navigation error (added .htaccess)
- Improved main page, added navigation

## 1.1.2

### Patch Changes

- Added Experience Page and UI Component
- Updated Footer navigation
- Updated Header menu
- Implemented Experience Data

## 1.1.1

### Patch Changes

- Added new Icons - left and right
- Updated UI libraries, added changeset
- Improved CSS styles
- Changed EXLint config
- Modified README.md
- Added navigation links in footer for every pages
- Added CHANGELOG.md
- Added new skills - REST, Storybook
- Added GitHub Release Action
