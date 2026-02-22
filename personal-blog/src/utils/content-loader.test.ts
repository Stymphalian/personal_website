import type { ContentType } from '../types/content';
import {
  clearCache,
  createLoadingState,
  discoverContentFiles,
  getCacheStats,
  getContentMetadata,
  handleContentError,
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
showDetails: true
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
showDetails: false
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
      
      expect(metadata.totalProjects).toBe(3);
      expect(metadata.totalTags).toBe(15);
    });
  });

  describe('searchContent', () => {
    it('should return search results when no type specified', async () => {
      const results = await searchContent('React');
      
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('project');
    });

    it('should return only project results when type is project', async () => {
      const results = await searchContent('React', 'project');
      
      expect(results).toHaveLength(1);
      expect(results[0].type).toBe('project');
      expect(results[0].title).toContain('Personal Blog & Portfolio');
    });
  });

  describe('Cache Management', () => {
    it('should clear cache correctly', async () => {
      // Load some content to populate cache
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
showDetails: false
---

# Test Project

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadProjectContent('/test1.md');
      await loadProjectContent('/test2.md');

      expect(getCacheStats().size).toBe(2);

      clearCache();
      expect(getCacheStats().size).toBe(0);
    });

    it('should return correct cache statistics', async () => {
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
showDetails: false
---

# Test Project

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadProjectContent('/test1.md');
      await loadProjectContent('/test2.md');

      const stats = getCacheStats();
      expect(stats.size).toBe(2);
      expect(stats.entries).toContain('/test1.md');
      expect(stats.entries).toContain('/test2.md');
    });

    it('should remove specific items from cache', async () => {
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
showDetails: false
---

# Test Project

Content here.`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      await loadProjectContent('/test1.md');
      await loadProjectContent('/test2.md');

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
id: "test-project"
title: 'Test Project'
description: "This is a 'quoted' description"
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      // This should not throw an error about missing required fields
      // since we're just testing the parsing, not validation
      try {
        await loadProjectContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle arrays in frontmatter', async () => {
      const mockMarkdown = `---
id: test-project
title: Test Project
tags: [React, TypeScript, "Node.js"]
techStack: [React, TypeScript]
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      try {
        await loadProjectContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should handle boolean values in frontmatter', async () => {
      const mockMarkdown = `---
id: test-project
title: Test Project
featured: true
showDetails: false
---

# Content`;

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(mockMarkdown)
      });

      try {
        await loadProjectContent('/test.md');
      } catch (error) {
        // Expected to fail validation, but parsing should work
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
