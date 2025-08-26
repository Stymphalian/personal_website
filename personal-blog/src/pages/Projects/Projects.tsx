import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { ProjectCard } from '../../components/ProjectCard';
import { projects } from '../../data/projects';

const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='heading-1 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl'>My Projects</h1>
          <p className='body-text max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2'>
            Here are some of the projects I've worked on. Each represents a unique challenge 
            and learning experience in software development.
          </p>
        </div>
        
        <div className='space-y-4 sm:space-y-6 max-w-4xl mx-auto'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={(projectId) => {
                navigate(`/projects/${projectId}`);
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
