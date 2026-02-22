import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='border-t border-vs-editor-border bg-vs-editor-surface mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14'>
          {/* Left: Location */}
          <span className='text-sm text-vs-editor-text2'>
            Vancouver, Canada
          </span>

          {/* Right: Social links */}
          <div className='flex items-center gap-4'>
            <a
              href='mailto:jordanyu1992@gmail.com'
              aria-label='Email'
              className='text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
            >
              <Mail size={18} />
            </a>
            <a
              href='https://www.linkedin.com/in/jordanu92/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
            >
              <Linkedin size={18} />
            </a>
            <a
              href='https://github.com/stymphalian'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
