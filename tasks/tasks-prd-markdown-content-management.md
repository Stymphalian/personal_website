# Task List: Markdown-Based Content Management

## Relevant Files

- `personal-blog/content/` - Main content directory for markdown files
- `personal-blog/content/README.md` - Content management guide and documentation
- `personal-blog/content/blog-posts/` - Directory for blog post markdown files
- `personal-blog/content/blog-posts/react-performance-optimization.md` - Sample blog post about React performance
- `personal-blog/content/blog-posts/typescript-advanced-patterns.md` - Sample blog post about TypeScript patterns
- `personal-blog/content/blog-posts/docker-production-optimization.md` - Sample blog post about Docker optimization
- `personal-blog/content/projects/` - Directory for project markdown files
- `personal-blog/content/projects/personal-blog-portfolio.md` - Sample project markdown for personal blog
- `personal-blog/content/projects/ecommerce-platform.md` - Sample project markdown for e-commerce platform
- `personal-blog/content/projects/task-management-app.md` - Sample project markdown for task management app
- `personal-blog/public/images/` - Directory for media assets
- `personal-blog/src/data/blog-posts.ts` - Blog post metadata and data structure
- `personal-blog/src/data/projects.ts` - Project metadata and data structure
- `personal-blog/src/utils/markdown.ts` - Markdown processing utilities
- `personal-blog/src/utils/content-loader.ts` - Dynamic content loading utilities
- `personal-blog/src/utils/content-loader.test.ts` - Unit tests for content loader
- `personal-blog/src/pages/BlogPostDetail/BlogPostDetail.tsx` - Blog post detail page component
- `personal-blog/src/pages/ProjectDetail/ProjectDetail.tsx` - Project detail page component
- `personal-blog/src/components/MarkdownRenderer/MarkdownRenderer.tsx` - Markdown rendering component
- `personal-blog/src/components/MarkdownRenderer/MarkdownRenderer.test.tsx` - Unit tests for markdown renderer
- `personal-blog/vite.config.ts` - Vite build configuration
- `personal-blog/src/types/content.ts` - TypeScript types for content management
- `personal-blog/src/types/content.test.ts` - Unit tests for content types
- `personal-blog/src/pages/ErrorPage/ErrorPage.tsx` - Generic error page component
- `personal-blog/src/pages/ErrorPage/ErrorPage.test.tsx` - Unit tests for error page

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The existing markdown parsing in BlogPostDetail.tsx will need to be replaced with the new dynamic content loading system.

## Tasks

- [x] 1.0 Create Content Directory Structure and Markdown File Format
  - [x] 1.1 Create `content/` directory in project root
  - [x] 1.2 Create `content/blog-posts/` subdirectory
  - [x] 1.3 Create `content/projects/` subdirectory
  - [x] 1.4 Create sample markdown files with proper frontmatter format
  - [x] 1.5 Document markdown file naming conventions and structure
  - [x] 1.6 Create `public/images/` directory for media assets

- [ ] 2.0 Implement Markdown Loading and Processing Infrastructure
  - [x] 2.1 Create `src/types/content.ts` with content management interfaces
  - [x] 2.2 Create `src/utils/content-loader.ts` for dynamic file loading
  - [x] 2.3 Implement markdown file discovery and metadata extraction
  - [x] 2.4 Create content caching mechanism for performance
  - [ ] 2.5 Implement error handling for missing or malformed files
  - [ ] 2.6 Create `src/components/MarkdownRenderer/MarkdownRenderer.tsx` component
  - [ ] 2.7 Integrate existing markdown processing utilities with new system

- [ ] 3.0 Update Build Process and Vite Configuration
  - [ ] 3.1 Modify `vite.config.ts` to include content files in build
  - [ ] 3.2 Configure Vite to handle markdown files as assets
  - [ ] 3.3 Ensure content files are copied to build output directory
  - [ ] 3.4 Test build process includes all content files
  - [ ] 3.5 Verify content loading works in both development and production

- [ ] 4.0 Modify Data Layer to Support Dynamic Content Loading
  - [ ] 4.1 Update `src/data/blog-posts.ts` to remove content field from interface
  - [ ] 4.2 Update `src/data/projects.ts` to remove content field from interface
  - [ ] 4.3 Modify data functions to work with metadata only
  - [ ] 4.4 Create content loading functions that integrate with existing data layer
  - [ ] 4.5 Update data utility functions to support dynamic content loading
  - [ ] 4.6 Ensure backward compatibility during transition period

- [ ] 5.0 Update UI Components to Use Dynamic Content
  - [ ] 5.1 Modify `BlogPostDetail.tsx` to use dynamic content loading
  - [ ] 5.2 Modify `ProjectDetail.tsx` to use dynamic content loading
  - [ ] 5.3 Replace inline markdown parsing with MarkdownRenderer component
  - [ ] 5.4 Update content loading logic to handle loading states
  - [ ] 5.5 Implement error boundaries for content loading failures
  - [ ] 5.6 Ensure SEO meta tags still work with dynamic content

- [ ] 6.0 Migrate Existing Content to Markdown Files
  - [ ] 6.1 Extract blog post content from `blog-posts.ts` to markdown files
  - [ ] 6.2 Extract project content from `projects.ts` to markdown files
  - [ ] 6.3 Preserve all metadata and formatting during migration
  - [ ] 6.4 Test that migrated content displays correctly
  - [ ] 6.5 Verify all links and references still work after migration
  - [ ] 6.6 Update any hardcoded content references

- [ ] 7.0 Implement Error Handling and Edge Case Management
  - [ ] 7.1 Create `src/pages/ErrorPage/ErrorPage.tsx` component
  - [ ] 7.2 Implement graceful fallbacks for missing content
  - [ ] 7.3 Handle malformed markdown files gracefully
  - [ ] 7.4 Implement 404 handling for non-existent posts/projects
  - [ ] 7.5 Add logging for content loading errors
  - [ ] 7.6 Test error scenarios and edge cases

- [ ] 8.0 Testing and Performance Optimization
  - [ ] 8.1 Write unit tests for all new components and utilities
  - [ ] 8.2 Test content loading performance and optimize if needed
  - [ ] 8.3 Implement content preloading for frequently accessed posts
  - [ ] 8.4 Test build process with various content file sizes
  - [ ] 8.5 Verify performance metrics meet success criteria (within 10% of current)
  - [ ] 8.6 Run full test suite to ensure no regressions
  - [ ] 8.7 Test content loading in different network conditions
