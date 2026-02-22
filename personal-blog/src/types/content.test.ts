import type {
  BaseContent,
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
} from './content';
import { REQUIRED_PROJECT_FIELDS } from './content';

describe('Content Types', () => {
  describe('BaseContent interface', () => {
    it('should have all required base fields', () => {
      const baseContent: BaseContent = {
        id: 'test-id',
        title: 'Test Title',
        slug: 'test-slug',
        date: '2024-01-01',
        featured: false,
        tags: ['test', 'example'],
      };

      expect(baseContent.id).toBe('test-id');
      expect(baseContent.title).toBe('Test Title');
      expect(baseContent.slug).toBe('test-slug');
      expect(baseContent.date).toBe('2024-01-01');
      expect(baseContent.featured).toBe(false);
      expect(baseContent.tags).toEqual(['test', 'example']);
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
        githubRepo: 'https://github.com/example/project',
        showDetails: true,
      };

      expect(project.description).toBe('This is a project description');
      expect(project.shortDescription).toBe('Short project description');
      expect(project.image).toBe('/project-image.jpg');
      expect(project.techStack).toEqual(['React', 'TypeScript', 'Node.js']);
      expect(project.liveDemo).toBe('https://demo.com');
      expect(project.githubRepo).toBe('https://github.com/example/project');
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
          techStack: ['React', 'TypeScript'],
          showDetails: true,
        },
        content: '# Project Content\n\nThis is the project markdown content.',
      };

      expect(projectContent.frontmatter.title).toBe('Project Title');
      expect(projectContent.content).toContain('# Project Content');
    });
  });

  describe('ContentFile interface', () => {
    it('should have file metadata properties', () => {
      const contentFile: ContentFile = {
        path: '/content/projects/test.md',
        filename: 'test.md',
        lastModified: new Date('2024-01-01'),
        size: 1024,
      };

      expect(contentFile.path).toBe('/content/projects/test.md');
      expect(contentFile.filename).toBe('test.md');
      expect(contentFile.lastModified).toEqual(new Date('2024-01-01'));
      expect(contentFile.size).toBe(1024);
    });
  });

  describe('ContentCache interface', () => {
    it('should support caching content with timestamps', () => {
      const cache: ContentCache = {
        'project-1': {
          content: {
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
              techStack: ['React', 'TypeScript'],
              showDetails: true,
            },
            content: 'Content',
          },
          timestamp: Date.now(),
          expiresAt: Date.now() + 3600000, // 1 hour
        },
      };

      expect(cache['project-1'].content.frontmatter.id).toBe('project-1');
      expect(cache['project-1'].timestamp).toBeLessThanOrEqual(Date.now());
      expect(cache['project-1'].expiresAt).toBeGreaterThan(Date.now());
    });
  });

  describe('ContentLoaderOptions interface', () => {
    it('should have optional configuration properties', () => {
      const options: ContentLoaderOptions = {
        cacheEnabled: true,
        cacheExpiry: 3600000,
        parseMarkdown: true,
        validateFrontmatter: true,
      };

      expect(options.cacheEnabled).toBe(true);
      expect(options.cacheExpiry).toBe(3600000);
      expect(options.parseMarkdown).toBe(true);
      expect(options.validateFrontmatter).toBe(true);
    });

    it('should work with partial options', () => {
      const partialOptions: ContentLoaderOptions = {
        cacheEnabled: true,
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
        warnings: ['Consider adding more tags'],
      };

      const invalidResult: ContentValidationResult = {
        isValid: false,
        errors: ['Missing required field: description'],
        warnings: [],
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
        type: 'project',
        id: 'project-1',
        title: 'Project Title',
        description: 'Project description',
        tags: ['React', 'TypeScript'],
        relevance: 0.85,
      };

      expect(searchResult.type).toBe('project');
      expect(searchResult.id).toBe('project-1');
      expect(searchResult.title).toBe('Project Title');
      expect(searchResult.tags).toEqual(['React', 'TypeScript']);
      expect(searchResult.relevance).toBe(0.85);
    });
  });

  describe('ContentMetadata interface', () => {
    it('should contain content statistics and metadata', () => {
      const metadata: ContentMetadata = {
        totalProjects: 5,
        totalTags: 25,
        lastUpdated: new Date('2024-01-01'),
      };

      expect(metadata.totalProjects).toBe(5);
      expect(metadata.totalTags).toBe(25);
      expect(metadata.lastUpdated).toEqual(new Date('2024-01-01'));
    });
  });

  describe('Utility types', () => {
    it('should support ContentType as project', () => {
      const projectType: ContentType = 'project';
      expect(projectType).toBe('project');
    });

    it('should support ContentUnion type', () => {
      const content: ContentUnion = {
        frontmatter: {
          id: 'project-1',
          title: 'Project Title',
          slug: 'project-slug',
          date: '2024-01-01',
          featured: false,
          tags: ['test'],
          description: 'Description',
          shortDescription: 'Short',
          image: '/image.jpg',
          techStack: ['React'],
          showDetails: true,
        },
        content: 'Content',
      };

      expect(content.frontmatter.id).toBe('project-1');
      expect(content.content).toBe('Content');
    });
  });

  describe('Required fields constants', () => {
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
      const states: ContentLoadingState[] = [
        'idle',
        'loading',
        'loaded',
        'error',
      ];

      expect(states).toContain('idle');
      expect(states).toContain('loading');
      expect(states).toContain('loaded');
      expect(states).toContain('error');
    });

    it('should work with ContentLoadingStateData interface', () => {
      const loadingData: ContentLoadingStateData = {
        state: 'loading',
        retryCount: 0,
      };

      const errorData: ContentLoadingStateData = {
        state: 'error',
        error: 'Failed to load content',
        retryCount: 3,
      };

      expect(loadingData.state).toBe('loading');
      expect(loadingData.retryCount).toBe(0);
      expect(errorData.state).toBe('error');
      expect(errorData.error).toBe('Failed to load content');
      expect(errorData.retryCount).toBe(3);
    });
  });
});
