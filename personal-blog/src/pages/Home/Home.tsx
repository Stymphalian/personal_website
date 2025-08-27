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
      showPageTitle 
      pageTitle="Welcome to My Portfolio" 
      pageDescription="Full-stack developer passionate about creating innovative web solutions"
      maxWidth="4xl"
      padding="lg"
    >
      <div className={`space-y-8 md:space-y-12 lg:space-y-16 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Hero Section with Headshot */}
        <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 lg:gap-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
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
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Hi, I'm <span className="text-blue-600 animate-pulse">Your Name</span>
            </h1>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-3 md:mb-4 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Full-Stack Developer & Software Engineer
            </h2>
            <p className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-4 md:mb-6 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              I specialize in building modern web applications using React, Node.js, and cloud technologies. 
              With a passion for clean code, exceptional user experience, and scalable architecture, 
              I transform ideas into robust digital solutions that make a difference.
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button 
                onClick={() => navigate('/projects')}
                className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95"
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
                className="border-2 border-blue-600 text-blue-600 px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base font-medium active:scale-95"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div className={`bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 md:p-6 lg:p-8 shadow-sm transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Technical Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🎨', title: 'Frontend', color: 'blue', skills: ['React & TypeScript', 'Tailwind CSS', 'Next.js & Vite', 'Responsive Design'] },
              { icon: '⚙️', title: 'Backend', color: 'green', skills: ['Node.js & Express', 'Python & Django', 'RESTful APIs', 'GraphQL'] },
              { icon: '🗄️', title: 'Database', color: 'purple', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling'] },
              { icon: '🚀', title: 'DevOps', color: 'orange', skills: ['Docker & Kubernetes', 'AWS & Cloud', 'CI/CD Pipelines', 'Monitoring'] }
            ].map((skill, index) => (
              <div 
                key={skill.title}
                className={`bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-l-4 border-${skill.color}-500 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className={`text-${skill.color}-600 text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-110`}>
                  {skill.icon}
                </div>
                <div className={`text-${skill.color}-600 font-bold text-base md:text-lg mb-2 transition-colors duration-300 group-hover:text-${skill.color}-700`}>
                  {skill.title}
                </div>
                <div className="text-xs md:text-sm text-gray-600 space-y-1">
                  {skill.skills.map((skillItem, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-1"
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
        <div className={`bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100 transition-all duration-700 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Featured Projects</h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8 text-center max-w-3xl mx-auto">
            Here are some of my recent projects that showcase different aspects of modern web development. 
            Each project demonstrates my skills in frontend, backend, and full-stack development.
          </p>
          <div className="transition-all duration-700 delay-1100">
            <ProjectCarousel projects={featuredProjects} />
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button 
              onClick={() => navigate('/projects')}
              className="bg-blue-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg text-sm md:text-base font-medium active:scale-95"
            >
              View All Projects
            </button>
          </div>
        </div>

        {/* Experience & Education Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 transition-all duration-700 delay-1200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-blue-700 transition-colors duration-300">Professional Experience</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                { title: 'Senior Developer', company: 'Tech Company', period: '2022-Present', description: 'Leading development teams and architecting scalable solutions' },
                { title: 'Full-Stack Developer', company: 'Startup', period: '2020-2022', description: 'Built and deployed multiple web applications from concept to production' }
              ].map((exp, index) => (
                <div 
                  key={exp.title}
                  className="border-l-4 border-blue-500 pl-3 md:pl-4 transition-all duration-300 hover:border-blue-600 hover:pl-5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-blue-800 transition-colors duration-300">{exp.title}</div>
                  <div className="text-xs md:text-sm text-gray-600">{exp.company} • {exp.period}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">{exp.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-green-700 transition-colors duration-300">Education & Certifications</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                { title: 'Computer Science Degree', institution: 'University', period: '2016-2020', description: 'Focused on software engineering and web technologies' },
                { title: 'AWS Certified Developer', institution: 'Amazon Web Services', period: '2023', description: 'Professional cloud development and deployment' }
              ].map((edu, index) => (
                <div 
                  key={edu.title}
                  className="border-l-4 border-green-500 pl-3 md:pl-4 transition-all duration-300 hover:border-green-600 hover:pl-5"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-green-800 transition-colors duration-300">{edu.title}</div>
                  <div className="text-xs md:text-sm text-gray-600">{edu.institution} • {edu.period}</div>
                  <div className="text-xs md:text-sm text-gray-500 mt-1 group-hover:text-green-700 transition-colors duration-300">{edu.description}</div>
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
