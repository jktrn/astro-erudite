# Epic: Project Astronomeer

## 1. Executive Summary

Transform the existing **"Astro Erudite"** base into **"Astronomeer"**: a non-minimal, blazingly fast, lightweight, and gorgeous Astro theme designed for magazine-like blogs. This epic covers the complete rebranding, UI overhaul, and implementation of high-engagement features outlined in the technical guide.

## 2. Strategic Goals

* **Rebrand:** Complete removal of "Erudite" references; establish "Astronomeer" identity.
* **Pivot:** Shift from "simple unstyled template" to "premium magazine theme".
* **Engage:** Implement rich layouts (Hero Grid, Category Islands) and interaction points (Newsletter, Trending Sidebar).
* **Aesthetics:** Prioritize visual excellence with glassmorphism, fluid animations, and premium typography.

## 3. Features & Product Stories

### Feature 1: Brand Transition & Core Renaming

**Context:** The codebase currently carries the legacy name "Astro Erudite". This must be purged to avoid confusion and establish the new "Astronomeer" identity.

* **User Story:** As a developer, I want the codebase and documentation to consistently reflect the name "Astronomeer" so that the product identity is cohesive.
* **Tasks:**
  1. [ ] **Global Search & Replace:** Identify and replace occurrences of "Erudite" with "Astronomeer" in `package.json`, `astro.config.ts`, `GUIDE.md`, `README.md`, and metadata files.
  2. [ ] **Metadata Update:** Update `site.webmanifest`, `robots.txt`, and `consts.ts` with new site titles ("Astronomeer") and descriptions matching the "Magazine" vision.
  3. [ ] **Clean Guide:** Rewrite introductory sections of `GUIDE.md` to reflect the new premium nature of the theme and remove references to it being "unstyled".

### Feature 2: High-Impact Hero Grid

**Context:** The current list view is too simple. A magazine needs a "Above the Fold" experience that captures attention immediately.

* **User Story:** As a reader landing on the home page, I want to immediately see the most important story and other top headlines so I am enticed to read.
* **Tasks:**
  1. [ ] **Component Development:** Create `HeroGrid.astro` component displaying one main featured article (large) and two side articles (stacked).
  2. [ ] **Visual Polish:** Implement hover effects (zoom), gradients on the main image, and prominent category tags using Tailwind v4.
  3. [ ] **Integration:** Replace the standard blog list on `index.astro` with the `HeroGrid`.

### Feature 3: Category "Islands"

**Context:** Users need to scan content by interest areas rather than just a chronological feed.

* **User Story:** As a reader, I want to see articles grouped by specific topics (e.g., "Engineering", "Lifestyle") on the homepage so I can quickly dive into my interests.
* **Tasks:**
  1. [ ] **Data Utility:** Create `getPostsByTag` utility in `lib/data-utils.ts` to efficiently filter and sort posts.
  2. [ ] **Component Development:** Create `CategorySection.astro` that accepts a `tag` and `title`. It should render a header and a 4-column responsive grid of posts.
  3. [ ] **Home Page Composition:** Stack multiple `CategorySection` components on the homepage below the Hero Grid.

### Feature 4: Engaging Sidebar & Layout

**Context:** A single column layout is insufficient for a magazine density. We need a sticky sidebar for secondary engagement.

* **User Story:** As a site owner, I want a persistent sidebar that showcases trending content and capture forms, increasing user time-on-site and subscriber counts.
* **Tasks:**
  1. [ ] **Layout Refactor:** Update `Layout.astro` to support a 12-column grid system (8 cols content, 4 cols sidebar) on desktop.
  2. [ ] **Sticky Mechanism:** Ensure the sidebar container is `sticky` so it remains visible while scrolling long articles.
  3. [ ] **Slot Implementation:** Add named slots (`slot="sidebar"`) to the layout to allow pages to inject specific sidebar content.

### Feature 5: Newsletter & Trending Components

**Context:** Specific high-value components needed to populate the sidebar.

* **User Story:** As a site owner, I want attractive "Trending" and "Newsletter" widgets to drive core business metrics.
* **Tasks:**
  1. [ ] **Newsletter Component:** Build a `Newsletter.tsx` (React/Shadcn) component with input field and subscribe button. Style it to stand out (e.g., primary color elements).
  2. [ ] **Trending List:** Create a lightweight helper to fetch "Top" posts (logic can be manual or based on a 'trending' frontmatter boolean) and render them in a compact sidebar list.
  3. [ ] **Sidebar Integration:** Inject these components into the new sidebar slot on the Blog Post Layout.

### Feature 6: Interactive Reading Progress

**Context:** For a magazine theme, the reading experience is paramount. A subtle progress bar at the top of the sticky header that fills as you scroll makes long-form reading feel managed and professional.

* **User Story:** As a reader engaged in a long-form article, I want to see a visual indicator of my reading progress so that I can gauge how much content remains without losing my place.
* **Tasks:**
  1. [ ] **Component Development:** Create `ReadingProgress.tsx` using React. Use a lightweight approach (vanilla JS or `framer-motion`'s `useScroll`) to track scroll percentage relative to the article body.
  2. [ ] **Visual Design:** Style the progress bar as a slim (2-3px) line with the `bg-primary` color, integrated seamlessly into the sticky header.
  3. [ ] **Header Integration:** Integrate the logic into `Header.astro` or `Layout.astro`. Ensure it conditionally renders or attempts to calculate progress only on appropriate pages (e.g., Blog Posts).
  4. [ ] **Performance:** Ensure the scroll listener is optimized (positive/throttled) to maintain 60fps scrolling on mobile.

## 4. Technical Requirements

* **Performance:** Maintain 100/100 Lighthouse score.
* **Responsiveness:** Hero grid must collapse gracefully to stacked layout on mobile. Sidebar must disappear or move to bottom on screens < 1024px.
* **Stack:** Astro 5, Tailwind CSS 4, Shadcn UI (React).
