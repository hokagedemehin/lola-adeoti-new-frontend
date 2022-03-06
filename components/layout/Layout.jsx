import Head from 'next/head';
import React from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import BackToTop from './backToTop';

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
      <div className='mx-auto flex max-w-screen-xl flex-col'>
        <main className=''>{children}</main>
        <BackToTop />
      </div>
    </div>
  );
};

export default Layout;
