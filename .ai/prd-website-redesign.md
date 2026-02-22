# Product Requirements Document: Website Redesign & Refactor

## 1. Introduction/Overview
This document outlines the requirements for redesigning and refactoring the personal portfolio website. The goal is to simplify the homepage, update the navigation structure, introduce a light/dark mode toggle, and clean up the codebase by removing unused blog features and standardizing markdown parsing.

## 2. Goals
- Improve user experience with a cleaner, more focused homepage.
- Provide a light/dark mode toggle for better accessibility and user preference.
- Streamline navigation with clear links to Projects, About, and Resume.
- Add a footer with contact information and social links.
- Reduce technical debt by removing unused blog functionality and replacing custom markdown parsing with a standard library.

## 3. User Stories
- As a visitor, I want to toggle between light and dark modes so I can view the site comfortably in different lighting conditions.
- As a visitor, I want to see a concise overview of the developer on the homepage without being overwhelmed by text.
- As a visitor, I want to easily navigate to the developer's projects, about page, and resume from the top navigation bar.
- As a visitor, I want to find the developer's contact information and social links easily at the bottom of the page.
- As a developer, I want the codebase to be clean and maintainable, without unused blog features and with standard markdown parsing.

## 4. Functional Requirements
1. **Theme Toggle:** Implement a light/dark mode toggle in the top-bar navigation (right side).
2. **Top-Bar Navigation:**
   - Left side: Display "Jordan Yu" linking to the homepage (`/`).
   - Right side: Links for "Projects" (`/projects`), "About" (`/about`), and "Resume" (external link to `/resume.pdf`).
3. **Bottom Navigation Bar (Footer):**
   - Left side: Display "Vancouver, Canada".
   - Right side: Icons for Email (`jordanyu1992@gmail.com`), LinkedIn (`https://www.linkedin.com/in/jordanu92/`), and GitHub (`https://github.com/stymphalian`).
4. **Homepage Redesign:**
   - Retain the hero banner (profile picture, name, single-sentence description).
   - Remove "Technical Expertise", "Professional Experience", and "Education" sections.
   - Replace the `ProjectCarousel` with a 2-column grid of `ProjectCard` components.
5. **About Page:** Create a new placeholder page at `/about`.
6. **Blog Removal:** Remove all references, pages, data, and types related to "blog" and "blog posts".
7. **Markdown Parsing:** Replace custom frontmatter parsing and markdown stats calculation with standard libraries (`gray-matter` and `reading-time`). Remove custom regex-based parsing and validation logic in `src/utils/content-loader.ts` and `src/utils/markdown.ts`. Keep `react-markdown` for rendering as it is the standard for React applications.

## 5. Non-Goals (Out of Scope)
- Adding new projects or content to the site.
- Redesigning the individual project detail pages.
- Implementing a backend or database.

## 6. Design Considerations
- The theme toggle should use appropriate icons (e.g., sun/moon).
- The homepage grid should be responsive (1 column on mobile, 2 columns on larger screens).
- The footer should be visually distinct but consistent with the overall site design.

## 7. Technical Considerations
- Use CSS variables for light/dark mode colors to integrate seamlessly with Tailwind CSS.
- **Markdown stack:** Keep `react-markdown` (with `rehype-highlight`, `remark-gfm`) for rendering. Replace custom frontmatter parsing (`parseFrontmatter`, `parseYamlFrontmatter` in `content-loader.ts`) with `gray-matter`. Replace custom word count / read time calculation (`parseMarkdown`, `getContentStats` in `markdown.ts`) with `reading-time`. Remove custom `validateMarkdownContent` regex validation.
- Verify that removing blog features does not break existing tests or routing.

## 8. Success Metrics
- All functional requirements are implemented and working correctly.
- The codebase is free of blog-related code and custom frontmatter parsing.
- All tests pass successfully.

## 9. Open Questions
- None at this time.
