import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog-posts';

const Blog: React.FC = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='min-h-screen bg-white pt-16'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='heading-1 mb-4'>Blog</h1>
          <p className='body-text max-w-2xl mx-auto text-gray-600'>
            Technical articles, tutorials, and insights about web development,
            React, TypeScript, and modern web technologies.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className='block relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 hover:border-blue-200'
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className='absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10'>
                  Featured
                </div>
              )}

              {/* Post Content */}
              <div className='p-6'>
                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-3'>
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className='bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className='text-xl font-semibold text-gray-900 mb-3 line-clamp-2'>
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className='flex items-center justify-between text-sm text-gray-500'>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className='absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 pointer-events-none' />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-gray-400 text-6xl mb-4'>📝</div>
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
              No blog posts yet
            </h3>
            <p className='text-gray-500'>
              Check back soon for new articles and tutorials.
            </p>
          </div>
        )}


      </div>
    </div>
  );
};

export default Blog;
