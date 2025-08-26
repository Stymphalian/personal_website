import {
    blogPosts,
    getAllTags,
    getFeaturedPosts,
    getPostBySlug,
    getPostsByAuthor,
    getPostsByCategory,
    getPostsByDifficulty,
    getPostsByTag,
    getRecentPosts,
    searchPosts
} from './blog-posts';

describe('Blog Posts Data Structure', () => {
  describe('BlogPost Interface', () => {
    it('should have all required properties', () => {
      const post = blogPosts[0];
      
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('author');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('featured');
      expect(post).toHaveProperty('readTime');
      expect(post).toHaveProperty('category');
      expect(post).toHaveProperty('difficulty');
    });

    it('should have valid category values', () => {
      const validCategories = ['tutorial', 'project-showcase', 'tech-review', 'career-advice'];
      
      blogPosts.forEach(post => {
        expect(validCategories).toContain(post.category);
      });
    });

    it('should have valid difficulty values', () => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      
      blogPosts.forEach(post => {
        expect(validDifficulties).toContain(post.difficulty);
      });
    });

    it('should have valid date format', () => {
      blogPosts.forEach(post => {
        const date = new Date(post.date);
        expect(date.toString()).not.toBe('Invalid Date');
      });
    });

    it('should have positive read time', () => {
      blogPosts.forEach(post => {
        expect(post.readTime).toBeGreaterThan(0);
      });
    });

    it('should have non-empty tags array', () => {
      blogPosts.forEach(post => {
        expect(post.tags).toBeInstanceOf(Array);
        expect(post.tags.length).toBeGreaterThan(0);
        post.tags.forEach(tag => {
          expect(typeof tag).toBe('string');
          expect(tag.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Blog Posts Data', () => {
    it('should have at least 3 blog posts', () => {
      expect(blogPosts.length).toBeGreaterThanOrEqual(3);
    });

    it('should have unique IDs', () => {
      const ids = blogPosts.map(post => post.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique slugs', () => {
      const slugs = blogPosts.map(post => post.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have at least one featured post', () => {
      const featuredPosts = blogPosts.filter(post => post.featured);
      expect(featuredPosts.length).toBeGreaterThan(0);
    });
  });

  describe('getFeaturedPosts', () => {
    it('should return only featured posts', () => {
      const featuredPosts = getFeaturedPosts();
      
      featuredPosts.forEach(post => {
        expect(post.featured).toBe(true);
      });
    });

    it('should return correct number of featured posts', () => {
      const featuredPosts = getFeaturedPosts();
      const expectedCount = blogPosts.filter(post => post.featured).length;
      expect(featuredPosts.length).toBe(expectedCount);
    });
  });

  describe('getPostBySlug', () => {
    it('should return post with matching slug', () => {
      const post = getPostBySlug('react-performance-optimization');
      expect(post).toBeDefined();
      expect(post?.slug).toBe('react-performance-optimization');
    });

    it('should return undefined for non-existent slug', () => {
      const post = getPostBySlug('non-existent-slug');
      expect(post).toBeUndefined();
    });

    it('should handle case-sensitive slug matching', () => {
      const post = getPostBySlug('REACT-PERFORMANCE-OPTIMIZATION');
      expect(post).toBeUndefined();
    });
  });

  describe('getPostsByTag', () => {
    it('should return posts with matching tag', () => {
      const reactPosts = getPostsByTag('React');
      expect(reactPosts.length).toBeGreaterThan(0);
      
      reactPosts.forEach(post => {
        expect(post.tags).toContain('React');
      });
    });

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('NonExistentTag');
      expect(posts).toEqual([]);
    });

    it('should handle case-sensitive tag matching', () => {
      const posts = getPostsByTag('react');
      expect(posts).toEqual([]);
    });
  });

  describe('getPostsByCategory', () => {
    it('should return posts with matching category', () => {
      const tutorialPosts = getPostsByCategory('tutorial');
      expect(tutorialPosts.length).toBeGreaterThan(0);
      
      tutorialPosts.forEach(post => {
        expect(post.category).toBe('tutorial');
      });
    });

    it('should return empty array for non-existent category', () => {
      const posts = getPostsByCategory('non-existent-category' as any);
      expect(posts).toEqual([]);
    });
  });

  describe('getPostsByDifficulty', () => {
    it('should return posts with matching difficulty', () => {
      const intermediatePosts = getPostsByDifficulty('intermediate');
      expect(intermediatePosts.length).toBeGreaterThan(0);
      
      intermediatePosts.forEach(post => {
        expect(post.difficulty).toBe('intermediate');
      });
    });

    it('should return empty array for non-existent difficulty', () => {
      const posts = getPostsByDifficulty('non-existent-difficulty' as any);
      expect(posts).toEqual([]);
    });
  });

  describe('searchPosts', () => {
    it('should find posts by title', () => {
      const results = searchPosts('React Performance');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(post => post.title.includes('React Performance'))).toBe(true);
    });

    it('should find posts by excerpt', () => {
      const results = searchPosts('useMemo');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(post => post.excerpt.includes('useMemo'))).toBe(true);
    });

    it('should find posts by tags', () => {
      const results = searchPosts('TypeScript');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(post => post.tags.includes('TypeScript'))).toBe(true);
    });

    it('should be case-insensitive', () => {
      const results = searchPosts('react');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for no matches', () => {
      const results = searchPosts('xyz123nonexistent');
      expect(results).toEqual([]);
    });
  });

  describe('getRecentPosts', () => {
    it('should return posts sorted by date (newest first)', () => {
      const recentPosts = getRecentPosts(3);
      expect(recentPosts.length).toBeLessThanOrEqual(3);
      
      for (let i = 0; i < recentPosts.length - 1; i++) {
        const currentDate = new Date(recentPosts[i].date);
        const nextDate = new Date(recentPosts[i + 1].date);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should respect limit parameter', () => {
      const recentPosts = getRecentPosts(2);
      expect(recentPosts.length).toBeLessThanOrEqual(2);
    });

    it('should default to 5 posts when no limit specified', () => {
      const recentPosts = getRecentPosts();
      expect(recentPosts.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getAllTags', () => {
    it('should return unique tags', () => {
      const tags = getAllTags();
      const uniqueTags = new Set(tags);
      expect(uniqueTags.size).toBe(tags.length);
    });

    it('should return tags in alphabetical order', () => {
      const tags = getAllTags();
      const sortedTags = [...tags].sort();
      expect(tags).toEqual(sortedTags);
    });

    it('should include tags from all posts', () => {
      const tags = getAllTags();
      const allPostTags = new Set<string>();
      
      blogPosts.forEach(post => {
        post.tags.forEach(tag => allPostTags.add(tag));
      });
      
      expect(tags.length).toBe(allPostTags.size);
    });
  });

  describe('getPostsByAuthor', () => {
    it('should return posts by specific author', () => {
      const authorPosts = getPostsByAuthor('Jordan Yu');
      expect(authorPosts.length).toBeGreaterThan(0);
      
      authorPosts.forEach(post => {
        expect(post.author).toBe('Jordan Yu');
      });
    });

    it('should return empty array for non-existent author', () => {
      const posts = getPostsByAuthor('Non Existent Author');
      expect(posts).toEqual([]);
    });
  });

  describe('Content Quality', () => {
    it('should have meaningful content length', () => {
      blogPosts.forEach(post => {
        expect(post.content.length).toBeGreaterThan(100);
      });
    });

    it('should have descriptive excerpts', () => {
      blogPosts.forEach(post => {
        expect(post.excerpt.length).toBeGreaterThan(20);
        expect(post.excerpt.length).toBeLessThan(200);
      });
    });

    it('should have reasonable read times', () => {
      blogPosts.forEach(post => {
        expect(post.readTime).toBeGreaterThan(0);
        expect(post.readTime).toBeLessThan(60); // Should not take more than an hour to read
      });
    });
  });
});
