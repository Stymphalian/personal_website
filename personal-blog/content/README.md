# Content Management Guide

This directory contains all the markdown-based content for the personal blog and portfolio website.

## Directory Structure

```
content/
├── blog-posts/          # Blog post markdown files
├── projects/            # Project markdown files
└── README.md           # This documentation file
```

## Markdown File Format

All content files use a standardized frontmatter format followed by markdown content.

### Frontmatter Structure

#### Blog Posts
```yaml
---
id: 'unique-post-identifier'
title: 'Post Title'
slug: 'url-friendly-slug'
excerpt: 'Brief description of the post'
author: 'Author Name'
date: 'YYYY-MM-DD'
tags: ['tag1', 'tag2', 'tag3']
featured: true/false
readTime: number
category: 'tutorial' | 'project-showcase' | 'tech-review' | 'career-advice'
difficulty: 'beginner' | 'intermediate' | 'advanced'
---
```

#### Projects
```yaml
---
id: 'unique-project-identifier'
title: 'Project Title'
description: 'Full project description'
shortDescription: 'Brief project description'
image: '/path/to/image.jpg'
techStack: ['tech1', 'tech2', 'tech3']
featured: true/false
date: 'YYYY-MM-DD'
liveDemo: 'https://demo-url.com'
githubRepo: 'https://github.com/username/repo'
---
```

## File Naming Conventions

### Blog Posts
- Use kebab-case for filenames
- Include the slug in the filename
- Example: `react-performance-optimization.md`

### Projects
- Use kebab-case for filenames
- Include the project ID in the filename
- Example: `personal-blog-portfolio.md`

## Content Guidelines

### Blog Posts
- Start with a clear introduction
- Use descriptive headings (H2, H3)
- Include code examples with proper syntax highlighting
- Use bullet points and numbered lists for clarity
- End with a conclusion or summary
- Keep paragraphs concise (2-3 sentences max)

### Projects
- Start with a project overview
- Detail the tech stack and features
- Include code snippets and architecture diagrams
- Document the development process
- List future enhancements or roadmap
- Include links to live demos and source code

## Media Assets

### Images
- Store images in `public/images/`
- Use descriptive filenames
- Optimize images for web (compress, resize)
- Include alt text in markdown

### Code Examples
- Use triple backticks with language specification
- Include comments for clarity
- Keep examples focused and relevant
- Test all code examples before publishing

## Metadata Requirements

### Required Fields
- `id`: Unique identifier (used internally)
- `title`: Human-readable title
- `date`: Publication date (YYYY-MM-DD format)

### Optional Fields
- `featured`: Boolean for highlighting content
- `tags`: Array of relevant topics
- `category`: Content classification
- `difficulty`: Skill level requirement

## Content Updates

### Adding New Content
1. Create new markdown file in appropriate directory
2. Follow frontmatter format exactly
3. Use consistent markdown formatting
4. Test content rendering
5. Update relevant index files

### Updating Existing Content
1. Maintain frontmatter structure
2. Update date if content is significantly changed
3. Preserve existing URLs and slugs
4. Test changes in development environment

## Best Practices

### Writing Style
- Use clear, concise language
- Write for developers and tech enthusiasts
- Include practical examples and use cases
- Maintain consistent tone and voice

### Technical Content
- Explain complex concepts step-by-step
- Include real-world examples
- Reference official documentation when appropriate
- Keep code examples simple and focused

### SEO Considerations
- Use descriptive titles and headings
- Include relevant keywords naturally
- Write compelling excerpts
- Use proper heading hierarchy (H1 → H2 → H3)

## Validation

Before publishing content:
- [ ] Frontmatter is properly formatted
- [ ] All required fields are present
- [ ] Markdown syntax is correct
- [ ] Links are working
- [ ] Images are optimized and accessible
- [ ] Content renders correctly in the application
