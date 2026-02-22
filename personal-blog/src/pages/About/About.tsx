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
      <div className='space-y-6 text-vs-editor-text2 text-base leading-relaxed'>
        <p>
          Hi, I'm Jordan — a software developer based in Vancouver, Canada,
          where I spend my days building scalable backends for SaaS companies.
          I've been writing software professionally for over a decade, with most
          of that time focused on distributed systems, payments infrastructure,
          and developer tooling.
        </p>
        <p>
          My one big stint in Silicon Valley was at Google, where I spent five
          years working on two very different problems: building conversational
          AI and chatbot infrastructure for Dialogflow and Google Assistant, and
          developing internal tooling for AdSpam detection. It was a formative
          stretch that taught me a lot about building systems that have to work
          at scale, all the time.
        </p>
        <p>
          I'm an engineer by profession, but in my heart I'm a programmer,
          gamer, runner, and anime fan. Online you'll find me as{' '}
          <a
            href='https://github.com/stymphalian'
            target='_blank'
            rel='noopener noreferrer'
            className='text-crystal-blue-400 hover:text-crystal-blue-300 underline'
          >
            Stymphalian
          </a>
          . I'm always on the lookout for interesting new projects to hack on,
          new things to learn, and fun games to sink hours into.
        </p>
        <p>
          This site is part portfolio and part my little corner of the internet
          — a place to share the projects I've built and the things I've picked
          up along the way.
        </p>
      </div>
    </Layout>
  );
};

export default About;
