# PRD: UI Refactor Phase 2 — Simplification & Cleanup

## 1. Introduction / Overview

Following the initial redesign (dark/light mode, navigation bar, bottom footer bar), this phase focuses on further simplifying and decluttering the personal website. The goal is to streamline the user experience by removing unnecessary UI elements, merging redundant pages, and cleaning up the project detail view.

**Problem being solved:** The site contains several pieces of UI that add visual noise without adding value — a build footer string, a "View Details" button, a separate Projects page that duplicates the Home page grid, extra hero CTA buttons, a verbose About header, cluttered project detail breadcrumbs/gallery, and raw frontmatter being rendered in markdown content.

---

## 2. Goals

1. Remove the "2025. Built with React & Tailwind & Cursor" text from the footer.
2. Make project card images directly clickable (cursor: pointer) to navigate to project detail, replacing the separate "View Details" button.
3. Merge the Home and Projects pages into a single unified page that lists all projects in the 2-column grid.
4. Simplify the hero banner to a single sentence, removing the "View My Work" and "Download Resume" CTA buttons and the multi-line subtitle.
5. Update the About page to remove its "About" heading and replace content with placeholder paragraphs.
6. Simplify the project detail page: remove breadcrumb, "Back to Projects" button, and the default MediaGallery component. Keep title, description, tags, read time, and "View on GitHub" button at the top.
7. Strip frontmatter from being rendered within the markdown content body on project detail pages.

---

## 3. User Stories

- **As a visitor**, I want the footer to show only contact/social links and my location, so the page feels clean and professional.
- **As a visitor**, I want to click a project card's image to open its detail page, so the interaction feels natural without a redundant button.
- **As a visitor**, I want to see all my projects directly on the home page without navigating to a separate Projects page, reducing friction.
- **As a visitor**, I want the hero banner to display a single concise sentence so it is not cluttered with multiple lines of text and buttons I don't need.
- **As a visitor**, I want the About page to have placeholder bio text without a large "About" heading, so it feels like a real personal page.
- **As a visitor**, I want the project detail page to be clean — no breadcrumb trail, no back button, no auto-generated gallery — so the focus is on the markdown content.
- **As a visitor**, I don't want to see raw YAML/frontmatter text at the top of project content pages — it should be parsed and hidden.

---

## 4. Functional Requirements

### 4.1 Footer Cleanup
1. The footer must **not** render any "Built with..." or year/credit text string.
2. The existing location text ("Vancouver, Canada") and social icon links (Email, LinkedIn, GitHub) must remain unchanged.

### 4.2 Project Card — Clickable Image, Remove "View Details" Button
3. The `ProjectCard` component must remove the "View Details" button entirely.
4. The image area of `ProjectCard` must be wrapped in (or act as) a clickable element that navigates to `/projects/:id`.
5. When hovering over the image, the cursor must change to a pointer (`cursor-pointer`).
6. The existing hover scale animation on the image should be kept or enhanced to signal interactivity.

### 4.3 Merge Home and Projects Pages
7. The `/projects` route must be **removed entirely** from the React Router config in `src/App.tsx`. No redirect is needed.
8. The `Home` page must display **all** projects (not just featured ones) in the existing 2-column grid layout.
9. The `Home` page must **not** show a "View All Projects" button.
10. The `Projects` page component (`src/pages/Projects/Projects.tsx`) and its folder must be **deleted** from the codebase.
11. All navigation links or references to `/projects` (as a standalone route, not `/projects/:id`) must be **removed**. This includes the Navigation bar item and any internal `navigate('/projects')` calls. See §7 Technical Considerations for a full list of known locations.

### 4.4 Hero Banner Simplification
12. The `Home` hero section must display the following **exact single sentence** as the sole text content beside the headshot:
    > *"Hi, I'm Jordan Yu — a software engineer by trade and gamer at heart, with a passion for graphics, competitive programming, and picking up new things; welcome to my corner of the internet."*
13. The `<h1>` "Hi, I'm Jordan Yu" heading must be removed.
14. The `<h2>` "Senior Software Developer" subtitle must be removed.
15. The existing `<p>` description sentence must be replaced with the single sentence from requirement 12.
16. The "View My Work" button must be removed from the hero section.
17. The "Download Resume" button must be removed from the hero section.
18. The hero section must still display the headshot image at the same size and position.

### 4.5 About Page Update
19. The About page `Layout` component must be called with `showPageTitle={false}` (or equivalent) so no "About" heading is rendered by the layout.
20. Any `<h1>` or heading that says "About" inside the page component must be removed.
21. The page must contain 2–3 placeholder paragraphs of body text (lorem ipsum or simple placeholder content is acceptable; the developer's note should indicate Jordan will replace this later).

### 4.6 Project Detail Page Simplification
22. The `Breadcrumb` component and its import must be removed from `ProjectDetail`.
23. The "Back to Projects" button and its surrounding `<div>` container must be removed from `ProjectDetail`.
24. The `MediaGallery` component and its import must be removed from `ProjectDetail`. Images for a project will be embedded directly in the markdown content.
25. The top section of `ProjectDetail` must retain: project **title**, **description**, **tags** (with tag icons), and **read time**. The word-count display (`📝 N words`) must also be **removed** — only the clock/read-time indicator should remain.
26. The **"View on GitHub"** button must be retained and shown only when `project.githubRepo` is defined.
27. The **"View Live Demo"** button must be retained and shown only when `project.liveDemo` is defined.
28. The project banner image (`project.image`) rendered below the header section must be removed, since images will be defined in the markdown body.

### 4.7 Strip Frontmatter from Rendered Markdown
29. The markdown content passed to `MarkdownRenderer` (loaded from `.md` files) must have its YAML frontmatter block stripped before rendering.
30. Frontmatter is defined as content between the opening `---` and the first closing `---` at the start of the file.
31. This stripping must happen in the content loading utility (`src/utils/content-loader.ts`) before the content string is returned.
32. The stripping logic must handle files that do not have frontmatter (i.e., it must be a no-op if no `---` block is present at the start of the file).

---

## 5. Non-Goals (Out of Scope)

- Redesigning the overall color theme or layout grid.
- Adding any new pages or routes beyond what is described.
- Replacing the markdown rendering library (covered in a separate PRD).
- Modifying the blog/blog-posts removal (covered in a separate PRD).
- Implementing the resume PDF link (the button is just removed; no new resume upload is required).
- Any backend or server-side changes.
- A `/projects` redirect — the route is simply deleted with no replacement.

---

## 6. Design Considerations

- **Footer:** The existing bottom navigation bar layout with location (left) and social icons (right) should remain identical. Only the credit string (if it exists in the DOM) needs to be removed.
- **Project Cards:** The card layout (image left, content right on large screens; stacked on mobile) stays the same. The image area just becomes clickable. Consider adding a subtle overlay or scale effect on hover to signal it's clickable.
- **Home/Projects merge:** The 2-column projects grid already exists on the Home page. The change is simply: call `getAllProjects()` (or equivalent) instead of `getFeaturedProjects()`, and remove the "View All Projects" button.
- **Hero Banner:** After removing the multi-line text and buttons, the hero should feel lighter. A single `<p>` or `<h1>` containing one sentence is sufficient beside the headshot.
- **Project Detail:** After removing the breadcrumb, back button, banner image, and gallery, the page should flow: `[title] → [description] → [tags + read time] → [GitHub button] → [markdown content]`.

---

## 7. Technical Considerations

- **Routing (`src/App.tsx`):** Remove the `<Route path="/projects" ... />` entry entirely. The `/projects/:id` route for project detail pages must be kept.
- **Known `/projects` link locations to remove or update:**
  - `src/App.tsx` — the `/projects` `<Route>` element
  - `src/components/Navigation/Navigation.tsx` — the "Projects" nav item linking to `/projects`
  - `src/pages/Home/Home.tsx` — any "View All Projects" `<button>` or `navigate('/projects')` call
  - `src/pages/ProjectDetail/ProjectDetail.tsx` — the breadcrumb `{ label: 'Projects', path: '/projects' }` item and the "Back to Projects" `navigate('/projects')` call (both removed as part of §4.6)
  - `src/pages/index.ts` — remove the `Projects` export
  - `src/components/index.ts` — remove the `ProjectCarousel` export
- **ProjectCarousel deletion:** `src/components/ProjectCarousel/ProjectCarousel.tsx`, `src/components/ProjectCarousel/ProjectCarousel.test.tsx`, and the `src/components/ProjectCarousel/` folder must be **deleted**. Remove its export from `src/components/index.ts`.
- **Projects page deletion:** `src/pages/Projects/Projects.tsx` and the `src/pages/Projects/` folder must be **deleted**.
- **Data (`Home.tsx`):** `Home.tsx` currently calls `getFeaturedProjects()`. This must be changed to import and use the full `projects` array from `src/data/projects_list.ts` (which already contains all projects) to display all projects in the grid.
- **Frontmatter stripping:** Apply the following utility in `src/utils/content-loader.ts` after reading the raw file, before returning the content string:
  ```ts
  function stripFrontmatter(markdown: string): string {
    return markdown.replace(/^---[\s\S]*?---\n?/, '');
  }
  ```
  The function must be a no-op for files with no frontmatter.
- **ProjectCard clickable image:** Wrap the image `<div>` in a React Router `<Link to={\`/projects/${project.id}\`}>` (preferred over `useNavigate` for accessibility). Add `cursor-pointer` to the wrapper. The `onViewDetails` prop becomes unused and can be removed from the component interface.
- **Tests:** Tests for `ProjectCard`, `Home`, `ProjectDetail`, `Footer`, and `ProjectCarousel` (deleted) will need updating. Key changes expected:
  - `ProjectCard` tests: no "View Details" button assertion; add image-link assertion
  - `Home` tests: all projects rendered, no carousel, no featured-only filter
  - `ProjectDetail` tests: no breadcrumb, no back button, no gallery assertions
  - Delete `ProjectCarousel` test file along with the component

---

## 8. Success Metrics

- No "Built with..." text is visible in the footer on any page.
- Clicking a project card image navigates to the correct project detail page; cursor becomes a pointer on hover.
- The `/projects` route returns a 404 / not-found state (it no longer exists in the router).
- All projects are visible on the home page without any "View All Projects" button.
- The hero banner shows only the headshot and the single confirmed sentence — no CTA buttons, no subtitle.
- The About page renders placeholder paragraphs with no "About" heading.
- The project detail page shows title, description, tags, read time (no word count), and GitHub/live-demo buttons — no breadcrumb, no back button, no gallery, no banner image.
- Raw YAML frontmatter (lines between `---` delimiters) is not visible in any rendered project content.
- The `ProjectCarousel` component folder does not exist in the codebase.
- The `Projects` page folder does not exist in the codebase.
- All existing passing tests continue to pass; updated tests reflect the removed elements.

---

## 9. Resolved Questions

| # | Question | Resolution |
|---|----------|------------|
| 1 | Should `/projects` redirect to `/` or be removed? | **Removed entirely** — no redirect, no fallback. Any existing nav link to `/projects` is also removed. |
| 2 | What is the exact hero banner copy? | **Confirmed:** *"Hi, I'm Jordan Yu — a software engineer by trade and gamer at heart, with a passion for graphics, competitive programming, and picking up new things; welcome to my corner of the internet."* |
| 3 | Should `ProjectCarousel` be deleted? | **Yes** — delete the component, its test, and its export. |
| 4 | Should the word-count display be kept? | **No** — remove the `📝 N words` display. Keep only the clock/read-time indicator. |
