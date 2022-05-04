import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import AOS from 'aos';
// import 'aos/dist/aos.css';

const NewShopHeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='mt-14 flex items-center justify-center bg-slate-300  md:mt-36'>
      <div className=''>
        {/* CTA Slogan */}
        <div data-aos='zoom-in' data-aos-duration='1000'>
          <Text className='py-20 text-3xl font-extrabold text-black sm:text-5xl'>
            Lola Adeoti Shop
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NewShopHeroSection;
