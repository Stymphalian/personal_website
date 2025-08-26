import React from 'react';

const Projects: React.FC = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Projects page will be implemented in task 4.1 */}
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='heading-1 mb-6'>My Projects</h1>
          <p className='body-text max-w-2xl mx-auto mb-8'>
            This page will showcase my projects in a card layout grid.
            Implementation will be completed in task 4.1.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Project cards will be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
