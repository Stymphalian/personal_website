import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-secondary'>
      {/* Contact page will be implemented in task 6.1 */}
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='heading-1 mb-6'>Get In Touch</h1>
          <p className='body-text max-w-2xl mx-auto mb-8'>
            This page will display my contact information and links.
            Implementation will be completed in task 6.1.
          </p>
          <div className='max-w-md mx-auto'>
            {/* Contact information will be displayed here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
