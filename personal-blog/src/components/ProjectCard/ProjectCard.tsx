import React from 'react';
import type { Project } from '../../data';

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (projectId: string) => void;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onViewDetails, 
  className = '' 
}) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project.id);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/3 aspect-video md:aspect-square bg-gray-200 overflow-hidden'>
          <img
            src={project.image}
            alt={project.title}
            className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className='hidden w-full h-full flex items-center justify-center text-4xl text-gray-400 bg-gray-100'>
            🚀
          </div>
        </div>
        
        <div className='p-6 flex-1'>
          <h3 className='text-xl font-semibold text-gray-900 mb-3'>
            {project.title}
          </h3>
          <p className='text-gray-600 mb-4 overflow-hidden' style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}>
            {project.description}
          </p>
          
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </span>
            <button 
              onClick={handleViewDetails}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium'
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
