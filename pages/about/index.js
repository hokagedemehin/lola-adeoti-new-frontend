import React from 'react';
import AboutDetails from '../../components/about/AboutDetails';
import AboutHeroSection from '../../components/about/AboutHeroSection';
import AboutPointSection from '../../components/about/AboutPointSection';
import Layout from '../../components/layout/Layout';
// import NavBar from '../../components/navbar/NavBar';

const AboutPage = () => {
  return (
    <Layout name='About'>
      <AboutHeroSection />
      <div className='mx-6'>
        <AboutPointSection />
        <AboutDetails />
      </div>
    </Layout>
  );
};

export default AboutPage;
