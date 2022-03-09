import Head from 'next/head';
import React from 'react';
// import { BsArrowUpCircle } from 'react-icons/bs';
import NavBar from '../navbar/NavBar';
import BackToTop from './BackToTop';

const Layout = ({ children, name, desc }) => {
  return (
    <div>
      <Head>
        <title>{name} | Lola Adeoti Bags & Accessories</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content={desc} />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        {/* <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        /> */}

        {/* <meta
          name="google-site-verification"
          content="shrWGcYhhJuGhM5foR7h_xJ8sMkmcNotSWcNhIHuNfk"
        /> */}
      </Head>
      <div className='relative mx-auto flex max-w-screen-xl flex-col'>
        <div className='fixed top-0 left-0 right-0 z-10 bg-white shadow-md'>
          <NavBar />
        </div>
        <main className=''>{children}</main>
        <BackToTop />
      </div>
    </div>
  );
};

export default Layout;
