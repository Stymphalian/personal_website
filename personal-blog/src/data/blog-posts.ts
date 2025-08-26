// Blog post data structure
// Will be implemented in task 5.2

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  readTime: number; // in minutes
}

export const blogPosts: BlogPost[] = [
  // Placeholder blog posts - will be populated in task 5.2
  {
    id: 'post-1',
    title: 'Sample Blog Post 1',
    slug: 'sample-blog-post-1',
    excerpt:
      'This is a sample blog post excerpt that will be replaced with real content.',
    content:
      '# Sample Blog Post 1\n\nThis is the content of the first sample blog post.',
    author: 'Your Name',
    date: '2024-01-01',
    tags: ['React', 'TypeScript', 'Web Development'],
    featured: true,
    readTime: 5,
  },
  {
    id: 'post-2',
    title: 'Sample Blog Post 2',
    slug: 'sample-blog-post-2',
    excerpt: 'Another sample blog post excerpt for demonstration purposes.',
    content:
      '# Sample Blog Post 2\n\nThis is the content of the second sample blog post.',
    author: 'Your Name',
    date: '2024-02-01',
    tags: ['Node.js', 'Backend', 'API Design'],
    featured: false,
    readTime: 8,
  },
];

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};
