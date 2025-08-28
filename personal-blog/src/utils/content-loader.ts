// Content loader utility for markdown-based content management
// Handles dynamic file loading, frontmatter parsing, and content caching

import type {
  BlogPostContent,
  BlogPostFrontmatter,
  ContentCache,
  ContentFile,
  ContentLoaderOptions,
  ContentLoadingStateData,
  ContentMetadata,
  ContentSearchResult,
  ContentType,
  ContentUnion,
  ContentValidationResult,
  ProjectContent,
  ProjectFrontmatter
} from '../types/content';
import { REQUIRED_BLOG_POST_FIELDS, REQUIRED_PROJECT_FIELDS } from '../types/content';
import { getContentStats, parseMarkdown, validateMarkdownContent } from './markdown';

// Default options for content loading
const DEFAULT_OPTIONS: Required<ContentLoaderOptions> = {
  cacheEnabled: true,
  cacheExpiry: 3600000, // 1 hour
  parseMarkdown: false,
  validateFrontmatter: true
};

// Content cache for performance optimization
let contentCache: ContentCache = {};

// Frontmatter parsing utilities
const parseFrontmatter = (content: string): { frontmatter: string; markdown: string } => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format: missing --- delimiters');
  }
  
  return {
    frontmatter: match[1],
    markdown: match[2]
  };
};

const parseYamlFrontmatter = (yamlString: string): Record<string, any> => {
  const lines = yamlString.split('\n');
  const result: Record<string, any> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    let value: any = trimmedLine.substring(colonIndex + 1).trim();
    
    // Handle quoted strings
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    
    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((item: string) => item.trim());
    }
    
    // Handle booleans - must be exact string matches
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    
    // Handle numbers - only convert if it's not already a boolean
    if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
      value = Number(value);
    }
    
    result[key] = value;
  }
  
  return result;
};

// Enhanced content processing with markdown integration
const processContent = (
  markdownContent: string,
  options: ContentLoaderOptions = {}
): { content: string; wordCount?: number; readTime?: number } => {
  const { parseMarkdown: shouldParseMarkdown = false } = options;
  
  if (!shouldParseMarkdown) {
    return { content: markdownContent };
  }
  
  try {
    // Validate markdown content first
    const validation = validateMarkdownContent(markdownContent);
    if (!validation.isValid) {
      console.warn('Markdown validation warnings:', validation.errors);
    }
    
    // Parse markdown for statistics only
    const parsed = parseMarkdown(markdownContent);
    
    return {
      content: markdownContent,
      wordCount: parsed.wordCount,
      readTime: parsed.readTime
    };
  } catch (error) {
    console.error('Error processing markdown content:', error);
    // Fallback to basic content processing
    const stats = getContentStats(markdownContent);
    
    return {
      content: markdownContent,
      wordCount: stats.wordCount,
      readTime: stats.readTime
    };
  }
};

// Validation utilities
const validateBlogPostFrontmatter = (frontmatter: any): ContentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  for (const field of REQUIRED_BLOG_POST_FIELDS) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Validate specific field types
  if (frontmatter.readTime && typeof frontmatter.readTime !== 'number') {
    errors.push('readTime must be a number');
  }
  
  if (frontmatter.category && !['tutorial', 'project-showcase', 'tech-review', 'career-advice'].includes(frontmatter.category)) {
    errors.push('Invalid category value');
  }
  
  if (frontmatter.difficulty && !['beginner', 'intermediate', 'advanced'].includes(frontmatter.difficulty)) {
    errors.push('Invalid difficulty value');
  }
  
  if (frontmatter.tags && !Array.isArray(frontmatter.tags)) {
    errors.push('tags must be an array');
  }
  
  if (frontmatter.featured && typeof frontmatter.featured !== 'boolean') {
    errors.push('featured must be a boolean');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

const validateProjectFrontmatter = (frontmatter: any): ContentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  for (const field of REQUIRED_PROJECT_FIELDS) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Validate specific field types
  if (frontmatter.techStack && !Array.isArray(frontmatter.techStack)) {
    errors.push('techStack must be an array');
  }
  
  if (frontmatter.featured && typeof frontmatter.featured !== 'boolean') {
    errors.push('featured must be a boolean');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Content loading functions
export const loadBlogPostContent = async (
  filePath: string,
  options: ContentLoaderOptions = {}
): Promise<BlogPostContent> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Check cache first
  if (opts.cacheEnabled && contentCache[filePath]) {
    const cached = contentCache[filePath];
    if (Date.now() < cached.expiresAt) {
      return cached.content as BlogPostContent;
    } else {
      delete contentCache[filePath];
    }
  }
  
  try {
    // In a real implementation, this would fetch the file content
    // For now, we'll simulate loading content from the markdown files
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load content from ${filePath}: ${response.statusText}`);
    }
    
    const content = await response.text();
    const { frontmatter: yamlFrontmatter, markdown } = parseFrontmatter(content);
    const frontmatterData = parseYamlFrontmatter(yamlFrontmatter);
    
    if (opts.validateFrontmatter) {
      const validation = validateBlogPostFrontmatter(frontmatterData);
      if (!validation.isValid) {
        throw new Error(`Invalid frontmatter: ${validation.errors.join(', ')}`);
      }
    }
    
    const processedContent = processContent(markdown, opts);
    
    const blogPostContent: BlogPostContent = {
      frontmatter: frontmatterData as BlogPostFrontmatter,
      content: processedContent.content,
      excerpt: frontmatterData.excerpt,
      wordCount: processedContent.wordCount,
      readTime: processedContent.readTime
    };
    
    // Cache the result
    if (opts.cacheEnabled) {
      contentCache[filePath] = {
        content: blogPostContent,
        timestamp: Date.now(),
        expiresAt: Date.now() + opts.cacheExpiry
      };
    }
    
    return blogPostContent;
  } catch (error) {
    throw new Error(`Failed to load blog post content: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const loadProjectContent = async (
  filePath: string,
  options: ContentLoaderOptions = {}
): Promise<ProjectContent> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Check cache first
  if (opts.cacheEnabled && contentCache[filePath]) {
    const cached = contentCache[filePath];
    if (Date.now() < cached.expiresAt) {
      return cached.content as ProjectContent;
    } else {
      delete contentCache[filePath];
    }
  }
  
  try {
    // In a real implementation, this would fetch the file content
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load content from ${filePath}: ${response.statusText}`);
    }
    
    const content = await response.text();
    const { frontmatter: yamlFrontmatter, markdown } = parseFrontmatter(content);
    const frontmatterData = parseYamlFrontmatter(yamlFrontmatter);
    
    if (opts.validateFrontmatter) {
      const validation = validateProjectFrontmatter(frontmatterData);
      if (!validation.isValid) {
        throw new Error(`Invalid frontmatter: ${validation.errors.join(', ')}`);
      }
    }
    
    const processedContent = processContent(markdown, opts);
    
    const projectContent: ProjectContent = {
      frontmatter: frontmatterData as ProjectFrontmatter,
      content: processedContent.content,
      excerpt: frontmatterData.description, // Use description as excerpt for projects
      wordCount: processedContent.wordCount,
      readTime: processedContent.readTime
    };
    
    // Cache the result
    if (opts.cacheEnabled) {
      contentCache[filePath] = {
        content: projectContent,
        timestamp: Date.now(),
        expiresAt: Date.now() + opts.cacheExpiry
      };
    }
    
    return projectContent;
  } catch (error) {
    throw new Error(`Failed to load project content: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Generic content loader
export const loadContent = async (
  filePath: string,
  contentType: ContentType,
  options: ContentLoaderOptions = {}
): Promise<ContentUnion> => {
  switch (contentType) {
    case 'blog-post':
      return await loadBlogPostContent(filePath, options);
    case 'project':
      return await loadProjectContent(filePath, options);
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }
};

// Content discovery functions
export const discoverContentFiles = async (contentType: ContentType): Promise<ContentFile[]> => {
  // In a real implementation, this would scan the content directory
  // For now, we'll return a mock list based on the content we know exists
  const mockFiles: Record<ContentType, ContentFile[]> = {
    'blog-post': [
      {
        path: '/content/blog-posts/react-performance-optimization.md',
        filename: 'react-performance-optimization.md',
        lastModified: new Date('2024-01-15'),
        size: 8192
      },
      {
        path: '/content/blog-posts/typescript-advanced-patterns.md',
        filename: 'typescript-advanced-patterns.md',
        lastModified: new Date('2024-01-20'),
        size: 10240
      },
      {
        path: '/content/blog-posts/docker-production-optimization.md',
        filename: 'docker-production-optimization.md',
        lastModified: new Date('2024-01-25'),
        size: 12288
      }
    ],
    'project': [
      {
        path: '/content/projects/personal-blog-portfolio.md',
        filename: 'personal-blog-portfolio.md',
        lastModified: new Date('2024-01-15'),
        size: 6144
      },
      {
        path: '/content/projects/ecommerce-platform.md',
        filename: 'ecommerce-platform.md',
        lastModified: new Date('2023-12-01'),
        size: 7168
      },
      {
        path: '/content/projects/task-management-app.md',
        filename: 'task-management-app.md',
        lastModified: new Date('2023-10-15'),
        size: 8192
      }
    ]
  };
  
  return mockFiles[contentType] || [];
};

// Content metadata functions
export const getContentMetadata = async (): Promise<ContentMetadata> => {
  const blogFiles = await discoverContentFiles('blog-post');
  const projectFiles = await discoverContentFiles('project');
  
  // In a real implementation, this would analyze the actual content
  // For now, we'll return mock metadata
  return {
    totalBlogPosts: blogFiles.length,
    totalProjects: projectFiles.length,
    totalTags: 15, // Mock value
    lastUpdated: new Date(Math.max(...blogFiles.map(f => f.lastModified.getTime()), ...projectFiles.map(f => f.lastModified.getTime()))),
    categories: {
      tutorial: 2,
      'project-showcase': 1,
      'tech-review': 0,
      'career-advice': 0
    },
    difficulties: {
      beginner: 0,
      intermediate: 2,
      advanced: 1
    }
  };
};

// Search functionality
export const searchContent = async (
  _query: string,
  contentType?: ContentType
): Promise<ContentSearchResult[]> => {
  const results: ContentSearchResult[] = [];
  
  // In a real implementation, this would search through actual content
  // For now, we'll return mock search results
  if (!contentType || contentType === 'blog-post') {
    results.push({
      type: 'blog-post',
      id: 'react-performance-optimization',
      title: 'React Performance Optimization: A Deep Dive into useMemo and useCallback',
      excerpt: 'Learn how to optimize React applications using useMemo and useCallback hooks...',
      tags: ['React', 'Performance', 'JavaScript', 'Hooks', 'Optimization'],
      relevance: 0.9
    });
  }
  
  if (!contentType || contentType === 'project') {
    results.push({
      type: 'project',
      id: 'personal-blog-portfolio',
      title: 'Personal Blog & Portfolio',
      description: 'A modern, responsive personal blog and portfolio website...',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Jest'],
      relevance: 0.8
    });
  }
  
  return results.sort((a, b) => b.relevance - a.relevance);
};

// Cache management
export const clearCache = (): void => {
  contentCache = {};
};

export const getCacheStats = (): { size: number; entries: string[] } => {
  const entries = Object.keys(contentCache);
  return {
    size: entries.length,
    entries
  };
};

export const removeFromCache = (filePath: string): boolean => {
  if (contentCache[filePath]) {
    delete contentCache[filePath];
    return true;
  }
  return false;
};

// Error handling utilities
export const createLoadingState = (): ContentLoadingStateData => ({
  state: 'idle',
  retryCount: 0
});

export const handleContentError = (error: Error, retryCount: number = 0): ContentLoadingStateData => {
  const maxRetries = 3;
  
  if (retryCount < maxRetries) {
    return {
      state: 'error',
      error: error.message,
      retryCount: retryCount + 1
    };
  }
  
  return {
    state: 'error',
    error: `Failed after ${maxRetries} attempts: ${error.message}`,
    retryCount
  };
};

// Enhanced error handling for missing or malformed files
export const handleMissingFile = (filePath: string): ContentLoadingStateData => ({
  state: 'not-found',
  error: `File not found: ${filePath}`,
  retryCount: 0,
  errorType: 'not-found',
  suggestions: ['Check if the file exists', 'Verify the file path is correct']
});

export const handleMalformedContent = (filePath: string, details: string): ContentLoadingStateData => ({
  state: 'malformed',
  error: `Malformed content in ${filePath}: ${details}`,
  retryCount: 0,
  errorType: 'malformed',
  suggestions: ['Check markdown syntax', 'Verify frontmatter format', 'Check file integrity']
});

export const handleValidationError = (filePath: string, errors: string[]): ContentLoadingStateData => ({
  state: 'error',
  error: `Validation failed for ${filePath}: ${errors.join(', ')}`,
  retryCount: 0,
  errorType: 'validation',
  suggestions: ['Check required fields', 'Verify field types', 'Ensure proper formatting']
});

// Content recovery utilities
export const isRecoverableError = (error: Error): boolean => {
  const errorMessage = error.message.toLowerCase();
  return !errorMessage.includes('not found') && !errorMessage.includes('404');
};

export const getErrorSuggestions = (error: Error): string[] => {
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return ['Check your internet connection', 'Verify the file path is correct', 'Try again later'];
  }
  
  if (errorMessage.includes('not found') || errorMessage.includes('404')) {
    return ['Check if the file exists', 'Verify the file path', 'Contact support if the problem persists'];
  }
  
  if (errorMessage.includes('invalid frontmatter')) {
    return ['Check frontmatter syntax', 'Verify required fields are present', 'Check markdown formatting'];
  }
  
  if (errorMessage.includes('parsing')) {
    return ['Check markdown syntax', 'Verify frontmatter delimiters', 'Ensure proper file encoding'];
  }
  
  return ['Try again later', 'Check file integrity', 'Contact support if the problem persists'];
};
