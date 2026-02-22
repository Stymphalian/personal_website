// Content loader utility for markdown-based content management
// Handles dynamic file loading, frontmatter parsing, and content caching

import matter from 'gray-matter';
import type {
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
import { REQUIRED_PROJECT_FIELDS } from '../types/content';
import { parseMarkdown } from './markdown';



// Default options for content loading
const DEFAULT_OPTIONS: Required<ContentLoaderOptions> = {
  cacheEnabled: true,
  cacheExpiry: 3600000, // 1 hour
  parseMarkdown: false,
  validateFrontmatter: true
};

// Content cache for performance optimization
let contentCache: ContentCache = {};

// Parse frontmatter and markdown body using gray-matter
const parseFrontmatterWithGrayMatter = (content: string): { frontmatterData: Record<string, any>; markdown: string } => {
  try {
    const { data, content: body } = matter(content);
    return { frontmatterData: data, markdown: body.trim() };
  } catch (error) {
    console.warn('Failed to parse frontmatter with gray-matter, treating entire content as markdown:', error);
    return { frontmatterData: {}, markdown: content.trim() };
  }
};

// Content processing with reading-time statistics
const processContent = (
  markdownContent: string,
  options: ContentLoaderOptions = {}
): { content: string; wordCount?: number; readTime?: number } => {
  const { parseMarkdown: shouldParseMarkdown = false } = options;
  
  if (!shouldParseMarkdown) {
    return { content: markdownContent };
  }
  
  try {
    const stats = parseMarkdown(markdownContent);
    return {
      content: markdownContent,
      wordCount: stats.wordCount,
      readTime: stats.readTime
    };
  } catch (error) {
    console.error('Error processing markdown content:', error);
    return { content: markdownContent };
  }
};

// Content loading functions
const validateProjectFrontmatter = (frontmatter: any): ContentValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for missing required fields
  for (const field of REQUIRED_PROJECT_FIELDS) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Validate specific field types with fallbacks
  if (frontmatter.techStack !== undefined && frontmatter.techStack !== null) {
    if (!Array.isArray(frontmatter.techStack)) {
      warnings.push('techStack should be an array, attempting to convert');
      if (typeof frontmatter.techStack === 'string') {
        frontmatter.techStack = [frontmatter.techStack];
      } else {
        errors.push('techStack must be an array or string');
      }
    }
  }
  
  if (frontmatter.featured !== undefined && frontmatter.featured !== null) {
    if (typeof frontmatter.featured !== 'boolean') {
      warnings.push(`featured should be a boolean, converting "${frontmatter.featured}" to false`);
      frontmatter.featured = false;
    }
  }
  
  // Provide default values for critical fields if missing
  if (!frontmatter.id && frontmatter.slug) {
    frontmatter.id = frontmatter.slug;
    warnings.push('Using slug as id since id is missing');
  }
  
  if (!frontmatter.date) {
    frontmatter.date = new Date().toISOString().split('T')[0];
    warnings.push('Using current date as default since date is missing');
  }
  
  if (!frontmatter.description && frontmatter.shortDescription) {
    frontmatter.description = frontmatter.shortDescription;
    warnings.push('Using shortDescription as description since description is missing');
  }
  
  if (!frontmatter.shortDescription && frontmatter.description) {
    frontmatter.shortDescription = frontmatter.description.substring(0, 100) + '...';
    warnings.push('Generated shortDescription from description');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Content loading functions
export const loadProjectContent = async (
  filePath: string,
  options: ContentLoaderOptions = {}
): Promise<ProjectContent> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  try {
    console.log(`Loading project content from: "${filePath}"`);
    
    // Check cache first
    if (opts.cacheEnabled && contentCache[filePath]) {
      const cached = contentCache[filePath];
      if (Date.now() < cached.expiresAt) {
        console.log(`Cache hit for project: "${filePath}"`);
        return cached.content as ProjectContent;
      } else {
        delete contentCache[filePath];
      }
    }
    
    // In a real implementation, this would fetch the file content
    const response = await fetch(filePath);
    if (!response.ok) {
      const errorMsg = `Failed to load content from ${filePath}: ${response.statusText}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    
    const content = await response.text();
    console.log(`Successfully loaded content from: "${filePath}"`);
    
    const { frontmatterData, markdown } = parseFrontmatterWithGrayMatter(content);
    
    if (Object.keys(frontmatterData).length > 0 && opts.validateFrontmatter) {
      const validation = validateProjectFrontmatter(frontmatterData);
      if (!validation.isValid) {
        const errorMsg = `Invalid frontmatter: ${validation.errors.join(', ')}`;
        console.error(`Validation failed for "${filePath}":`, errorMsg);
        throw new Error(errorMsg);
      }
    }
    
    const processedContent = processContent(markdown, opts);
    
    const projectContent: ProjectContent = {
      frontmatter: frontmatterData as ProjectFrontmatter,
      content: processedContent.content,
      excerpt: Object.keys(frontmatterData).length > 0 ? frontmatterData.excerpt : "",
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
      console.log(`Cached project content for: "${filePath}"`);
    }
    
    console.log(`Successfully processed project content from: "${filePath}"`);
    return projectContent;
  } catch (error) {
    console.error(`Error loading project content from "${filePath}":`, error);
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
  const projectFiles = await discoverContentFiles('project');
  
  // In a real implementation, this would analyze the actual content
  // For now, we'll return mock metadata
  return {
    totalProjects: projectFiles.length,
    totalTags: 15, // Mock value
    lastUpdated: new Date(Math.max(...projectFiles.map(f => f.lastModified.getTime())))
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
