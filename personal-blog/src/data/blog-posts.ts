// Blog post data structure for developer-focused content
// Supports markdown content, tags, and developer-relevant metadata
// Updated to work with dynamic content loading system

import type { BlogPostContent, BlogPostFrontmatter } from '../types/content';
import { loadContent } from '../utils/content-loader';

export interface BlogPost extends BlogPostFrontmatter {
  // Content field removed - content is now loaded dynamically from markdown files
  // All other fields remain the same for backward compatibility
}

export const blogPosts: BlogPost[] = [
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization: A Deep Dive into useMemo and useCallback',
    slug: 'react-performance-optimization',
    excerpt: 'Learn how to optimize React applications using useMemo and useCallback hooks, with real-world examples and performance benchmarks.',
    author: 'Jordan Yu',
    date: '2024-01-15',
    tags: ['React', 'Performance', 'JavaScript', 'Hooks', 'Optimization'],
    featured: true,
    readTime: 12,
    category: 'tutorial',
    difficulty: 'intermediate'
  },
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Robust Applications',
    slug: 'typescript-advanced-patterns',
    excerpt: 'Explore advanced TypeScript patterns including conditional types, mapped types, and utility types to build more robust applications.',
    author: 'Jordan Yu',
    date: '2024-01-20',
    tags: ['TypeScript', 'Advanced Patterns', 'Type System', 'Generics', 'Utility Types'],
    featured: true,
    readTime: 15,
    category: 'tutorial',
    difficulty: 'advanced'
  },
  {
    id: 'docker-production-optimization',
    title: 'Docker Production Optimization: From Development to Production',
    slug: 'docker-production-optimization',
    excerpt: 'Learn how to optimize Docker containers for production deployment, including multi-stage builds, security best practices, and performance tuning.',
    author: 'Jordan Yu',
    date: '2024-01-25',
    tags: ['Docker', 'DevOps', 'Production', 'Optimization', 'Security'],
    featured: false,
    readTime: 18,
    category: 'tutorial',
    difficulty: 'intermediate'
  }
];

// Content loading functions that integrate with existing data layer
export const loadBlogPostContent = async (slug: string): Promise<BlogPostContent | null> => {
  try {
    const content = await loadContent(`/content/blog-posts/${slug}.txt`, 'blog-post');
    return content as BlogPostContent;
  } catch (error) {
    console.error(`Failed to load blog post content for slug: ${slug}`, error);
    return null;
  }
};

export const loadBlogPostContentById = async (id: string): Promise<BlogPostContent | null> => {
  const post = getPostBySlug(id);
  if (!post) return null;
  return loadBlogPostContent(post.slug);
};

export const preloadBlogPostContent = async (slug: string): Promise<void> => {
  try {
    await loadContent(`/content/blog-posts/${slug}.txt`, 'blog-post', { cacheEnabled: true });
  } catch (error) {
    console.warn(`Failed to preload blog post content for slug: ${slug}`, error);
  }
};

export const preloadFeaturedPostsContent = async (): Promise<void> => {
  const featuredPosts = getFeaturedPosts();
  await Promise.all(
    featuredPosts.map(post => preloadBlogPostContent(post.slug))
  );
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

export const getPostsByCategory = (category: BlogPost['category']): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getPostsByDifficulty = (difficulty: BlogPost['difficulty']): BlogPost[] => {
  return blogPosts.filter(post => post.difficulty === difficulty);
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getPostsByAuthor = (author: string): BlogPost[] => {
  return blogPosts.filter(post => post.author === author);
};
