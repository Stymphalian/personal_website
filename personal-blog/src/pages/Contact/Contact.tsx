import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import React from 'react';

const Contact: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:jordanyu1992@gmail.com';
  };

  const handleGithubClick = () => {
    window.open('https://github.com/stymphalian', '_blank');
  };

  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/jordanu92', '_blank');
  };

  return (
    <div className='min-h-screen bg-gradient-secondary pt-16'>
      <div className='container mx-auto px-4 py-6'>
        <div className='text-center mb-6 md:mb-8'>
          <h1 className='heading-1 mb-3 md:mb-4 text-3xl md:text-4xl lg:text-5xl'>Get In Touch</h1>
          <p className='body-text max-w-2xl mx-auto px-4 text-sm md:text-base'>
            I'm always interested in hearing about new opportunities,
            interesting projects, or just want to say hello. Feel free to reach out!
          </p>
        </div>

        <div className='max-w-4xl mx-auto px-4'>
          {/* Contact Information Cards */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
            {/* Personal Contact */}
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/10'>
              <h2 className='heading-2 mb-3 md:mb-4 text-center text-xl md:text-2xl'>Personal Contact</h2>
              <div className='space-y-2 md:space-y-3'>
                <button
                  onClick={handleEmailClick}
                  className='flex items-center space-x-3 w-full p-2 md:p-3 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 group cursor-pointer'
                  title='Click to send email'
                >
                  <Mail className='w-4 h-4 md:w-5 md:h-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                  <span className='body-text group-hover:text-blue-300 transition-colors duration-200 text-sm md:text-base truncate'>
                    jordanyu1992@gmail.com
                  </span>
                  <div className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <Mail className='w-3 h-3 text-blue-400' />
                  </div>
                </button>
                <div className='flex items-center space-x-3 p-2 md:p-3 rounded-lg hover:bg-white/5 transition-colors duration-200'>
                  <MapPin className='w-4 h-4 md:w-5 md:h-5 text-red-400 flex-shrink-0' />
                  <span className='body-text text-sm md:text-base'>Canada</span>
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/10'>
              <h2 className='heading-2 mb-3 md:mb-4 text-center text-xl md:text-2xl'>Professional Links</h2>
              <div className='space-y-2 md:space-y-3'>
                <button
                  onClick={handleGithubClick}
                  className='flex items-center space-x-3 w-full p-2 md:p-3 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 group cursor-pointer'
                  title='Click to visit GitHub profile'
                >
                  <Github className='w-4 h-4 md:w-5 md:h-5 text-gray-300 flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                  <span className='body-text group-hover:text-gray-200 transition-colors duration-200 text-sm md:text-base truncate'>
                    github.com/stymphalian
                  </span>
                  <div className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <Github className='w-3 h-3 text-gray-300' />
                  </div>
                </button>
                <button
                  onClick={handleLinkedinClick}
                  className='flex items-center space-x-3 w-full p-2 md:p-3 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-200 group cursor-pointer'
                  title='Click to visit LinkedIn profile'
                >
                  <Linkedin className='w-4 h-4 md:w-5 md:h-5 text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200' />
                  <span className='body-text group-hover:text-blue-400 transition-colors duration-200 text-sm md:text-base truncate'>
                    linkedin.com/in/jordanu92
                  </span>
                  <div className='ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <Linkedin className='w-3 h-3 text-blue-500' />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
