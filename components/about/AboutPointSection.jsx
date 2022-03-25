import { Circle, Text } from '@chakra-ui/react';
import React from 'react';
import { RiStackFill } from 'react-icons/ri';
import { MdAccessTimeFilled } from 'react-icons/md';
import { FaSun } from 'react-icons/fa';
import { ImTruck } from 'react-icons/im';
const AboutPointSection = () => {
  return (
    <div>
      <div className='mx-auto my-10 grid max-w-screen-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* durability */}
        <div className='flex flex-col items-center  space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <RiStackFill className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>Durability</Text>
          <Text className='text-center text-gray-500'>
            The LolaAdeoti team designs and handcrafts leather bags using
            genuine calf leather skin and high quality hardware to ensure your
            beloved bag lasts a long time.
          </Text>
        </div>
        {/* timelessness */}
        <div className='flex flex-col items-center  space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <MdAccessTimeFilled className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>Timelessness</Text>
          <Text className='text-center text-gray-500'>
            Our bags are designed to transit trends, timeless pieces that stay
            on trend for years
          </Text>
        </div>
        {/* elegant */}
        <div className='flex flex-col items-center  space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <FaSun className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>
            Elegant & Stylish
          </Text>
          <Text className='text-center text-gray-500'>
            Different styles and colors to blend with your taste, desires and
            goals
          </Text>
        </div>
        {/* fast */}
        <div className='flex flex-col items-center space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <ImTruck className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>Fast Shipping</Text>
          <Text className='text-center text-gray-500'>
            We process, ship and deliver your handbag to you in record time
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AboutPointSection;
