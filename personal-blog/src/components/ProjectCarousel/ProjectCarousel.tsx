import React from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  return (
    <div className='relative'>
      {/* ProjectCarousel component will be implemented in task 3.4 */}
      <div className='text-sm text-gray-500'>ProjectCarousel Component</div>
      <div className='mt-4'>
        {projects.map(project => (
          <div key={project.id} className='mb-4'>
            <h4 className='font-medium'>{project.title}</h4>
            <p className='text-sm text-gray-600'>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
