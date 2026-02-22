## Relevant Files

- `src/App.tsx` — Remove the `/projects` standalone route; keep `/projects/:projectId`.
- `src/components/Navigation/Navigation.tsx` — Update the "Projects" nav item to point to `/` instead of `/projects`.
- `src/components/index.ts` — Remove the `ProjectCarousel` export.
- `src/components/ProjectCard/ProjectCard.tsx` — Remove "View Details" button; wrap image in a `<Link>` to `/projects/:id`.
- `src/components/ProjectCard/ProjectCard.test.tsx` — Update tests: remove "View Details" assertion, add image-link assertion.
- `src/components/ProjectCarousel/ProjectCarousel.tsx` — **Delete** this file.
- `src/components/ProjectCarousel/ProjectCarousel.test.tsx` — **Delete** this file.
- `src/pages/index.ts` — Remove the `Projects` export.
- `src/pages/Home/Home.tsx` — Replace `getFeaturedProjects()` with full `projects` array; replace multi-line hero with single sentence; remove CTA buttons; remove "View All Projects" button.
- `src/pages/Home/Home.test.tsx` — Update tests: remove "Senior Software Developer" / "Featured Projects" assertions; add check for single sentence copy.
- `src/pages/Projects/Projects.tsx` — **Delete** this file.
- `src/pages/About/About.tsx` — Remove "About" heading; add placeholder paragraphs.
- `src/pages/About/About.test.tsx` — Update tests: no "About" heading assertion; check for placeholder text.
- `src/pages/ProjectDetail/ProjectDetail.tsx` — Remove Breadcrumb, "Back to Projects" button, MediaGallery, banner image, and word-count display.
- `src/utils/content-loader.ts` — Investigate why frontmatter is rendered despite gray-matter parsing; add explicit strip as fallback if needed.

### Notes

- Unit tests should be placed alongside the code files they test (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Run tests with `npx jest` from `personal-blog/`. Run a single file with `npx jest path/to/file.test.tsx`.
- **§4.1 Pre-satisfied:** The footer (`Footer.tsx`) already contains no "Built with..." text. No changes needed there.
- **Tasks 1.0, 2.0, 3.0 partially done:** Route removal, navigation update, and home page merge were applied in a prior session. File deletions (1.4, 6.2–6.4) and the hero copy fix (4.1–4.2) still need to be done.
- The `ProjectCard` `onViewDetails` prop is no longer called by `Home.tsx` (already cleaned up), but the prop still exists in the component — remove it in task 5.4.
- The content-loader already calls `gray-matter` via `parseFrontmatterWithGrayMatter()` and returns `markdown` (body only). Task 8 is an investigation to confirm the rendered output matches — if raw YAML still appears, add the regex strip as a safety net.
- The hero `<h1>` currently renders "Jordan Yu" as a standalone blue heading (not yet removed). Task 4.1 removes it and task 4.2 replaces the `<p>` with the exact confirmed PRD copy.

---


## Agent Notes

_Living scratchpad for the AI agent during implementation. Updated as work progresses._

- **MCP Playwright tool** is available for browser testing at `localhost:3000`. Use it to visually verify changes after implementation steps.
- **After each parent task**: Run `npx jest` (all tests must pass), then `npx tsc --noEmit` (no type errors), then commit.
- **After any content/data change**: Run `node scripts/generate-projects.mjs` from `personal-blog/` and verify `src/data/projects_list.ts` is regenerated correctly.
- **Before marking a parent task complete**: Open `localhost:3000` in MCP Playwright and visually verify the affected pages still render correctly.
- **Before committing**: Mark all completed sub-tasks `[x]` and the parent task `[x]` in this file. Stage and commit the task file along with the code changes.
- **Dev server**: Assume `localhost:3000` is always running. If it isn't, the user will start it.

## Tasks

- [x] 1.0 Remove `/projects` standalone route and delete the Projects page
  - [x] 1.1 Remove `<Route path='/projects' element={<Projects />} />` from `src/App.tsx` *(already done)*
  - [x] 1.2 Remove the `Projects` import from `src/App.tsx` *(already done)*
  - [x] 1.3 Remove the `Projects` export from `src/pages/index.ts` *(already done)*
  - [x] 1.4 Delete `src/pages/Projects/Projects.tsx` and the entire `src/pages/Projects/` folder from disk
- [x] 2.0 Update Navigation bar "Projects" link to point to `/`
  - [x] 2.1 Change `navigationItems` entry from `{ path: '/projects', label: 'Projects' }` to `{ path: '/', label: 'Projects' }` in `src/components/Navigation/Navigation.tsx` *(already done)*
  - [x] 2.2 Update `isActive()` to use exact match (`===`) for the `/` path so it doesn't highlight on every route *(already done)*
- [x] 3.0 Merge all projects into the Home page grid and remove "View All Projects" button
  - [x] 3.1 Replace `getFeaturedProjects()` import with the full `projects` array from `src/data/projects_list.ts` in `src/pages/Home/Home.tsx` *(already done)*
  - [x] 3.2 Remove the `useNavigate` import and the "View All Projects" button from `src/pages/Home/Home.tsx` *(already done)*
  - [x] 3.3 Rename the section heading from "Featured Projects" to "Projects" in `src/pages/Home/Home.tsx` *(already done)*
- [x] 4.0 Simplify the hero banner to the confirmed single sentence, remove CTA buttons
  - [x] 4.1 Remove the `<h1>` element containing "Jordan Yu" from the hero section in `src/pages/Home/Home.tsx` (req 13)
  - [x] 4.2 Replace the `<p>` description with the exact confirmed copy: *"Hi, I'm Jordan Yu — a software engineer by trade and gamer at heart, with a passion for graphics, competitive programming, and picking up new things; welcome to my corner of the internet."* (req 12 & 15)
  - [x] 4.3 Verify the "View My Work" and "Download Resume" buttons are absent (already removed — confirm no orphan state)
- [x] 5.0 Update ProjectCard — make image a clickable link, remove "View Details" button
  - [x] 5.1 Add `import { Link } from 'react-router-dom'` to `src/components/ProjectCard/ProjectCard.tsx`
  - [x] 5.2 Wrap the image `<div>` in `<Link to={`/projects/${project.id}`} className='cursor-pointer block'>` so clicking the image navigates to the project detail page
  - [x] 5.3 Remove the `showDetails &&` conditional and the "View Details" `<button>` from the card footer
  - [x] 5.4 Remove the `onViewDetails` prop and `handleViewDetails` function from the component — the prop is now unused by all callers
  - [x] 5.5 Remove the `onViewDetails` usage from `src/pages/Home/Home.tsx` `<ProjectCard>` calls (if any remain after 3.0)
- [ ] 6.0 Delete the ProjectCarousel component
  - [ ] 6.1 Remove `ProjectCarousel` export from `src/components/index.ts` *(already done)*
  - [ ] 6.2 Delete `src/components/ProjectCarousel/ProjectCarousel.tsx` from disk
  - [ ] 6.3 Delete `src/components/ProjectCarousel/ProjectCarousel.test.tsx` from disk
  - [ ] 6.4 Delete the `src/components/ProjectCarousel/` folder from disk
- [ ] 7.0 Simplify the ProjectDetail page
  - [ ] 7.1 Remove the `Breadcrumb` import and the `<Breadcrumb items={breadcrumbItems} />` element (and the `breadcrumbItems` array) from `src/pages/ProjectDetail/ProjectDetail.tsx`
  - [ ] 7.2 Remove the "Back to Projects" `<button>` and its wrapping container `<div>` from `src/pages/ProjectDetail/ProjectDetail.tsx`
  - [ ] 7.3 Remove the `MediaGallery` import and `<MediaGallery ... />` element from `src/pages/ProjectDetail/ProjectDetail.tsx`
  - [ ] 7.4 Remove the project banner `<img src={project.image} ... />` block from `src/pages/ProjectDetail/ProjectDetail.tsx`
  - [ ] 7.5 Remove the word-count display (`📝 N words` block) from the tags/read-time row in `src/pages/ProjectDetail/ProjectDetail.tsx`
  - [ ] 7.6 Verify the title, description, tags, read-time, "View on GitHub", and "View Live Demo" (conditional) elements are all still present and correctly positioned
  - [ ] 7.7 Clean up any now-unused imports (e.g. `useNavigate`, `Breadcrumb`, `MediaGallery`) from the file
- [ ] 8.0 Investigate and fix frontmatter rendering in project detail pages
  - [ ] 8.1 Inspect `src/utils/content-loader.ts`: confirm that `parseFrontmatterWithGrayMatter()` is called and the returned `markdown` body (not `content`) is what gets stored in `projectContent.content`
  - [ ] 8.2 Check whether the `loadContent` → `loadProjectContent` dispatch path actually strips frontmatter or returns raw text (trace the code path used by `ProjectDetail.tsx`)
  - [ ] 8.3 If frontmatter is still leaking through, add a `stripFrontmatter` regex fallback in `src/utils/content-loader.ts` immediately after `parseFrontmatterWithGrayMatter()`:
    ```ts
    function stripFrontmatter(markdown: string): string {
      return markdown.replace(/^---[\s\S]*?---\n?/, '');
    }
    ```
  - [ ] 8.4 Verify in the browser that no raw YAML `---` block appears at the top of any project detail page after the fix
- [ ] 9.0 Update the About page
  - [ ] 9.1 Change the `Layout` call in `src/pages/About/About.tsx` to use `showPageTitle={false}` so the "About" heading is not rendered by the layout
  - [ ] 9.2 Remove any inline `<h1>` or heading element reading "About" from the page component body
  - [ ] 9.3 Replace the "This page is coming soon." placeholder with 2–3 short placeholder paragraphs of bio text (Jordan will replace this later — add a `{/* TODO: Replace with real bio content */}` comment)
- [ ] 10.0 Update all affected tests
  - [ ] 10.1 **`ProjectCard.test.tsx`**: Remove the assertion that the "View Details" button exists; add an assertion that the image is wrapped in a link pointing to `/projects/test-project-1`
  - [ ] 10.2 **`Home.test.tsx`**: Remove assertions for "Senior Software Developer" subtitle and "Featured Projects" heading; update the hero text assertion to match the new single-sentence copy; add assertion that all projects from `projects_list` are rendered (check count or specific titles)
  - [ ] 10.3 **`About.test.tsx`**: Remove the `expect(screen.getByText('About')).toBeInTheDocument()` assertion; remove the "coming soon" assertion; add an assertion for one of the new placeholder paragraph strings
  - [ ] 10.4 **`ProjectCarousel.test.tsx`**: Delete this file from disk (component is deleted)
  - [ ] 10.5 Run the full test suite with `npx jest` from `personal-blog/` and confirm all tests pass
