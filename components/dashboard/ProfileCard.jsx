import { Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import no_login from '../../public/dashboard/no_login.svg';

const ProfileCard = () => {
  return (
    <div>
      <div>
        <div className='flex flex-col items-center justify-center sm:space-y-5'>
          <div className='sm:h:80 relative h-56 w-56 sm:w-80'>
            <Image
              src={no_login}
              layout='fill'
              // loading='lazy'
              objectFit='contain'
              alt='No Order'
              className='h-full w-full object-cover object-center'
              placeholder='blur'
              blurDataURL={no_login}
            />
          </div>
          <Text className='text-center text-xl font-bold sm:text-2xl'>
            No Profile Data
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
