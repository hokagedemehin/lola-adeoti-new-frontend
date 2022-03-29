import { Text } from '@chakra-ui/react';
import Aos from 'aos';
import Image from 'next/image';
import React, { useEffect } from 'react';
import idoma_lady_purple from '../../public/login/idoma_lady_purple.jpeg';
const ResetHero = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      <div className='flex pt-14 sm:pt-16'>
        <div className='relative h-full w-full '>
          <div className=' relative h-[20rem] w-full sm:h-[30rem]'>
            <Image
              src={idoma_lady_purple}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              alt='JD Laptop Cream Color'
            />
            <div className='inset absolute h-[20rem] w-full bg-white opacity-50 sm:h-[30rem]'></div>
          </div>

          <div className='absolute left-[20%] top-[40%] sm:left-[30%] '>
            {/* CTA Slogan */}
            <div data-aos='zoom-in' data-aos-duration='1000'>
              <Text className='text-3xl font-extrabold text-sky-900 sm:text-6xl'>
                Reset Page
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetHero;
