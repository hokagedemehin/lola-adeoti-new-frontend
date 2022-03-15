import Head from 'next/head';
import React from 'react';
import Footer from '../navbar/Footer';
// import { BsArrowUpCircle } from 'react-icons/bs';
import NavBar from '../navbar/NavBar';
// import BackToTop from './BackToTop';

const Layout = ({ children, name, desc }) => {
  return (
    <div
      className='min-h-screen bg-repeat'
      style={{
        backgroundImage:
          'url(https://github.com/hokagedemehin/lola-adeoti-new-frontend/blob/main/public/logo/bag_bg_2_1.jpg?raw=true)',
      }}
    >
      <Head>
        <title>{name} | Lola Adeoti Bags & Accessories</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={desc} />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
      </Head>
      <div className='relative mx-auto flex max-w-screen-2xl flex-col'>
        <div className='fixed top-0 left-0 right-0 z-10 bg-white shadow-md'>
          <NavBar />
        </div>
        <main className='min-h-screen bg-white'>{children}</main>
        {/* <BackToTop /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
