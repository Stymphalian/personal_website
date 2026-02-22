import React from 'react';
import Layout from '../../components/Layout/Layout';

const About: React.FC = () => {
  return (
    <Layout
      showPageTitle={false}
      showPanel={false}
      pageTitle='About'
      pageDescription='About Jordan Yu'
      maxWidth='4xl'
      padding='lg'
    >
      {/* TODO: Replace with real bio content */}
      <div className='space-y-6 text-vs-editor-text2 text-base leading-relaxed'>
        <p>
          Hi, I'm Jordan — a software engineer based in Vancouver, Canada. I
          spend most of my time building web apps, tinkering with graphics
          programming, and grinding competitive programming problems.
        </p>
        <p>
          Outside of work I'm an avid gamer and anime fan. I'm always on the
          lookout for interesting new projects to hack on and things to learn.
        </p>
        <p>
          This site is my little corner of the internet where I share the
          projects I've built and the things I've learned along the way.
        </p>
      </div>
    </Layout>
  );
};

export default About;
