import React, { useEffect, useState } from 'react';
import Headshot from '../../components/Headshot';
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
        {/* Hero Section with Headshot */}
        <div
          className={`flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-12 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Professional Headshot */}
          <div className='flex-shrink-0 order-2 lg:order-1 group'>
            <Headshot
              src='/headshot.jpg'
              alt='Professional headshot'
              size='lg'
              className='w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl'
            />
          </div>

          {/* Bio Content */}
          <div className='flex-1 text-center lg:text-left order-1 lg:order-2'>
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-vs-editor-text mb-3 md:mb-4 leading-tight transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className='text-crystal-blue-400'>Jordan Yu</span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl text-vs-editor-text2 max-w-3xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              I'm a software engineer by trade, but a gamer and nerd at heart
              who loves learning about new things — this is my little corner of
              the internet where I share projects and interesting things I've
              worked on.
            </p>
          </div>
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
