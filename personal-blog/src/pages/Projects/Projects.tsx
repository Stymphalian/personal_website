import React from 'react';
import { Layout } from '../../components/Layout';
import { ProjectCard } from '../../components/ProjectCard';
import { projects } from '../../data/projects';

const Projects: React.FC = () => {
  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center mb-12'>
          <h1 className='heading-1 mb-6'>My Projects</h1>
          <p className='body-text max-w-2xl mx-auto'>
            Here are some of the projects I've worked on. Each represents a unique challenge 
            and learning experience in software development.
          </p>
        </div>
        
        <div className='space-y-6 max-w-4xl mx-auto'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={(projectId) => {
                // TODO: Navigate to project detail page
                console.log('View details for project:', projectId);
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
