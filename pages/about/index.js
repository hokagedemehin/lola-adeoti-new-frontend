import React from 'react';
import AboutDetails from '../../components/about/AboutDetails';
import NewAboutHeroSection from '../../components/about/NewAboutHeroSection';
import AboutPointSection from '../../components/about/AboutPointSection';
import Layout from '../../components/layout/Layout';
// import NavBar from '../../components/navbar/NavBar';

const AboutPage = () => {
  return (
    <Layout name='About'>
      <NewAboutHeroSection />
      <div className='mx-6'>
        <AboutPointSection />
        <AboutDetails />
      </div>
    </Layout>
  );
};

export default AboutPage;
