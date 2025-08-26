import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Blog page will be implemented in task 5.1 */}
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='heading-1 mb-6'>Blog</h1>
          <p className='body-text max-w-2xl mx-auto mb-8'>
            This page will display my blog posts and technical articles.
            Implementation will be completed in task 5.1.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Blog post cards will be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
