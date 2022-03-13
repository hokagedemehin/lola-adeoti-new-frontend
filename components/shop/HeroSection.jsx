import React, { useEffect } from 'react';
import Image from 'next/image';
import anike_lady_orange from '../../public/shop/anike_lady_orange.jpg';
import { Text } from '@chakra-ui/react';
import AOS from 'aos';
// import 'aos/dist/aos.css';

const ShopHeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='flex pt-14 sm:pt-16'>
      <div className=' h-full w-full '>
        <div className='block h-[20rem] w-full sm:relative sm:h-[30rem]'>
          <Image
            src={anike_lady_orange}
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            alt='Anike Lady Orange'
          />
          <div className='inset absolute h-[20rem] w-full bg-white opacity-50 sm:h-[30rem]'></div>
        </div>

        <div className='absolute left-[20%] top-[50%] sm:left-[30%] '>
          {/* CTA Slogan */}
          <div data-aos='zoom-in' data-aos-duration='1000'>
            <Text className='text-3xl font-extrabold text-sky-900 sm:text-6xl'>
              Lola Adeoti Shop
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeroSection;
