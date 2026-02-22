import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { projects } from '../../data/projects_list';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout
      showPageTitle={false}
      pageTitle='Welcome to My Portfolio'
      pageDescription='Senior Software Developer with 8+ years of backend experience'
      maxWidth='7xl'
      padding='md'
    >
      <div
        className={`space-y-8 md:space-y-12 lg:space-y-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Hero Section */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <p
            className={`text-xl sm:text-2xl md:text-3xl text-vs-editor-text2 max-w-4xl leading-relaxed transition-all duration-700 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Hi, I'm{' '}
            <span className='font-bold text-crystal-blue-400'>Jordan Yu</span>{' '}
            — a software engineer by trade and gamer at heart, with a passion
            for graphics, competitive programming, and picking up new things;
            welcome to my corner of the internet.
          </p>
        </div>

        {/* Projects */}
        <div
          className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-vs-editor-text mb-4 md:mb-6'>
            Projects
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
