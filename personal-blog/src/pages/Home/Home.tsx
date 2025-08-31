import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headshot from '../../components/Headshot';
import Layout from '../../components/Layout/Layout';
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel';
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
      pageTitle="Welcome to My Portfolio"
      pageDescription="Senior Software Developer with 8+ years of backend experience"
      maxWidth="7xl"
      padding="md"
    >
      <div className={`space-y-8 md:space-y-12 lg:space-y-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        {/* Hero Section with Headshot */}
        <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          {/* Professional Headshot */}
          <div className="flex-shrink-0 order-2 lg:order-1 group">
            <Headshot
              src="/headshot.jpg"
              alt="Professional headshot"
              size="lg"
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl"
            />
          </div>

          {/* Bio Content */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-vs-editor-text mb-3 md:mb-4 leading-tight transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Hi, I'm <span className="text-crystal-blue-400 animate-pulse">Jordan Yu</span>
            </h1>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-vs-editor-text2 mb-3 md:mb-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              Senior Software Developer
            </h2>
            <p className={`text-base sm:text-lg md:text-xl text-vs-editor-text2 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-4 md:mb-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              This my own little spot on the internet where I can share some of my projects
              and write about interesting things I have worked on. I'm a software engineer by trade,
              but in my heart I'm a gamer, nerd and I love learning about new things
              and technology. Some of my interests are graphics, competitive programming,
              and running. Thanks for dropping by!
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
              <button
                onClick={() => navigate('/projects')}
                className="bg-crystal-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95"
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
                className="border-2 border-crystal-blue-600 text-crystal-blue-400 px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base font-medium active:scale-95"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div className={`bg-gradient-to-r from-vs-editor-surface to-vs-editor-surface2 rounded-xl p-4 md:p-6 lg:p-8 shadow-sm transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-vs-editor-text mb-4 md:mb-6 text-center">Technical Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '⚙️', title: 'Backend', color: 'green', skills: ['Java & Go', 'Python & PHP', 'REST/RPC APIs', 'Microservices'] },
              { icon: '☁️', title: 'Infrastructure', color: 'blue', skills: ['AWS & GCP', 'Kubernetes', 'Docker', 'Borg/Spanner'] },
              { icon: '🗄️', title: 'Databases', color: 'purple', skills: ['SQL & NoSQL', 'Bigtable', 'Spanner', 'Data Modeling'] },
              { icon: '🔧', title: 'Tools & DevOps', color: 'orange', skills: ['Git & Bazel', 'CI/CD', 'Monitoring', 'Testing'] }
            ].map((skill, index) => (
              <div
                key={skill.title}
                className={`bg-vs-editor-surface rounded-xl p-4 md:p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-l-4 border-${skill.color}-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className={`text-${skill.color}-600 text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  {skill.icon}
                </div>
                <div className={`text-${skill.color}-600 font-bold text-base md:text-lg mb-2 transition-colors duration-300 group-hover:text-${skill.color}-700`}>
                  {skill.title}
                </div>
                <div className="text-xs md:text-sm text-vs-editor-text2 space-y-1">
                  {skill.skills.map((skillItem, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="transition-all duration-300 group-hover:text-vs-editor-text group-hover:translate-x-1"
                      style={{ transitionDelay: `${skillIndex * 50}ms` }}
                    >
                      {skillItem}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className={`bg-vs-editor-surface rounded-xl p-4 md:p-6 lg:p-8 shadow-lg border border-vs-editor-border transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-vs-editor-text mb-4 md:mb-6 text-center">Featured Projects</h3>
          <p className="text-sm md:text-base lg:text-lg text-vs-editor-text2 mb-6 md:mb-8 text-center max-w-3xl mx-auto">
            Here are some of my recent personal projects that demonstrate some of my skills and programming interests.
          </p>
          <div className="transition-all duration-700 delay-1100">
            <ProjectCarousel projects={featuredProjects} />
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={() => navigate('/projects')}
              className="bg-crystal-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-crystal-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95"
            >
              View All Projects
            </button>
          </div>
        </div>

        {/* Experience & Education Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
          <div className="bg-gradient-to-br from-vs-editor-surface to-vs-editor-surface2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group">
            <h3 className="text-lg md:text-xl font-bold text-vs-editor-text mb-3 md:mb-4 group-hover:text-crystal-blue-400 transition-colors duration-300">Professional Experience</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                { title: 'Senior Backend Software Engineer', company: 'Course Hero', period: '2021-2023', description: 'Payments Infrastructure - Migrated legacy platform to Recurly affecting 2M+ users, automated 500K+ transaction processing' },
                { title: 'Senior Software Engineer', company: 'Google', period: '2018-2020', description: 'Dialogflow/Google Assistant - Developed NLP backend services, Java APIs processing 1M+ model edits daily, GCP to Borg migration' },
                { title: 'Software Engineer', company: 'Google', period: '2015-2018', description: 'Tools & Infrastructure - Built testing infrastructure for Ads spam filtering, maintained 10+ services, mentored 3 interns' }
              ].map((exp, index) => (
                <div
                  key={exp.title}
                  className="border-l-4 border-blue-500 pl-3 md:pl-4 transition-all duration-300 hover:border-blue-600 hover:pl-5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-vs-editor-text text-sm md:text-base group-hover:text-crystal-blue-300 transition-colors duration-300">{exp.title}</div>
                  <div className="text-xs md:text-sm text-vs-editor-text2">{exp.company} • {exp.period}</div>
                  <div className="text-xs md:text-sm text-vs-editor-text3 mt-1 group-hover:text-vs-editor-text transition-colors duration-300">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-vs-editor-surface to-vs-editor-surface2 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group">
            <h3 className="text-lg md:text-xl font-bold text-vs-editor-text mb-3 md:mb-4 group-hover:text-green-400 transition-colors duration-300">Education & Background</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                { title: 'Bachelor of Software Engineering', institution: 'University of Victoria', period: '2011-2015', description: 'Computer Networks, Architecture, Databases, Algorithms, Software Development Methods' },
                { title: 'Technical Skills', institution: 'Professional Experience', period: '8+ years', description: 'Languages: Python, Go, Java, PHP, C/C++, JavaScript. Infrastructure: AWS, GCP, Kubernetes, Docker' }
              ].map((edu, index) => (
                <div
                  key={edu.title}
                  className="border-l-4 border-green-500 pl-3 md:pl-4 transition-all duration-300 hover:border-green-600 hover:pl-5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-vs-editor-text text-sm md:text-base group-hover:text-green-400 transition-colors duration-300">{edu.title}</div>
                  <div className="text-xs md:text-sm text-vs-editor-text2">{edu.institution} • {edu.period}</div>
                  <div className="text-xs md:text-sm text-vs-editor-text3 mt-1 group-hover:text-vs-editor-text transition-colors duration-300">{edu.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
};

export default Home;
