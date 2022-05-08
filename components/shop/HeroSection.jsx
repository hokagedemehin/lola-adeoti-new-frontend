import React, { useEffect } from 'react';
// import Image from 'next/image';
// import anike_lady_orange from '../../public/shop/anike_lady_orange.jpg';
import { Text } from '@chakra-ui/react';
import AOS from 'aos';
// import 'aos/dist/aos.css';

const ShopHeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='flex '>
      <div
        className='relative h-full w-full bg-fixed bg-left bg-no-repeat'
        // style={{ backgroundImage: `url(/${anike_lady_orange})` }}
        style={{ backgroundImage: `url(/shop/anike_lady_orange.jpg` }}
      >
        <div className='absolute inset-0 h-[10rem] w-full bg-white opacity-50 sm:h-[20rem]'></div>
        <div className=' relative h-[10rem] w-full sm:h-[20rem]'>
          {/* <Image
            src={anike_lady_orange}
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            alt='Anike Lady Orange'
          /> */}
          {/* <div className='inset absolute h-[10rem] w-full bg-white opacity-50 sm:h-[20rem]'></div> */}
          {/* <div className='absolute inset-0 h-[10rem] w-full bg-black opacity-50 sm:h-[20rem]'></div> */}
        </div>

        <div className='absolute inset-x-1/4 top-1/2 w-full '>
          {/* CTA Slogan */}
          <div data-aos='zoom-in' data-aos-duration='1000'>
            <Text className='text-3xl font-extrabold text-sky-700 sm:text-5xl'>
              Lola Adeoti Shop
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeroSection;
