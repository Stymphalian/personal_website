// Content management types for markdown-based content system
// Supports both blog posts and projects with standardized frontmatter

export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  date: string;
  featured: boolean;
  tags: string[];
}

export interface BlogPostFrontmatter extends BaseContent {
  excerpt: string;
  author: string;
  readTime: number; // in minutes
  category: 'tutorial' | 'project-showcase' | 'tech-review' | 'career-advice';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ProjectFrontmatter extends BaseContent {
  description: string;
  shortDescription: string;
  image: string; // Main/featured image
  techStack: string[];
  liveDemo?: string;
  githubRepo?: string;
  showDetails: boolean; // Controls whether View Details button is shown
}

export interface BlogPostContent {
  frontmatter: BlogPostFrontmatter;
  content: string; // Raw markdown content
  excerpt?: string; // From frontmatter
  wordCount?: number; // Word count for content
  readTime?: number; // Estimated reading time in minutes
}

export interface ProjectContent {
  frontmatter: ProjectFrontmatter;
  content: string; // Raw markdown content
  excerpt?: string; // From frontmatter
  wordCount?: number; // Word count for content
  readTime?: number; // Estimated reading time in minutes
}

export interface ContentFile {
  path: string;
  filename: string;
  lastModified: Date;
  size: number;
}

export interface ContentCache {
  [key: string]: {
    content: BlogPostContent | ProjectContent;
    timestamp: number;
    expiresAt: number;
  };
}

export interface ContentLoaderOptions {
  cacheEnabled?: boolean;
  cacheExpiry?: number; // in milliseconds
  parseMarkdown?: boolean;
  validateFrontmatter?: boolean;
}

export interface ContentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ContentSearchResult {
  type: 'blog-post' | 'project';
  id: string;
  title: string;
  excerpt?: string;
  description?: string;
  tags: string[];
  relevance: number; // 0-1 score for search relevance
}

export interface ContentMetadata {
  totalBlogPosts: number;
  totalProjects: number;
  totalTags: number;
  lastUpdated: Date;
  categories: {
    [key: string]: number;
  };
  difficulties: {
    [key: string]: number;
  };
}

// Utility types for content processing
export type ContentType = 'blog-post' | 'project';
export type ContentUnion = BlogPostContent | ProjectContent;

// Frontmatter validation schemas
export const REQUIRED_BLOG_POST_FIELDS: (keyof BlogPostFrontmatter)[] = [
  'id', 'title', 'slug', 'date', 'featured', 'tags', 'excerpt', 'author', 'readTime', 'category', 'difficulty'
];

export const REQUIRED_PROJECT_FIELDS: (keyof ProjectFrontmatter)[] = [
  'id', 'title', 'slug', 'date', 'featured', 'tags', 'description', 'shortDescription', 'image', 'techStack', 'showDetails'
];

// Content loading states
export type ContentLoadingState = 'idle' | 'loading' | 'loaded' | 'error' | 'not-found' | 'malformed';

export interface ContentLoadingStateData {
  state: ContentLoadingState;
  error?: string;
  retryCount: number;
  errorType?: 'network' | 'validation' | 'parsing' | 'not-found' | 'malformed';
  suggestions?: string[];
}

// Enhanced error handling types
export interface ContentError {
  type: 'network' | 'validation' | 'parsing' | 'not-found' | 'malformed';
  message: string;
  filePath?: string;
  details?: any;
  suggestions?: string[];
  recoverable: boolean;
}

export interface ErrorHandlingOptions {
  retryOnFailure?: boolean;
  maxRetries?: number;
  fallbackContent?: boolean;
  logErrors?: boolean;
  gracefulDegradation?: boolean;
}



