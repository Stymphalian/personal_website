# Tasks: Website Redesign & Refactor

## Relevant Files

- `personal-blog/src/styles/globals.css` - Global CSS styles; will add CSS variables for light/dark theme.
- `personal-blog/tailwind.config.js` - Tailwind configuration; update color definitions to use CSS variables for theming.
- `personal-blog/src/components/Navigation/Navigation.tsx` - Current navigation bar; will be redesigned with new layout and theme toggle.
- `personal-blog/src/components/Navigation/Navigation.test.tsx` - Tests for Navigation; update to reflect new structure.
- `personal-blog/src/components/ThemeToggle/ThemeToggle.tsx` - New component for the light/dark mode toggle button.
- `personal-blog/src/components/ThemeToggle/ThemeToggle.test.tsx` - Tests for ThemeToggle.
- `personal-blog/src/components/ThemeToggle/index.ts` - Barrel export for ThemeToggle.
- `personal-blog/src/components/Footer/Footer.tsx` - New footer component with location and social links.
- `personal-blog/src/components/Footer/Footer.test.tsx` - Tests for Footer.
- `personal-blog/src/components/Footer/index.ts` - Barrel export for Footer.
- `personal-blog/src/components/index.ts` - Component barrel exports; add new components, remove unused ones.
- `personal-blog/src/pages/Home/Home.tsx` - Homepage; simplify hero, remove sections, replace carousel with grid.
- `personal-blog/src/pages/Home/Home.test.tsx` - Tests for Home page (if exists); update to match new layout.
- `personal-blog/src/pages/About/About.tsx` - New placeholder About page.
- `personal-blog/src/pages/About/About.test.tsx` - Tests for About page.
- `personal-blog/src/pages/About/index.ts` - Barrel export for About.
- `personal-blog/src/pages/index.ts` - Page barrel exports; add About, remove Blog/BlogPostDetail.
- `personal-blog/src/App.tsx` - Main app with routing; update routes for About, remove blog routes.
- `personal-blog/src/App.test.tsx` - Tests for App; update to reflect new routing.
- `personal-blog/src/pages/Blog/Blog.tsx` - Blog page to be deleted.
- `personal-blog/src/pages/BlogPostDetail/BlogPostDetail.tsx` - Blog post detail page to be deleted.
- `personal-blog/src/pages/BlogPostDetail/index.ts` - Barrel export to be deleted.
- `personal-blog/src/data/blog-posts.ts` - Blog post data to be deleted.
- `personal-blog/src/data/blog-posts.test.ts` - Blog post tests to be deleted.
- `personal-blog/src/data/index.ts` - Data barrel exports; remove blog-posts re-export.
- `personal-blog/src/data/interfaces.ts` - Data interfaces; remove blog-related types if any.
- `personal-blog/src/types/content.ts` - Content types; remove `BlogPostFrontmatter`, `BlogPostContent`, and related types.
- `personal-blog/src/types/content.test.ts` - Content type tests; remove blog-related test cases.
- `personal-blog/src/utils/content-loader.ts` - Content loader; remove custom `parseFrontmatter`/`parseYamlFrontmatter`, replace with `gray-matter`. Remove blog-specific validation.
- `personal-blog/src/utils/content-loader.test.ts` - Tests for content loader; update to match new parsing logic.
- `personal-blog/src/utils/markdown.ts` - Markdown utils; replace `parseMarkdown`/`getContentStats` with `reading-time`, remove `validateMarkdownContent`.
- `personal-blog/src/utils/index.ts` - Utils barrel exports; update as needed.
- `personal-blog/src/utils/fallback-content.ts` - Fallback content; remove blog-related fallbacks.
- `personal-blog/src/utils/fallback-content.test.ts` - Tests for fallback content; remove blog-related tests.
- `personal-blog/content/blog-posts/react-performance-optimization.md` - Blog content file to be deleted.
- `personal-blog/content/blog-posts/typescript-advanced-patterns.md` - Blog content file to be deleted.
- `personal-blog/src/components/ProjectCarousel/ProjectCarousel.tsx` - May be removed from homepage usage (keep component if used elsewhere).
- `personal-blog/src/components/ProjectCard/ProjectCard.tsx` - Used in the new homepage 2-column grid.
- `personal-blog/package.json` - Add `reading-time` dependency; `gray-matter` already exists in devDependencies (move to dependencies).

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- `gray-matter` is already in `devDependencies`; it needs to be moved to `dependencies` since it will be used at runtime.
- `reading-time` needs to be installed as a dependency.
- The existing theme is dark-only using hardcoded Tailwind color values. The light/dark toggle will require converting these to CSS variable-based colors.
- `lucide-react` is already installed and provides icon components (Sun, Moon, Mail, Github, Linkedin, etc.).

## Agent Notes

_Living scratchpad for the AI agent during implementation. Updated as work progresses._

- **MCP Playwright tool** is available for browser testing at `localhost:3000`. Use it to visually verify changes after implementation steps.
- **After each parent task**: Run `npx jest` (all tests must pass), then `npx tsc --noEmit` (no type errors), then commit.
- **After any content/data change**: Run `node scripts/generate-projects.mjs` from `personal-blog/` and verify `src/data/projects_list.ts` is regenerated correctly.
- **Before marking a parent task complete**: Open `localhost:3000` in MCP Playwright and visually verify the affected pages still render correctly.
- **Before committing**: Mark all completed sub-tasks `[x]` and the parent task `[x]` in this file. Stage and commit the task file along with the code changes.
- **Dev server**: Assume `localhost:3000` is always running. If it isn't, the user will start it.

## Tasks

- [x] 1.0 Remove Blog Functionality
  - [x] 1.1 Delete blog page files: `src/pages/Blog/Blog.tsx` and the `Blog/` directory.
  - [x] 1.2 Delete blog post detail files: `src/pages/BlogPostDetail/BlogPostDetail.tsx`, `src/pages/BlogPostDetail/index.ts`, and the `BlogPostDetail/` directory.
  - [x] 1.3 Delete blog data files: `src/data/blog-posts.ts` and `src/data/blog-posts.test.ts`.
  - [x] 1.4 Delete blog content markdown files: `content/blog-posts/react-performance-optimization.md`, `content/blog-posts/typescript-advanced-patterns.md`, and the `content/blog-posts/` directory.
  - [x] 1.5 Remove blog-related exports from `src/pages/index.ts` (`Blog`, `BlogPostDetail`).
  - [x] 1.6 Remove the `blog-posts` re-export from `src/data/index.ts`.
  - [x] 1.7 Remove blog-related types from `src/types/content.ts`: `BlogPostFrontmatter`, `BlogPostContent`, `REQUIRED_BLOG_POST_FIELDS`, and any blog-specific fields in `ContentMetadata`, `ContentSearchResult`, `ContentType`.
  - [x] 1.8 Update `src/types/content.test.ts` to remove blog-related test cases.
  - [x] 1.9 Remove commented-out blog routes from `App.tsx` and the `Blog`/`BlogPostDetail` imports.
  - [x] 1.10 Remove the commented-out blog nav item from `Navigation.tsx` if still present.
  - [x] 1.11 Remove blog-related fallback content from `src/utils/fallback-content.ts` and update its tests.
  - [x] 1.12 Remove blog-related references from `src/utils/content-loader.ts` (blog-post content type handling, blog-post validation, blog-post specific frontmatter parsing).
  - [x] 1.13 Update `src/utils/content-loader.test.ts` to remove blog-related test cases.
  - [x] 1.14 Remove the `Contact` page and its route from `App.tsx` if it is no longer in the navigation (the footer now handles contact info). Remove from `src/pages/index.ts` as well.
- [x] 2.0 Replace Custom Markdown Parsing with Standard Libraries
  - [x] 2.1 Move `gray-matter` from `devDependencies` to `dependencies` in `package.json` and install `reading-time` as a dependency. Run `npm install`.
  - [x] 2.2 In `src/utils/content-loader.ts`, replace the custom `parseFrontmatter` and `parseYamlFrontmatter` functions with `gray-matter` for frontmatter extraction.
  - [x] 2.3 In `src/utils/markdown.ts`, replace `parseMarkdown` and `getContentStats` with calls to the `reading-time` library. Remove the `validateMarkdownContent` function entirely.
  - [x] 2.4 Update all imports of the removed functions across the codebase (e.g., `content-loader.ts` importing from `markdown.ts`).
  - [x] 2.5 Update `src/utils/content-loader.test.ts` to test the new `gray-matter`-based parsing.
  - [x] 2.6 Update or remove tests in `src/utils/markdown.ts` related tests if they exist, to reflect the `reading-time` integration and removal of `validateMarkdownContent`.
- [x] 3.0 Implement light/dark toggle
  - [x] 3.1 Define CSS variables for light and dark themes in `globals.css` (background, surface, border, text colors, etc.) under `:root` (light) and `.dark` (dark) selectors.
  - [x] 3.2 Update `tailwind.config.js` to reference the new CSS variables instead of hardcoded hex values for the `vs-editor` and `crystal-blue` color palettes.
  - [x] 3.3 Create a `ThemeToggle` component (`src/components/ThemeToggle/ThemeToggle.tsx`) with a sun/moon icon button that toggles a `dark` class on `<html>` and persists the preference to `localStorage`.
  - [x] 3.4 Create barrel export `src/components/ThemeToggle/index.ts`.
  - [x] 3.5 Add the `ThemeToggle` component export to `src/components/index.ts`.
  - [x] 3.6 Initialize the theme on app load (e.g., in `App.tsx` or `main.tsx`) by reading `localStorage` and applying the `dark` class to `<html>`, defaulting to dark if no preference is set.
  - [x] 3.7 Write unit tests for the `ThemeToggle` component (`ThemeToggle.test.tsx`) covering toggle behavior and localStorage persistence.
- [x] 4.0 Redesign Top-Bar Navigation
  - [x] 4.1 Refactor `Navigation.tsx`: left side shows "Jordan Yu" as a `<Link>` to `/`; right side shows "Projects" (`/projects`), "About" (`/about`), "Resume" (external link to `/resume.pdf`), and the `ThemeToggle` component.
  - [x] 4.2 Remove the existing "Tools" dropdown, "Home" nav item, and "Contact" nav item from the navigation.
  - [x] 4.3 Ensure the "Resume" link opens in a new tab or triggers a download (use `<a href="/resume.pdf" target="_blank">`).
  - [x] 4.4 Update the mobile hamburger menu to reflect the new navigation items (Projects, About, Resume, ThemeToggle).
  - [x] 4.5 Update `Navigation.test.tsx` to verify new nav structure: "Jordan Yu" link, Projects, About, Resume links, and ThemeToggle presence.
- [ ] 5.0 Create Footer Component
  - [ ] 5.1 Create `src/components/Footer/Footer.tsx` with left side displaying "Vancouver, Canada" and right side displaying icon links for Email (`mailto:jordanyu1992@gmail.com`), LinkedIn (`https://www.linkedin.com/in/jordanu92/`), and GitHub (`https://github.com/stymphalian`).
  - [ ] 5.2 Use `lucide-react` icons (`Mail`, `Linkedin`, `Github`) for the social links.
  - [ ] 5.3 Style the footer to be visually distinct but consistent with the site theme (uses theme CSS variables).
  - [ ] 5.4 Create barrel export `src/components/Footer/index.ts`.
  - [ ] 5.5 Add the `Footer` component export to `src/components/index.ts`.
  - [ ] 5.6 Integrate the `Footer` into the app layout (e.g., in `App.tsx` below `<Routes>`, or in the `Layout` component) so it appears on every page.
  - [ ] 5.7 Write unit tests for the `Footer` component (`Footer.test.tsx`) verifying location text, icon links with correct hrefs, and accessibility attributes.
- [ ] 6.0 Redesign Homepage
  - [ ] 6.1 In `Home.tsx`, remove the "Technical Expertise" section (the skills grid).
  - [ ] 6.2 Remove the "Professional Experience" and "Education & Background" section (the experience/education grid).
  - [ ] 6.3 Replace the `ProjectCarousel` section with a responsive 2-column grid of `ProjectCard` components (1 column on mobile, 2 columns on `md:` and above).
  - [ ] 6.4 Remove the `ProjectCarousel` import from `Home.tsx`; import and use `ProjectCard` instead. Use `projects` data (all or featured) to populate the grid.
  - [ ] 6.5 Simplify the hero section: keep the profile picture, name, and a single-sentence description. Remove or condense the longer bio paragraph.
  - [ ] 6.6 Update or create tests for the Home page to verify the new layout (grid of project cards, no carousel, no skills/experience sections).
- [ ] 7.0 Create About Page
  - [ ] 7.1 Create `src/pages/About/About.tsx` as a placeholder page with a title ("About") and placeholder text.
  - [ ] 7.2 Create barrel export `src/pages/About/index.ts`.
  - [ ] 7.3 Add the `About` export to `src/pages/index.ts`.
  - [ ] 7.4 Add a route for `/about` in `App.tsx` pointing to the `About` component.
  - [ ] 7.5 Write a basic unit test for the About page (`About.test.tsx`) verifying it renders the placeholder content.
- [ ] 8.0 Update Tests & Final Cleanup
  - [ ] 8.1 Run the full test suite (`npx jest`) and fix any failures caused by the changes above.
  - [ ] 8.2 Run the TypeScript type checker (`npx tsc --noEmit`) and fix any type errors.
  - [ ] 8.3 Run the linter (`npm run lint`) and fix any lint issues.
  - [ ] 8.4 Remove any remaining dead imports, unused variables, or orphaned files related to removed features.
  - [ ] 8.5 Verify the app builds successfully (`npm run build`).
  - [ ] 8.6 Manually verify the dev server starts and all pages render correctly (`npm run dev`).
