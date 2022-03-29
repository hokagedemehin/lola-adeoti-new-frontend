import { Circle, Text } from '@chakra-ui/react';
import React from 'react';
import {
  MdAccessTimeFilled,
  MdOutlineAlternateEmail,
  // MdSmartphone,
} from 'react-icons/md';
import { RiWhatsappFill } from 'react-icons/ri';
const ContactPoint = () => {
  return (
    <div>
      <div className='mx-auto my-10 grid max-w-screen-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {/* work hours */}
        <div className='flex flex-col items-center  space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <MdAccessTimeFilled className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>Work Hours</Text>
          <div className='space-y-1 text-base '>
            <Text className='text-center text-gray-500'>
              Monday to Friday: 24 Hours
            </Text>
            <Text className='text-center text-gray-500'>Weekend: 24 Hours</Text>
          </div>
        </div>

        {/* email */}
        <div className='flex flex-col items-center  space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <MdOutlineAlternateEmail className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>Email</Text>
          <Text className='text-center text-base text-gray-500'>
            accessorizedbylisa@gmail.com
          </Text>
        </div>

        {/* phone */}
        <div className='flex flex-col items-center space-y-4 rounded-lg border border-gray-100 p-4 transition duration-300 ease-in hover:shadow-lg'>
          <Circle size='60px' className=' bg-yellow-300'>
            <RiWhatsappFill className='text-2xl' />
          </Circle>
          <Text className='text-center text-xl font-bold'>WhatsApp Only</Text>
          <Text className='text-center text-base text-gray-500'>
            +234-807-321-8933
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ContactPoint;
