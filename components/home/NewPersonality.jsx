import React from 'react';
// import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Text } from '@chakra-ui/react';
import Image from 'next/image';

const NewPersonalitySection = ({ data }) => {
  // console.log('data :>> ', data);
  return (
    <div className='pt-10 sm:pt-20'>
      <div className='space-y-1 pb-10 text-center sm:space-y-3 '>
        <Text className=' text-xl font-black  sm:text-4xl'>
          Bags That Match Your Personality
        </Text>
        <Text className='pb-5 text-sm sm:text-lg'>
          There is a unique bag for everyone
        </Text>
        <div className='mx-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6'>
          {data &&
            data.map((elem, id) => (
              <div
                className='relative flex h-[15rem] w-full items-center justify-center overflow-hidden rounded-md bg-blue-200  sm:h-[20rem] md:h-[30rem] lg:h-[35rem]'
                key={id}
              >
                <Image
                  src={elem?.attributes?.image?.data?.attributes?.url}
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  blurDataURL={
                    elem?.attributes?.image?.data?.attributes?.formats?.small
                      ?.url
                  }
                  alt={elem?.attributes?.name}
                />
                <div className='inset absolute h-[15rem] w-full bg-gradient-to-t from-black via-transparent opacity-60 sm:h-[20rem] md:h-[30rem]  lg:h-[35rem]'></div>
                <div className='absolute inset-x-0 bottom-7 space-y-1 px-10 text-white sm:space-y-3'>
                  <Text className='text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl'>
                    {elem?.attributes?.name}
                  </Text>
                  <Text className='text-xs sm:text-lg md:text-xl'>
                    {elem?.attributes?.description}
                  </Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewPersonalitySection;

/**
 * <div
          className='keen-slider__slide number-slide2 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-yellow-200 text-2xl font-bold sm:h-[30rem]
      '
        >
          2
        </div>
        <div
          className='keen-slider__slide number-slide3 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
      '
        >
          3
        </div>
        <div
          className='keen-slider__slide number-slide4 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-cyan-200 text-2xl font-bold sm:h-[30rem]
       '
        >
          4
        </div>
        <div
          className='keen-slider__slide number-slide5 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-red-200 text-2xl font-bold sm:h-[30rem]
      '
        >
          5
        </div>
        
 */
