# Task List: Bug Fixes and UI Cleanup

## Relevant Files

- `src/components/ProjectCarousel/ProjectCarousel.tsx` - Contains the featured projects carousel component that needs button positioning fixes and project detail navigation.
- `src/components/ProjectCarousel/ProjectCarousel.test.tsx` - Unit tests for the ProjectCarousel component.
- `src/pages/Home/Home.tsx` - Home page that contains the featured projects section.
- `src/pages/Home/Home.test.tsx` - Unit tests for the Home component.
- `src/pages/BlogPostDetail/BlogPostDetail.tsx` - Blog post detail page that needs metadata positioning fixes.
- `src/pages/BlogPostDetail/BlogPostDetail.test.tsx` - Unit tests for the BlogPostDetail component.
- `src/pages/ProjectDetail/ProjectDetail.tsx` - Project detail page that needs metadata positioning fixes.
- `src/pages/ProjectDetail/ProjectDetail.test.tsx` - Unit tests for the ProjectDetail component.
- `src/pages/Contact/Contact.tsx` - Contact page that needs layout compaction.
- `src/pages/Contact/Contact.test.tsx` - Unit tests for the Contact component.
- `src/App.tsx` - Main app component that needs scroll-to-top functionality for routing.
- `src/components/Layout/Layout.tsx` - Layout component that may need scroll management.
- `src/components/Layout/Layout.test.tsx` - Unit tests for the Layout component.
- `src/data/projects.ts` - Project data structure that may need updates for navigation.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npm test` to run tests. Running without a path executes all tests found by the Jest configuration.
- The scroll-to-top functionality should be implemented at the routing level to ensure it works for all page transitions.

## Tasks

- [x] 1.0 Fix Featured Projects Carousel Button Overlap and Add Project Detail Navigation
  - [x] 1.1 Fix carousel left/right navigation buttons overlapping with "Live Demo" button
  - [x] 1.2 Add "View Details" button to open specific project detail pages
  - [x] 1.3 Ensure proper z-index layering for all carousel controls
  - [x] 1.4 Update carousel layout to accommodate additional button without overlap

- [x] 2.0 Implement Global Scroll-to-Top for Page Routing
  - [x] 2.1 Add scroll-to-top functionality for all page navigation
  - [x] 2.2 Implement scroll restoration for browser back/forward navigation
  - [x] 2.3 Ensure scroll behavior works consistently across all routes
  - [x] 2.4 Test scroll behavior with different navigation methods (View Details, View All Projects, blog navigation)

- [x] 3.0 Reposition Metadata Blocks on Detail Pages
  - [x] 3.1 Move Words and Read Time block to top of BlogPostDetail page beside tags
  - [x] 3.2 Move Words and Read Time block to top of ProjectDetail page beside tags
  - [x] 3.3 Ensure consistent metadata layout across both detail page types
  - [x] 3.4 Update responsive design for metadata positioning

- [ ] 4.0 Compact Contact Page Layout
  - [ ] 4.1 Reduce excessive white space on Contact page
  - [ ] 4.2 Optimize spacing between contact information cards
  - [ ] 4.3 Adjust padding and margins for more compact appearance
  - [ ] 4.4 Maintain responsive design while reducing whitespace
