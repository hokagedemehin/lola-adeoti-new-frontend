import React, { useEffect } from 'react';
import Image from 'next/image';
import olaedo_babe_blue from '../../public/home/olaedo_babe_blue.jpg';
import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import AOS from 'aos';
// import 'aos/dist/aos.css';

const HeroSection = () => {
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='flex pt-14 sm:pt-16'>
      <div className=' h-full w-full '>
        <div className='hidden h-[25rem] w-full sm:relative sm:block sm:h-[40rem]'>
          <Image
            src={olaedo_babe_blue}
            layout='fill'
            objectFit='contain'
            placeholder='blur'
            alt='Ola Edo Bag'
            // className='hidden'
            objectPosition='right'
            // style={{ display: 'none' }}
          />
          <div className='inset absolute h-[25rem] w-full bg-white opacity-25 sm:h-[40rem]'></div>
        </div>
        <div className='relative block h-[25rem] w-full sm:hidden sm:h-[40rem]'>
          <Image
            src={olaedo_babe_blue}
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            alt='Ola Edo Bag'
            // className='hidden'
            objectPosition='right'
            // style={{ display: 'none' }}
          />
          <div className='inset absolute h-[25rem] w-full bg-white opacity-25 sm:h-[40rem]'></div>
        </div>
        <div className='absolute left-[10%] top-[30%] space-y-4  sm:top-[20%]'>
          {/* CTA Slogan */}
          <div data-aos='zoom-in' data-aos-duration='1000'>
            <Text className='text-3xl font-extrabold  sm:text-6xl'>
              Classic and Stylish
            </Text>
            <Text className='text-3xl font-extrabold  sm:text-6xl'>
              All-Purpose Bags
            </Text>
          </div>
          {/* CTA Subtext */}
          <div
            data-aos='fade-right'
            data-aos-duration='1000'
            data-aos-delay='500'
          >
            <Text className='font-semibold sm:text-left sm:text-xl sm:text-gray-700'>
              Hand made to perfection and 100% genuine
            </Text>
          </div>
          {/* CTA button */}
          <div
            data-aos='fade-up'
            data-aos-duration='1000'
            data-aos-delay='1000'
            className=' flex space-x-2 pt-5 sm:pt-10'
          >
            <Link href='/shop' passHref>
              <a
                onClick={() => handleActive('shop')}
                className='flex items-center justify-center rounded-lg bg-yellow-400 px-4 py-1  font-semibold text-black ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-black hover:shadow-md hover:shadow-gray-600 active:scale-100 active:shadow-md active:shadow-gray-600 sm:px-6 sm:py-2 sm:text-lg'
              >
                Shop Collection
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
