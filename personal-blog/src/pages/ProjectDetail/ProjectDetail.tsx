import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id || '';

  return (
    <div className='min-h-screen bg-white'>
      {/* ProjectDetail page will be implemented in task 4.4 */}
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-6'>
            <a href='/projects' className='link-secondary'>
              ← Back to Projects
            </a>
          </div>
          <h1 className='heading-1 mb-6'>Project Details</h1>
          <p className='body-text'>
            This page will display detailed information about project:{' '}
            {projectId}. Implementation will be completed in task 4.4.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
