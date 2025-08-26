import React from 'react';
import Layout from '../../components/Layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout 
      showPageTitle 
      pageTitle="Welcome to My Portfolio" 
      pageDescription="Full-stack developer passionate about creating innovative web solutions"
      maxWidth="4xl"
      padding="lg"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hi, I'm a Full-Stack Developer
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I specialize in building modern web applications using React, Node.js, and cloud technologies. 
            Passionate about clean code, user experience, and scalable architecture.
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600 font-semibold">Frontend</div>
              <div className="text-sm text-gray-600">React, TypeScript, Tailwind CSS</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-green-600 font-semibold">Backend</div>
              <div className="text-sm text-gray-600">Node.js, Express, Python</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-purple-600 font-semibold">Database</div>
              <div className="text-sm text-gray-600">PostgreSQL, MongoDB, Redis</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-orange-600 font-semibold">DevOps</div>
              <div className="text-sm text-gray-600">Docker, AWS, CI/CD</div>
            </div>
          </div>
        </div>

        {/* Projects Preview */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Projects</h3>
          <p className="text-gray-600 mb-4">
            Check out some of my recent work. Each project demonstrates different aspects of modern web development.
          </p>
          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View All Projects
            </button>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Let's Work Together</h3>
          <p className="text-gray-600 mb-4">
            I'm always interested in new opportunities and exciting projects.
          </p>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
            Get In Touch
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
