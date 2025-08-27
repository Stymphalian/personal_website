# Product Requirements Document: Markdown-Based Content Management

## Introduction/Overview

Currently, all blog post and project content is stored directly in TypeScript data files (`data/blog-posts.ts` and `data/projects.ts`), which tightly couples content with application logic and increases the web-app payload. This feature will implement a markdown-based content management system that separates content from application code, allowing content to be authored in separate markdown files while maintaining the existing user experience.

## Goals

1. **Content Separation**: Move blog post and project content from TypeScript files to separate markdown files
2. **Dynamic Loading**: Implement runtime loading of markdown content from designated directories
3. **Metadata Preservation**: Maintain existing metadata structure in TypeScript files for post listings and navigation
4. **Media Support**: Support images and other media files referenced in markdown content
5. **Build Integration**: Ensure new posts are automatically picked up during the build process
6. **Error Handling**: Provide graceful error handling for malformed or missing content

## User Stories

### Content Author
- **As a content author**, I want to write all my posts directly in separate markdown files so that I can manage content independently from application code
- **As a content author**, I want to use standard markdown syntax so that I can leverage familiar writing tools and workflows
- **As a content author**, I want to include images and media in my posts so that I can create rich, engaging content

### Content Consumer
- **As a visitor**, I want to read blog posts and project details so that I can access the same content experience as before
- **As a visitor**, I want to see properly formatted content with images so that I can fully engage with the material

## Functional Requirements

1. **Content Directory Structure**: The system must create and maintain a `content/` directory with subdirectories for `blog-posts/` and `projects/`
2. **Markdown File Loading**: The system must dynamically load markdown files from the content directories at runtime
3. **Metadata Integration**: The system must maintain existing metadata in TypeScript files while loading content from markdown
4. **Media File Support**: The system must handle images and other media files referenced in markdown content
5. **Build Process Integration**: The system must automatically include new markdown files during the build process
6. **Error Handling**: The system must redirect users to a generic error page when content cannot be loaded
7. **Content Caching**: The system must implement appropriate caching for markdown content to maintain performance
8. **Markdown Processing**: The system must process markdown content using existing React Markdown components

## Non-Goals (Out of Scope)

- Real-time editing of markdown files
- Draft/unpublished post support
- Content management dashboard or admin interface
- User-generated content or comments
- Content versioning or history tracking
- Advanced content scheduling or publishing workflows

## Design Considerations

### Directory Structure
```
content/
├── blog-posts/
│   ├── getting-started-with-react.md
│   ├── typescript-best-practices.md
│   └── ...
└── projects/
    ├── personal-blog.md
    ├── ecommerce-app.md
    └── ...
```

### File Naming Convention
- Blog posts: `[slug].md` (e.g., `getting-started-with-react.md`)
- Projects: `[slug].md` (e.g., `personal-blog.md`)
- Slug must match the existing metadata in TypeScript files

### Content Format
- Standard markdown syntax with frontmatter support
- Images stored in `public/images/` directory
- Media files referenced using relative paths

## Technical Considerations

### Integration Points
- Must integrate with existing React Markdown components
- Must maintain compatibility with current routing system
- Must preserve existing SEO and meta tag functionality

### Performance Requirements
- Markdown content should be loaded efficiently without impacting page load times
- Consider implementing content preloading for frequently accessed posts
- Maintain existing code splitting and lazy loading patterns

### Build Process
- Vite build process must include content files in the final bundle
- Consider using Vite plugins for markdown processing if needed
- Ensure content is available in both development and production environments

## Success Metrics

1. **Content Separation**: 100% of blog post and project content is stored in separate markdown files
2. **Build Integration**: New markdown files are automatically included in builds without manual intervention
3. **Performance**: Page load times remain within 10% of current performance
4. **User Experience**: Visitors experience no degradation in content reading experience
5. **Error Handling**: Graceful fallback to error page for any content loading failures

## Open Questions

1. **Content Validation**: Should there be validation for markdown file format and required metadata?
2. **Image Optimization**: Should images be automatically optimized during the build process?
3. **Content Search**: How should the existing search functionality (if any) work with markdown content?
4. **Migration Strategy**: What is the plan for migrating existing content from TypeScript files to markdown?
5. **Content Backup**: Should there be automated backup or version control for markdown content files?

## Implementation Priority

1. **Phase 1**: Create content directory structure and markdown file format
2. **Phase 2**: Implement markdown loading and processing functionality
3. **Phase 3**: Update build process to include content files
4. **Phase 4**: Migrate existing content to markdown format
5. **Phase 5**: Testing and performance optimization
6. **Phase 6**: Error handling and edge case management
