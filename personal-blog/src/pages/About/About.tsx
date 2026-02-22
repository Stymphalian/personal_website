import React from 'react';
import Layout from '../../components/Layout/Layout';

const About: React.FC = () => {
  return (
    <Layout
      showPageTitle
      pageTitle='About'
      pageDescription='About Jordan Yu'
      maxWidth='4xl'
      padding='lg'
    >
      <p className='text-vs-editor-text2'>This page is coming soon.</p>
    </Layout>
  );
};

export default About;
