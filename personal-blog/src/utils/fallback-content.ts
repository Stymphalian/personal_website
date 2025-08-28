// Fallback content utility for graceful degradation when content loading fails
// Provides default content and suggestions for various error scenarios

import type { BlogPostContent, ContentType, ProjectContent } from '../types/content';

export interface FallbackContent {
  title: string;
  message: string;
  suggestions: string[];
  actions: Array<{
    label: string;
    action: 'retry' | 'navigate' | 'contact' | 'search';
    target?: string;
  }>;
}

export interface FallbackContentOptions {
  contentType: ContentType;
  errorType: 'not-found' | 'network-error' | 'malformed-content' | 'generic';
  originalSlug?: string;
  customMessage?: string;
}

// Default fallback content for different scenarios
const getDefaultFallbackContent = (options: FallbackContentOptions): FallbackContent => {
  const { contentType, errorType, customMessage } = options;

  switch (errorType) {
    case 'not-found':
      return {
        title: `${contentType === 'blog-post' ? 'Blog Post' : 'Project'} Not Found`,
        message: customMessage || `The ${contentType === 'blog-post' ? 'blog post' : 'project'} you're looking for doesn't exist.`,
        suggestions: [
          'Check the URL for typos',
          'Use the navigation menu to browse available content',
          'Try searching for similar content'
        ],
        actions: [
          { label: 'Browse All Content', action: 'navigate', target: contentType === 'blog-post' ? '/blog' : '/projects' },
          { label: 'Go Home', action: 'navigate', target: '/' },
          { label: 'Contact Support', action: 'contact' }
        ]
      };

    case 'network-error':
      return {
        title: 'Connection Error',
        message: customMessage || 'Unable to load content due to a network issue.',
        suggestions: [
          'Check your internet connection',
          'Try refreshing the page',
          'Wait a moment and try again'
        ],
        actions: [
          { label: 'Retry', action: 'retry' },
          { label: 'Go Back', action: 'navigate', target: 'back' },
          { label: 'Go Home', action: 'navigate', target: '/' }
        ]
      };

    case 'malformed-content':
      return {
        title: 'Content Format Error',
        message: customMessage || 'The requested content has formatting issues and cannot be displayed.',
        suggestions: [
          'Try refreshing the page',
          'Report this issue to support',
          'Try accessing other content'
        ],
        actions: [
          { label: 'Retry', action: 'retry' },
          { label: 'Browse Other Content', action: 'navigate', target: contentType === 'blog-post' ? '/blog' : '/projects' },
          { label: 'Report Issue', action: 'contact' }
        ]
      };

    default:
      return {
        title: 'Content Loading Error',
        message: customMessage || 'There was a problem loading the requested content.',
        suggestions: [
          'Try refreshing the page',
          'Clear your browser cache',
          'Contact support if the problem persists'
        ],
        actions: [
          { label: 'Retry', action: 'retry' },
          { label: 'Go Home', action: 'navigate', target: '/' },
          { label: 'Contact Support', action: 'contact' }
        ]
      };
  }
};

// Generate fallback blog post content
export const generateFallbackBlogPost = (options: FallbackContentOptions): BlogPostContent => {
  const fallback = getDefaultFallbackContent(options);
  
  return {
    frontmatter: {
      id: `fallback-${options.originalSlug || 'unknown'}`,
      title: fallback.title,
      slug: options.originalSlug || 'fallback',
      excerpt: fallback.message,
      author: 'System',
      date: new Date().toISOString().split('T')[0],
      tags: ['error', 'fallback'],
      featured: false,
      readTime: 1,
      category: 'tutorial',
      difficulty: 'beginner'
    },
    content: `
# ${fallback.title}

${fallback.message}

## What happened?

The content you requested could not be loaded. This could be due to:

- A temporary network issue
- Content that has been moved or removed
- A technical problem on our end

## What you can do:

${fallback.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

## Need help?

If you continue to experience issues, please contact our support team. We'll be happy to help you find the content you're looking for.

---

*This is a fallback page generated automatically when the original content could not be loaded.*
    `,
    excerpt: fallback.message,
    wordCount: 50,
    readTime: 1
  };
};

// Generate fallback project content
export const generateFallbackProject = (options: FallbackContentOptions): ProjectContent => {
  const fallback = getDefaultFallbackContent(options);
  
  return {
    frontmatter: {
      id: `fallback-${options.originalSlug || 'unknown'}`,
      title: fallback.title,
      slug: options.originalSlug || 'fallback',
      description: fallback.message,
      shortDescription: 'Content temporarily unavailable',
      image: '/placeholder-project-error.jpg',
      techStack: ['Error Handling', 'Fallback System'],
      featured: false,
      date: new Date().toISOString().split('T')[0],
      tags: ['error', 'fallback'],
      liveDemo: undefined,
      githubRepo: undefined
    },
    content: `
# ${fallback.title}

${fallback.message}

## About this error

We encountered an issue while trying to load the project details. This could be due to:

- A temporary network problem
- Content that has been moved or updated
- A technical issue on our end

## Alternative options:

${fallback.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

## Get help

If you need assistance or want to report this issue, please contact our support team.

---

*This is a fallback page generated automatically when the original content could not be loaded.*
    `,
    excerpt: fallback.message,
    wordCount: 50,
    readTime: 1
  };
};

// Main function to generate fallback content
export const generateFallbackContent = (options: FallbackContentOptions): BlogPostContent | ProjectContent => {
  switch (options.contentType) {
    case 'blog-post':
      return generateFallbackBlogPost(options);
    case 'project':
      return generateFallbackProject(options);
    default:
      throw new Error(`Unsupported content type: ${options.contentType}`);
  }
};

// Utility to determine if content should use fallback
export const shouldUseFallback = (
  content: BlogPostContent | ProjectContent | null,
  error: Error | null,
  loadingState: string
): boolean => {
  return !content || error !== null || loadingState === 'error';
};

// Get fallback content options from error
export const getFallbackOptionsFromError = (
  error: Error,
  contentType: ContentType,
  slug?: string
): FallbackContentOptions => {
  let errorType: FallbackContentOptions['errorType'] = 'generic';
  
  if (error.message.includes('Not Found') || error.message.includes('404')) {
    errorType = 'not-found';
  } else if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
    errorType = 'network-error';
  } else if (error.message.includes('Invalid frontmatter') || error.message.includes('format')) {
    errorType = 'malformed-content';
  }
  
  return {
    contentType,
    errorType,
    originalSlug: slug,
    customMessage: error.message
  };
};
