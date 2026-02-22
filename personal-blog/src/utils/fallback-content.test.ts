import {
  generateFallbackContent,
  generateFallbackProject,
  getFallbackOptionsFromError,
  shouldUseFallback,
  type FallbackContentOptions
} from './fallback-content';

describe('Fallback Content Utility', () => {
  describe('generateFallbackProject', () => {
    it('generates fallback project with not-found error', () => {
      const options: FallbackContentOptions = {
        contentType: 'project',
        errorType: 'not-found',
        originalSlug: 'test-project'
      };

      const result = generateFallbackProject(options);

      expect(result.frontmatter.id).toBe('fallback-test-project');
      expect(result.frontmatter.title).toBe('Project Not Found');
      expect(result.frontmatter.description).toBe('The project you\'re looking for doesn\'t exist.');
      expect(result.frontmatter.techStack).toContain('Error Handling');
      expect(result.frontmatter.techStack).toContain('Fallback System');
    });

    it('generates fallback project with generic error', () => {
      const options: FallbackContentOptions = {
        contentType: 'project',
        errorType: 'generic',
        customMessage: 'Something went wrong'
      };

      const result = generateFallbackProject(options);

      expect(result.frontmatter.title).toBe('Content Loading Error');
      expect(result.content).toContain('Something went wrong');
      expect(result.content).toContain('Try refreshing the page');
    });
  });

  describe('generateFallbackContent', () => {
    it('generates project fallback for project type', () => {
      const options: FallbackContentOptions = {
        contentType: 'project',
        errorType: 'network-error'
      };

      const result = generateFallbackContent(options);

      expect(result.frontmatter.id).toContain('fallback');
      if ('techStack' in result.frontmatter) {
        expect(result.frontmatter.techStack).toContain('Error Handling');
      }
    });

    it('throws error for unsupported content type', () => {
      const options = {
        contentType: 'invalid-type' as any,
        errorType: 'generic' as const
      };

      expect(() => generateFallbackContent(options)).toThrow('Unsupported content type: invalid-type');
    });
  });

  describe('shouldUseFallback', () => {
    it('returns true when content is null', () => {
      const result = shouldUseFallback(null, null, 'idle');
      expect(result).toBe(true);
    });

    it('returns true when there is an error', () => {
      const mockContent = { frontmatter: { id: 'test' }, content: 'test' } as any;
      const error = new Error('Test error');
      const result = shouldUseFallback(mockContent, error, 'idle');
      expect(result).toBe(true);
    });

    it('returns true when loading state is error', () => {
      const mockContent = { frontmatter: { id: 'test' }, content: 'test' } as any;
      const result = shouldUseFallback(mockContent, null, 'error');
      expect(result).toBe(true);
    });

    it('returns false when content exists and no error', () => {
      const mockContent = { frontmatter: { id: 'test' }, content: 'test' } as any;
      const result = shouldUseFallback(mockContent, null, 'loaded');
      expect(result).toBe(false);
    });
  });

  describe('getFallbackOptionsFromError', () => {
    it('identifies not-found errors', () => {
      const error = new Error('Failed to load content from /test.md: Not Found');
      const result = getFallbackOptionsFromError(error, 'project', 'test-project');

      expect(result.errorType).toBe('not-found');
      expect(result.contentType).toBe('project');
      expect(result.originalSlug).toBe('test-project');
      expect(result.customMessage).toBe('Failed to load content from /test.md: Not Found');
    });

    it('identifies network errors', () => {
      const error = new Error('Failed to fetch');
      const result = getFallbackOptionsFromError(error, 'project', 'test-project');

      expect(result.errorType).toBe('network-error');
      expect(result.contentType).toBe('project');
      expect(result.originalSlug).toBe('test-project');
    });

    it('identifies malformed content errors', () => {
      const error = new Error('Invalid frontmatter: Missing required field: title');
      const result = getFallbackOptionsFromError(error, 'project');

      expect(result.errorType).toBe('malformed-content');
      expect(result.contentType).toBe('project');
    });

    it('defaults to generic error for unknown error types', () => {
      const error = new Error('Unknown error message');
      const result = getFallbackOptionsFromError(error, 'project');

      expect(result.errorType).toBe('generic');
      expect(result.contentType).toBe('project');
    });

    it('handles errors without slug parameter', () => {
      const error = new Error('Test error');
      const result = getFallbackOptionsFromError(error, 'project');

      expect(result.originalSlug).toBeUndefined();
      expect(result.errorType).toBe('generic');
    });
  });

  describe('Fallback content structure', () => {
    it('generates valid project frontmatter structure', () => {
      const options: FallbackContentOptions = {
        contentType: 'project',
        errorType: 'network-error'
      };

      const result = generateFallbackProject(options);

      expect(result.frontmatter).toHaveProperty('id');
      expect(result.frontmatter).toHaveProperty('title');
      expect(result.frontmatter).toHaveProperty('slug');
      expect(result.frontmatter).toHaveProperty('description');
      expect(result.frontmatter).toHaveProperty('shortDescription');
      expect(result.frontmatter).toHaveProperty('image');
      expect(result.frontmatter).toHaveProperty('techStack');
      expect(result.frontmatter).toHaveProperty('featured');
      expect(result.frontmatter).toHaveProperty('date');
      expect(result.frontmatter).toHaveProperty('tags');
      expect(result.frontmatter).toHaveProperty('liveDemo');
      expect(result.frontmatter).toHaveProperty('githubRepo');
    });

    it('generates content with proper markdown structure', () => {
      const options: FallbackContentOptions = {
        contentType: 'project',
        errorType: 'generic'
      };

      const result = generateFallbackProject(options);

      expect(result.content).toContain('# ');
      expect(result.content).toContain('## ');
      expect(result.content).toContain('- ');
      expect(result.content).toContain('---');
      expect(result.content).toContain('*This is a fallback page');
    });
  });
});
