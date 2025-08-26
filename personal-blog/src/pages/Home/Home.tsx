import React from 'react';

const Home: React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-primary'>
      {/* Home page will be implemented in task 3.1 */}
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='heading-1 text-gradient mb-6'>
            Welcome to My Portfolio
          </h1>
          <p className='body-text max-w-2xl mx-auto'>
            This is the home page where my bio and project carousel will be
            displayed. Implementation will be completed in task 3.1.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
