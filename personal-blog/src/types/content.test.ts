import {
    BaseContent,
    BlogPostContent,
    BlogPostFrontmatter,
    ContentCache,
    ContentFile,
    ContentLoaderOptions,
    ContentLoadingState,
    ContentLoadingStateData,
    ContentMetadata,
    ContentSearchResult,
    ContentType,
    ContentUnion,
    ContentValidationResult,
    ProjectContent,
    ProjectFrontmatter,
    REQUIRED_BLOG_POST_FIELDS,
    REQUIRED_PROJECT_FIELDS
} from './content';

describe('Content Types', () => {
  describe('BaseContent interface', () => {
    it('should have all required base fields', () => {
      const baseContent: BaseContent = {
        id: 'test-id',
        title: 'Test Title',
        slug: 'test-slug',
        date: '2024-01-01',
        featured: false,
        tags: ['test', 'example']
      };

      expect(baseContent.id).toBe('test-id');
      expect(baseContent.title).toBe('Test Title');
      expect(baseContent.slug).toBe('test-slug');
      expect(baseContent.date).toBe('2024-01-01');
      expect(baseContent.featured).toBe(false);
      expect(baseContent.tags).toEqual(['test', 'example']);
    });
  });

  describe('BlogPostFrontmatter interface', () => {
    it('should extend BaseContent and have blog-specific fields', () => {
      const blogPost: BlogPostFrontmatter = {
        id: 'blog-post-1',
        title: 'Blog Post Title',
        slug: 'blog-post-slug',
        date: '2024-01-01',
        featured: true,
        tags: ['React', 'TypeScript'],
        excerpt: 'This is a blog post excerpt',
        author: 'Jordan Yu',
        readTime: 10,
        category: 'tutorial',
        difficulty: 'intermediate'
      };

      expect(blogPost.excerpt).toBe('This is a blog post excerpt');
      expect(blogPost.author).toBe('Jordan Yu');
      expect(blogPost.readTime).toBe(10);
      expect(blogPost.category).toBe('tutorial');
      expect(blogPost.difficulty).toBe('intermediate');
    });
  });

  describe('ProjectFrontmatter interface', () => {
    it('should extend BaseContent and have project-specific fields', () => {
      const project: ProjectFrontmatter = {
        id: 'project-1',
        title: 'Project Title',
        slug: 'project-slug',
        date: '2024-01-01',
        featured: true,
        tags: ['React', 'Node.js'],
        description: 'This is a project description',
        shortDescription: 'Short project description',
        image: '/project-image.jpg',
        techStack: ['React', 'TypeScript', 'Node.js'],
        liveDemo: 'https://demo.com',
        githubRepo: 'https://github.com/example/project'
      };

      expect(project.description).toBe('This is a project description');
      expect(project.shortDescription).toBe('Short project description');
      expect(project.image).toBe('/project-image.jpg');
      expect(project.techStack).toEqual(['React', 'TypeScript', 'Node.js']);
      expect(project.liveDemo).toBe('https://demo.com');
      expect(project.githubRepo).toBe('https://github.com/example/project');
    });
  });

  describe('BlogPostContent interface', () => {
    it('should contain frontmatter and content', () => {
      const blogPostContent: BlogPostContent = {
        frontmatter: {
          id: 'blog-1',
          title: 'Blog Title',
          slug: 'blog-slug',
          date: '2024-01-01',
          featured: false,
          tags: ['test'],
          excerpt: 'Excerpt',
          author: 'Author',
          readTime: 5,
          category: 'tutorial',
          difficulty: 'beginner'
        },
        content: '# Blog Post Content\n\nThis is the markdown content.'
      };

      expect(blogPostContent.frontmatter.title).toBe('Blog Title');
      expect(blogPostContent.content).toContain('# Blog Post Content');
    });
  });

  describe('ProjectContent interface', () => {
    it('should contain frontmatter and content', () => {
      const projectContent: ProjectContent = {
        frontmatter: {
          id: 'project-1',
          title: 'Project Title',
          slug: 'project-slug',
          date: '2024-01-01',
          featured: true,
          tags: ['React'],
          description: 'Project description',
          shortDescription: 'Short description',
          image: '/image.jpg',
          techStack: ['React', 'TypeScript']
        },
        content: '# Project Content\n\nThis is the project markdown content.'
      };

      expect(projectContent.frontmatter.title).toBe('Project Title');
      expect(projectContent.content).toContain('# Project Content');
    });
  });

  describe('ContentFile interface', () => {
    it('should have file metadata properties', () => {
      const contentFile: ContentFile = {
        path: '/content/blog-posts/test.md',
        filename: 'test.md',
        lastModified: new Date('2024-01-01'),
        size: 1024
      };

      expect(contentFile.path).toBe('/content/blog-posts/test.md');
      expect(contentFile.filename).toBe('test.md');
      expect(contentFile.lastModified).toEqual(new Date('2024-01-01'));
      expect(contentFile.size).toBe(1024);
    });
  });

  describe('ContentCache interface', () => {
    it('should support caching content with timestamps', () => {
      const cache: ContentCache = {
        'blog-1': {
          content: {
            frontmatter: {
              id: 'blog-1',
              title: 'Blog Title',
              slug: 'blog-slug',
              date: '2024-01-01',
              featured: false,
              tags: ['test'],
              excerpt: 'Excerpt',
              author: 'Author',
              readTime: 5,
              category: 'tutorial',
              difficulty: 'beginner'
            },
            content: 'Content'
          },
          timestamp: Date.now(),
          expiresAt: Date.now() + 3600000 // 1 hour
        }
      };

      expect(cache['blog-1'].content.frontmatter.id).toBe('blog-1');
      expect(cache['blog-1'].timestamp).toBeLessThanOrEqual(Date.now());
      expect(cache['blog-1'].expiresAt).toBeGreaterThan(Date.now());
    });
  });

  describe('ContentLoaderOptions interface', () => {
    it('should have optional configuration properties', () => {
      const options: ContentLoaderOptions = {
        cacheEnabled: true,
        cacheExpiry: 3600000,
        parseMarkdown: true,
        validateFrontmatter: true
      };

      expect(options.cacheEnabled).toBe(true);
      expect(options.cacheExpiry).toBe(3600000);
      expect(options.parseMarkdown).toBe(true);
      expect(options.validateFrontmatter).toBe(true);
    });

    it('should work with partial options', () => {
      const partialOptions: ContentLoaderOptions = {
        cacheEnabled: true
      };

      expect(partialOptions.cacheEnabled).toBe(true);
      expect(partialOptions.cacheExpiry).toBeUndefined();
    });
  });

  describe('ContentValidationResult interface', () => {
    it('should contain validation status and messages', () => {
      const validResult: ContentValidationResult = {
        isValid: true,
        errors: [],
        warnings: ['Consider adding more tags']
      };

      const invalidResult: ContentValidationResult = {
        isValid: false,
        errors: ['Missing required field: excerpt'],
        warnings: []
      };

      expect(validResult.isValid).toBe(true);
      expect(validResult.errors).toHaveLength(0);
      expect(validResult.warnings).toHaveLength(1);

      expect(invalidResult.isValid).toBe(false);
      expect(invalidResult.errors).toHaveLength(1);
      expect(invalidResult.warnings).toHaveLength(0);
    });
  });

  describe('ContentSearchResult interface', () => {
    it('should contain search result data with relevance scoring', () => {
      const searchResult: ContentSearchResult = {
        type: 'blog-post',
        id: 'blog-1',
        title: 'Blog Title',
        excerpt: 'Blog excerpt',
        tags: ['React', 'TypeScript'],
        relevance: 0.85
      };

      expect(searchResult.type).toBe('blog-post');
      expect(searchResult.id).toBe('blog-1');
      expect(searchResult.title).toBe('Blog Title');
      expect(searchResult.excerpt).toBe('Blog excerpt');
      expect(searchResult.tags).toEqual(['React', 'TypeScript']);
      expect(searchResult.relevance).toBe(0.85);
    });
  });

  describe('ContentMetadata interface', () => {
    it('should contain content statistics and metadata', () => {
      const metadata: ContentMetadata = {
        totalBlogPosts: 10,
        totalProjects: 5,
        totalTags: 25,
        lastUpdated: new Date('2024-01-01'),
        categories: {
          tutorial: 5,
          'project-showcase': 3,
          'tech-review': 2
        },
        difficulties: {
          beginner: 3,
          intermediate: 5,
          advanced: 2
        }
      };

      expect(metadata.totalBlogPosts).toBe(10);
      expect(metadata.totalProjects).toBe(5);
      expect(metadata.totalTags).toBe(25);
      expect(metadata.lastUpdated).toEqual(new Date('2024-01-01'));
      expect(metadata.categories.tutorial).toBe(5);
      expect(metadata.difficulties.intermediate).toBe(5);
    });
  });

  describe('Utility types', () => {
    it('should support ContentType union', () => {
      const blogType: ContentType = 'blog-post';
      const projectType: ContentType = 'project';

      expect(blogType).toBe('blog-post');
      expect(projectType).toBe('project');
    });

    it('should support ContentUnion type', () => {
      const content: ContentUnion = {
        frontmatter: {
          id: 'blog-1',
          title: 'Blog Title',
          slug: 'blog-slug',
          date: '2024-01-01',
          featured: false,
          tags: ['test'],
          excerpt: 'Excerpt',
          author: 'Author',
          readTime: 5,
          category: 'tutorial',
          difficulty: 'beginner'
        },
        content: 'Content'
      };

      expect(content.frontmatter.id).toBe('blog-1');
      expect(content.content).toBe('Content');
    });
  });

  describe('Required fields constants', () => {
    it('should define required blog post fields', () => {
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('id');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('title');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('slug');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('date');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('featured');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('tags');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('excerpt');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('author');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('readTime');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('category');
      expect(REQUIRED_BLOG_POST_FIELDS).toContain('difficulty');
      expect(REQUIRED_BLOG_POST_FIELDS).toHaveLength(11);
    });

    it('should define required project fields', () => {
      expect(REQUIRED_PROJECT_FIELDS).toContain('id');
      expect(REQUIRED_PROJECT_FIELDS).toContain('title');
      expect(REQUIRED_PROJECT_FIELDS).toContain('slug');
      expect(REQUIRED_PROJECT_FIELDS).toContain('date');
      expect(REQUIRED_PROJECT_FIELDS).toContain('featured');
      expect(REQUIRED_PROJECT_FIELDS).toContain('tags');
      expect(REQUIRED_PROJECT_FIELDS).toContain('description');
      expect(REQUIRED_PROJECT_FIELDS).toContain('shortDescription');
      expect(REQUIRED_PROJECT_FIELDS).toContain('image');
      expect(REQUIRED_PROJECT_FIELDS).toContain('techStack');
      expect(REQUIRED_PROJECT_FIELDS).toContain('showDetails');
      expect(REQUIRED_PROJECT_FIELDS).toHaveLength(11);
    });
  });

  describe('ContentLoadingState types', () => {
    it('should support all loading states', () => {
      const states: ContentLoadingState[] = ['idle', 'loading', 'loaded', 'error'];
      
      expect(states).toContain('idle');
      expect(states).toContain('loading');
      expect(states).toContain('loaded');
      expect(states).toContain('error');
    });

    it('should work with ContentLoadingStateData interface', () => {
      const loadingData: ContentLoadingStateData = {
        state: 'loading',
        retryCount: 0
      };

      const errorData: ContentLoadingStateData = {
        state: 'error',
        error: 'Failed to load content',
        retryCount: 3
      };

      expect(loadingData.state).toBe('loading');
      expect(loadingData.retryCount).toBe(0);
      expect(errorData.state).toBe('error');
      expect(errorData.error).toBe('Failed to load content');
      expect(errorData.retryCount).toBe(3);
    });
  });
});



