import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headshot from '../../components/Headshot';
import Layout from '../../components/Layout/Layout';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { getFeaturedProjects } from '../../data/projects';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProjects = getFeaturedProjects();
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
              Hi, I'm{' '}
              <span className='text-crystal-blue-400 animate-pulse'>
                Jordan Yu
              </span>
            </h1>
            <h2
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-vs-editor-text2 mb-3 md:mb-4 transition-all duration-700 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Senior Software Developer
            </h2>
            <p
              className={`text-base sm:text-lg md:text-xl text-vs-editor-text2 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-4 md:mb-6 transition-all duration-700 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Software engineer, gamer, and lifelong learner — welcome to my
              little corner of the internet.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <button
                onClick={() => navigate('/projects')}
                className='bg-crystal-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95'
              >
                View My Work
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/resume.pdf';
                  link.download = 'Jordan_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className='border-2 border-crystal-blue-600 text-crystal-blue-400 px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base font-medium active:scale-95'
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div
          className={`transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-vs-editor-text mb-4 md:mb-6'>
            Featured Projects
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className='text-center mt-6 md:mt-8'>
            <button
              onClick={() => navigate('/projects')}
              className='bg-crystal-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95'
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
