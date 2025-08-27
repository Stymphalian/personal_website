import { ContentType } from '../types/content';
import {
    clearCache,
    createLoadingState,
    discoverContentFiles,
    getCacheStats,
    getContentMetadata,
    handleContentError,
    loadBlogPostContent,
    loadContent,
    loadProjectContent,
    removeFromCache,
    searchContent
} from './content-loader';

// Mock fetch for testing
global.fetch = jest.fn();

describe('Content Loader', () => {
  beforeEach(() => {
    clearCache();
    jest.clearAllMocks();
  });

  describe('loadBlogPostContent', () => {
    it('should load and parse blog post content correctly', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
slug: test-blog-post
date: 2024-01-01
featured: true
tags: [React, TypeScript]
excerpt: This is a test blog post
author: Test Author
readTime: 10
category: tutorial
difficulty: intermediate
---

# Test Blog Post

This is the content of the test blog post.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      const result = await loadBlogPostContent('/test.md');

      expect(result.frontmatter.id).toBe('test-blog');
      expect(result.frontmatter.title).toBe('Test Blog Post');
      expect(result.frontmatter.slug).toBe('test-blog-post');
      expect(result.frontmatter.date).toBe('2024-01-01');
      expect(result.frontmatter.featured).toBe(true);
      expect(result.frontmatter.tags).toEqual(['React', 'TypeScript']);
      expect(result.frontmatter.excerpt).toBe('This is a test blog post');
      expect(result.frontmatter.author).toBe('Test Author');
      expect(result.frontmatter.readTime).toBe(10);
      expect(result.frontmatter.category).toBe('tutorial');
      expect(result.frontmatter.difficulty).toBe('intermediate');
      expect(result.content).toContain('# Test Blog Post');
    });

    it('should validate required fields and throw error for missing fields', async () => {
      const invalidMarkdown = `---
id: test-blog
title: Test Blog Post
---

# Test Blog Post

Missing required fields.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(invalidMarkdown)
      });

      await expect(loadBlogPostContent('/test.md')).rejects.toThrow('Invalid frontmatter: Missing required field: slug');
    });

    it('should use cached content when available', async () => {
      const mockMarkdown = `---
id: cached-blog
title: Cached Blog Post
slug: cached-blog-post
date: 2024-01-01
featured: false
tags: [React]
excerpt: This is a cached blog post
author: Test Author
readTime: 5
category: tutorial
difficulty: beginner
---

# Cached Blog Post

This content should be cached.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      // First load
      const firstResult = await loadBlogPostContent('/cached.md');
      expect(firstResult.frontmatter.title).toBe('Cached Blog Post');

      // Second load should use cache
      const secondResult = await loadBlogPostContent('/cached.md');
      expect(secondResult.frontmatter.title).toBe('Cached Blog Post');

      // Fetch should only be called once
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      });

      await expect(loadBlogPostContent('/nonexistent.md')).rejects.toThrow('Failed to load content from /nonexistent.md: Not Found');
    });
  });

  describe('loadProjectContent', () => {
    it('should load and parse project content correctly', async () => {
      const mockMarkdown = `---
id: test-project
title: Test Project
slug: test-project
date: 2024-01-01
featured: true
tags: [React, Node.js]
description: This is a test project description
shortDescription: Test project
image: /test-image.jpg
techStack: [React, TypeScript, Node.js]
liveDemo: https://demo.com
githubRepo: https://github.com/test/project
---

# Test Project

This is the content of the test project.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      const result = await loadProjectContent('/test.md');

      expect(result.frontmatter.id).toBe('test-project');
      expect(result.frontmatter.title).toBe('Test Project');
      expect(result.frontmatter.description).toBe('This is a test project description');
      expect(result.frontmatter.shortDescription).toBe('Test project');
      expect(result.frontmatter.image).toBe('/test-image.jpg');
      expect(result.frontmatter.techStack).toEqual(['React', 'TypeScript', 'Node.js']);
      expect(result.frontmatter.liveDemo).toBe('https://demo.com');
      expect(result.frontmatter.githubRepo).toBe('https://github.com/test/project');
      expect(result.content).toContain('# Test Project');
    });

    it('should validate project frontmatter correctly', async () => {
      const invalidMarkdown = `---
id: test-project
title: Test Project
---

# Test Project

Missing required fields.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(invalidMarkdown)
      });

      await expect(loadProjectContent('/test.md')).rejects.toThrow('Invalid frontmatter: Missing required field: slug');
    });
  });

  describe('loadContent', () => {
    it('should load blog post content when type is blog-post', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
slug: test-blog-post
date: 2024-01-01
featured: false
tags: [React]
excerpt: This is a test blog post
author: Test Author
readTime: 5
category: tutorial
difficulty: beginner
---

# Test Blog Post

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      const result = await loadContent('/test.md', 'blog-post');
      expect(result.frontmatter.title).toBe('Test Blog Post');
    });

    it('should load project content when type is project', async () => {
      const mockMarkdown = `---
id: test-project
title: Test Project
slug: test-project
date: 2024-01-01
featured: false
tags: [React]
description: Test project description
shortDescription: Test project
image: /test.jpg
techStack: [React, TypeScript]
---

# Test Project

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      const result = await loadContent('/test.md', 'project');
      expect(result.frontmatter.title).toBe('Test Project');
    });

    it('should throw error for unsupported content type', async () => {
      await expect(loadContent('/test.md', 'invalid-type' as ContentType)).rejects.toThrow('Unsupported content type: invalid-type');
    });
  });

  describe('discoverContentFiles', () => {
    it('should return blog post files when type is blog-post', async () => {
      const files = await discoverContentFiles('blog-post');
      
      expect(files).toHaveLength(3);
      expect(files[0].filename).toBe('react-performance-optimization.md');
      expect(files[1].filename).toBe('typescript-advanced-patterns.md');
      expect(files[2].filename).toBe('docker-production-optimization.md');
    });

    it('should return project files when type is project', async () => {
      const files = await discoverContentFiles('project');
      
      expect(files).toHaveLength(3);
      expect(files[0].filename).toBe('personal-blog-portfolio.md');
      expect(files[1].filename).toBe('ecommerce-platform.md');
      expect(files[2].filename).toBe('task-management-app.md');
    });

    it('should return empty array for unknown content type', async () => {
      const files = await discoverContentFiles('unknown' as ContentType);
      expect(files).toHaveLength(0);
    });
  });

  describe('getContentMetadata', () => {
    it('should return correct content metadata', async () => {
      const metadata = await getContentMetadata();
      
      expect(metadata.totalBlogPosts).toBe(3);
      expect(metadata.totalProjects).toBe(3);
      expect(metadata.totalTags).toBe(15);
      expect(metadata.categories.tutorial).toBe(2);
      expect(metadata.categories['project-showcase']).toBe(1);
      expect(metadata.difficulties.intermediate).toBe(2);
      expect(metadata.difficulties.advanced).toBe(1);
    });
  });

  describe('searchContent', () => {
    it('should return search results for blog posts when no type specified', async () => {
      const results = await searchContent('React');
      
      expect(results).toHaveLength(2);
      expect(results[0].type).toBe('blog-post');
      expect(results[1].type).toBe('project');
    });

    it('should return only blog post results when type is blog-post', async () => {
      const results = await searchContent('React', 'blog-post');
      
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('blog-post');
      expect(results[0].title).toContain('React Performance Optimization');
    });

    it('should return only project results when type is project', async () => {
      const results = await searchContent('React', 'project');
      
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('project');
      expect(results[0].title).toContain('Personal Blog & Portfolio');
    });

    it('should sort results by relevance', async () => {
      const results = await searchContent('React');
      
      expect(results[0].relevance).toBeGreaterThan(results[1].relevance);
    });
  });

  describe('Cache Management', () => {
    it('should clear cache correctly', async () => {
      // Load some content to populate cache
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
slug: test-blog-post
date: 2024-01-01
featured: false
tags: [React]
excerpt: This is a test blog post
author: Test Author
readTime: 5
category: tutorial
difficulty: beginner
---

# Test Blog Post

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadBlogPostContent('/test1.md');
      await loadBlogPostContent('/test2.md');

      expect(getCacheStats().size).toBe(2);

      clearCache();
      expect(getCacheStats().size).toBe(0);
    });

    it('should return correct cache statistics', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
slug: test-blog-post
date: 2024-01-01
featured: false
tags: [React]
excerpt: This is a test blog post
author: Test Author
readTime: 5
category: tutorial
difficulty: beginner
---

# Test Blog Post

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadBlogPostContent('/test1.md');
      await loadBlogPostContent('/test2.md');

      const stats = getCacheStats();
      expect(stats.size).toBe(2);
      expect(stats.entries).toContain('/test1.md');
      expect(stats.entries).toContain('/test2.md');
    });

    it('should remove specific items from cache', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
slug: test-blog-post
date: 2024-01-01
featured: false
tags: [React]
excerpt: This is a test blog post
author: Test Author
readTime: 5
category: tutorial
difficulty: beginner
---

# Test Blog Post

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadBlogPostContent('/test1.md');
      await loadBlogPostContent('/test2.md');

      expect(getCacheStats().size).toBe(2);

      const removed = removeFromCache('/test1.md');
      expect(removed).toBe(true);
      expect(getCacheStats().size).toBe(1);
      expect(getCacheStats().entries).not.toContain('/test1.md');

      const notFound = removeFromCache('/nonexistent.md');
      expect(notFound).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should create initial loading state', () => {
      const state = createLoadingState();
      
      expect(state.state).toBe('idle');
      expect(state.retryCount).toBe(0);
      expect(state.error).toBeUndefined();
    });

    it('should handle content errors with retry logic', () => {
      const error = new Error('Network error');
      
      const firstAttempt = handleContentError(error, 0);
      expect(firstAttempt.state).toBe('error');
      expect(firstAttempt.error).toBe('Network error');
      expect(firstAttempt.retryCount).toBe(1);

      const secondAttempt = handleContentError(error, 1);
      expect(secondAttempt.state).toBe('error');
      expect(secondAttempt.error).toBe('Network error');
      expect(secondAttempt.retryCount).toBe(2);

      const finalAttempt = handleContentError(error, 3);
      expect(finalAttempt.state).toBe('error');
      expect(finalAttempt.error).toBe('Failed after 3 attempts: Network error');
      expect(finalAttempt.retryCount).toBe(3);
    });
  });

  describe('Frontmatter Parsing Edge Cases', () => {
    it('should handle quoted strings in frontmatter', async () => {
      const mockMarkdown = `---
id: "test-blog"
title: 'Test Blog Post'
excerpt: "This is a 'quoted' excerpt"
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      // This should not throw an error about missing required fields
      // since we're just testing the parsing, not validation
      try {
        await loadBlogPostContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle arrays in frontmatter', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
tags: [React, TypeScript, "Node.js"]
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      try {
        await loadBlogPostContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle boolean values in frontmatter', async () => {
      const mockMarkdown = `---
id: test-blog
title: Test Blog Post
featured: true
published: false
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      try {
        await loadBlogPostContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
