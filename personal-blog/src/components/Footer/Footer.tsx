import { Github, Linkedin, Mail, Wrench } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const tools = [
  {
    label: 'Graph Editor',
    href: 'https://blog.jordanyu.com/tools/graph_editor',
  },
];

const Footer: React.FC = () => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToolsOpen(false);
      }
    };
    if (toolsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toolsOpen]);

  return (
    <footer className='border-t border-vs-editor-border bg-vs-editor-surface mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-14'>
          {/* Left: Location */}
          <span className='text-sm text-vs-editor-text2'>
            Vancouver, Canada
          </span>

          {/* Right: Social links + Tools */}
          <div className='flex items-center gap-4'>
            {/* Tools dropdown */}
            <div ref={dropdownRef} className='relative flex items-center'>
              <button
                onClick={() => setToolsOpen(prev => !prev)}
                aria-label='Tools'
                aria-expanded={toolsOpen}
                className='flex items-center text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
              >
                <Wrench size={18} />
              </button>
              {toolsOpen && (
                <div className='absolute bottom-full right-0 mb-2 min-w-[140px] bg-vs-editor-surface border border-vs-editor-border rounded-md shadow-lg py-1 z-50'>
                  {tools.map(tool => (
                    <a
                      key={tool.href}
                      href={tool.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block px-4 py-2 text-sm text-vs-editor-text hover:text-crystal-blue-400 hover:bg-vs-editor-hover transition-colors duration-150'
                      onClick={() => setToolsOpen(false)}
                    >
                      {tool.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href='mailto:jordanyu1992@gmail.com'
              aria-label='Email'
              className='flex items-center text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
            >
              <Mail size={18} />
            </a>
            <a
              href='https://www.linkedin.com/in/jordanu92/'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
              className='flex items-center text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
            >
              <Linkedin size={18} />
            </a>
            <a
              href='https://github.com/stymphalian'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
              className='flex items-center text-vs-editor-text2 hover:text-vs-editor-accent transition-colors duration-200'
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
