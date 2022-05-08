import { Text } from '@chakra-ui/react';
import Aos from 'aos';
// import Image from 'next/image';
import React, { useEffect } from 'react';
// import jd_laptop_cream from '../../public/dashboard/jd_laptop_cream.jpg';
const NewDashboardHero = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className='mt-14 flex items-center justify-center bg-slate-200'>
      <div className=''>
        {/* CTA Slogan */}
        <div data-aos='zoom-in' data-aos-duration='1000'>
          <Text className='bg-gradient-to-r from-teal-600 to-yellow-500 bg-clip-text py-12 text-3xl font-extrabold text-transparent  sm:text-5xl md:py-24'>
            My Dashboard
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NewDashboardHero;
