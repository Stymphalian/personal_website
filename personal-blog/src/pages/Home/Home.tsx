import React from 'react';
import Headshot from '../../components/Headshot';
import Layout from '../../components/Layout/Layout';
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel';
import { getFeaturedProjects } from '../../data/projects';

const Home: React.FC = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <Layout 
      showPageTitle 
      pageTitle="Welcome to My Portfolio" 
      pageDescription="Full-stack developer passionate about creating innovative web solutions"
      maxWidth="4xl"
      padding="lg"
    >
      <div className="space-y-12">
        {/* Hero Section with Headshot */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Professional Headshot */}
          <div className="flex-shrink-0">
            <Headshot
              src="/headshot.jpg"
              alt="Professional headshot"
              size="lg"
              className="lg:w-64 lg:h-64"
            />
          </div>
          
          {/* Bio Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hi, I'm <span className="text-blue-600">Your Name</span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-4">
              Full-Stack Developer & Software Engineer
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              I specialize in building modern web applications using React, Node.js, and cloud technologies. 
              With a passion for clean code, exceptional user experience, and scalable architecture, 
              I transform ideas into robust digital solutions that make a difference.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                View My Work
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technical Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-blue-600 text-2xl mb-3">🎨</div>
              <div className="text-blue-600 font-bold text-lg mb-2">Frontend</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>React & TypeScript</div>
                <div>Tailwind CSS</div>
                <div>Next.js & Vite</div>
                <div>Responsive Design</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-green-600 text-2xl mb-3">⚙️</div>
              <div className="text-green-600 font-bold text-lg mb-2">Backend</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Node.js & Express</div>
                <div>Python & Django</div>
                <div>RESTful APIs</div>
                <div>GraphQL</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-purple-600 text-2xl mb-3">🗄️</div>
              <div className="text-purple-600 font-bold text-lg mb-2">Database</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>PostgreSQL</div>
                <div>MongoDB</div>
                <div>Redis</div>
                <div>Data Modeling</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-orange-600 text-2xl mb-3">🚀</div>
              <div className="text-orange-600 font-bold text-lg mb-2">DevOps</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Docker & Kubernetes</div>
                <div>AWS & Cloud</div>
                <div>CI/CD Pipelines</div>
                <div>Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Projects</h3>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Here are some of my recent projects that showcase different aspects of modern web development. 
            Each project demonstrates my skills in frontend, backend, and full-stack development.
          </p>
          <ProjectCarousel projects={featuredProjects} />
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Projects
            </button>
          </div>
        </div>

        {/* Experience & Education Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Experience</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="font-semibold text-gray-800">Senior Developer</div>
                <div className="text-sm text-gray-600">Tech Company • 2022-Present</div>
                <div className="text-sm text-gray-500 mt-1">Leading development teams and architecting scalable solutions</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="font-semibold text-gray-800">Full-Stack Developer</div>
                <div className="text-sm text-gray-600">Startup • 2020-2022</div>
                <div className="text-sm text-gray-500 mt-1">Built and deployed multiple web applications from concept to production</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Education & Certifications</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="font-semibold text-gray-800">Computer Science Degree</div>
                <div className="text-sm text-gray-600">University • 2016-2020</div>
                <div className="text-sm text-gray-500 mt-1">Focused on software engineering and web technologies</div>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <div className="font-semibold text-gray-800">AWS Certified Developer</div>
                <div className="text-sm text-gray-600">Amazon Web Services • 2023</div>
                <div className="text-sm text-gray-500 mt-1">Professional cloud development and deployment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always interested in new opportunities, exciting projects, and collaborating with innovative teams. 
            Whether you need a full-stack developer, technical consultant, or just want to discuss technology, let's connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
              Get In Touch
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
