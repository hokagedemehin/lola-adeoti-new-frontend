import { Text } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Error505Page() {
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <Head>
        <title>Error Page | Lola Adeoti Bags & Accessories</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='This page is not available' />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
      </Head>
      <div className='mx-auto max-w-screen-lg px-4 md:px-8'>
        <div className='grid gap-8 sm:grid-cols-2'>
          {/* <!-- content - start --> */}
          <div className='flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32'>
            <Text className='mb-4 text-sm font-bold uppercase text-indigo-500 sm:text-xl'>
              🚧 505 Oops... 🚧
            </Text>
            <Text className='mb-2 text-center text-xl font-bold text-gray-800 sm:text-left md:text-3xl'>
              Something Went Wrong
            </Text>

            <Text className='mb-8 text-center text-sm text-gray-500 sm:text-left md:text-base'>
              Looks like this page might have been removed or is temporarily
              unavailable, kindly click the button below
            </Text>

            <Link href='/' passHref>
              <a
                onClick={() => handleActive('home')}
                className="className='inline-block rounded-lg bg-gray-200 px-8 py-3
                text-center text-sm font-semibold text-gray-500 outline-none
                ring-indigo-300 transition duration-100 hover:bg-gray-300
                hover:text-current focus-visible:ring active:text-gray-700
                md:text-base"
              >
                Go home
              </a>
            </Link>
          </div>
          {/* <!-- content - end --> */}

          {/* <!-- image - start --> */}
          <div className='relative h-80 overflow-hidden rounded-lg md:h-auto'>
            <Image
              src='/404/404_img_1.svg'
              layout='fill'
              objectFit='contain'
              alt='404 placeholder'
              className='absolute inset-0 h-full w-full object-center'
            />
          </div>
          {/* <!-- image - end --> */}
        </div>
      </div>
    </div>
  );
}
