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
    <div
      data-testid="project-card"
      className={`bg-vs-editor-surface rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-vs-editor-border ${className}`}
    >
      <div className='flex flex-col lg:flex-row'>
        {/* Image Section */}
        <div className='w-full lg:w-1/3 aspect-video lg:aspect-square bg-vs-editor-surface2 overflow-hidden'>
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
          <div className='hidden w-full h-full flex items-center justify-center text-2xl sm:text-4xl text-vs-editor-text2 bg-vs-editor-surface2'>
            🚀
          </div>
        </div>

        {/* Content Section */}
        <div className='p-4 sm:p-6 flex-1 flex flex-col justify-between'>
          <div>
            <h3 className='text-lg sm:text-xl font-semibold text-vs-editor-text mb-2 sm:mb-3 leading-tight'>
              {project.title}
            </h3>
            <p className='text-vs-editor-text2 mb-3 sm:mb-4 text-sm sm:text-base overflow-hidden leading-relaxed' style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}>
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className='mb-3 sm:mb-4'>
              <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className='px-2 sm:px-3 py-1 bg-crystal-blue-500/20 text-crystal-blue-400 text-xs sm:text-sm rounded-full font-medium'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-0'>
            <span className='text-xs sm:text-sm text-vs-editor-text3 flex items-center'>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </span>
            <button
              onClick={handleViewDetails}
              className='px-3 sm:px-4 py-2 bg-crystal-blue-600 text-white rounded-lg hover:bg-crystal-blue-700 transition-colors duration-200 text-xs sm:text-sm font-medium w-full sm:w-auto'
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
