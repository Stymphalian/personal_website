import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { ProjectCard } from '../../components/ProjectCard';
import { projects } from '../../data/projects_list';

const Projects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout maxWidth="full" padding="lg">
      <div className='w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8'>
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='heading-1 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl'>My Projects</h1>
          <p className='body-text max-w-3xl mx-auto text-sm sm:text-base leading-relaxed px-2'>
            A collection of random projects that I've worked on. I'm usually trying to learn something new
            when I build something so the technologies and scope is a mix of what I want to learn.
          </p>
        </div>

        <div className='space-y-4 sm:space-y-6 w-full max-w-7xl mx-auto'>
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
