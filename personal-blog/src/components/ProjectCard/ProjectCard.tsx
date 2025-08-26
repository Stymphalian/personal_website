import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  techStack,
}) => {
  return (
    <div className='card card-hover p-6'>
      {/* ProjectCard component will be implemented in task 4.2 */}
      <div className='text-sm text-gray-500 mb-4'>ProjectCard Component</div>

      {/* Placeholder image */}
      <div className='w-full h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center'>
        <span className='text-gray-500 text-sm'>Image: {image}</span>
      </div>

      <div className='mb-4'>
        <h3 className='font-semibold text-lg mb-2'>{title}</h3>
        <p className='text-sm text-gray-600'>{description}</p>
      </div>

      {/* Tech stack */}
      <div className='flex flex-wrap gap-2'>
        {techStack.map((tech, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className='px-2 py-1 bg-crystal-blue-100 text-crystal-blue-800 text-xs rounded'
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
