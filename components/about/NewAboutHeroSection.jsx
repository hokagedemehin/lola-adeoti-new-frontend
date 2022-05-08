import React, { useEffect } from 'react';
import Aos from 'aos';
// import Image from 'next/image';
import { Text } from '@chakra-ui/react';
// import olanmma_bw_2 from '../../public/about/olanmma_bw_2.jpeg';
const AboutHeroSection = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className='mt-14 flex items-center justify-center bg-slate-200'>
      <div className=''>
        {/* CTA Slogan */}
        <div data-aos='zoom-in' data-aos-duration='1000'>
          <Text className='bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text py-12 text-3xl font-extrabold text-transparent  sm:text-5xl md:py-24'>
            About Us
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AboutHeroSection;

/**
 * <div>
      <div className='flex pt-14 sm:pt-16'>
        <div className='relative h-full w-full '>
          <div className=' relative h-[20rem] w-full sm:h-[30rem]'>
            <Image
              src={olanmma_bw_2}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              alt='JD Laptop Cream COlor'
            />
            <div className='inset absolute h-[20rem] w-full bg-white opacity-70 sm:h-[30rem]'></div>
          </div>

          <div className='absolute left-[30%] top-[40%] sm:left-[35%] '>
            
            <div data-aos='zoom-in' data-aos-duration='1000'>
              <Text className='text-center text-3xl font-extrabold text-sky-900 sm:text-6xl'>
                About Us
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
 */
