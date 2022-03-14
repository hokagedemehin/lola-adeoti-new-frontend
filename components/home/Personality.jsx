import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Text } from '@chakra-ui/react';
import Image from 'next/image';

const PersonalitySection = ({ data }) => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          origin: 'center',
          perView: 2,
          spacing: 15,
        },
      },
    },
    slides: {
      origin: 'center',
      perView: 1,
      spacing: 15,
    },
  });
  // console.log('data :>> ', data);
  return (
    <div className='pt-10 sm:pt-20'>
      <div className='space-y-1 pb-10 text-center sm:space-y-3 '>
        <Text className=' text-xl font-black  sm:text-4xl'>
          Bags That Match Your Personality
        </Text>
        <Text className='text-sm sm:text-lg '>
          There is a unique bag for everyone
        </Text>
      </div>
      <div ref={sliderRef} className='keen-slider'>
        {data &&
          data.map((elem, id) => (
            <div
              key={id}
              className=' keen-slider__slide number-slide1 relative flex h-[25rem] w-[20rem] items-center  justify-center bg-blue-200  sm:h-[30rem] '
            >
              <Image
                src={elem?.attributes?.image?.data?.attributes?.url}
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                blurDataURL={
                  elem?.attributes?.image?.data?.attributes?.formats?.small?.url
                }
                alt={elem?.attributes?.name}
              />
              <div className='inset absolute h-[25rem] w-full bg-gradient-to-t from-black  opacity-60 sm:h-[30rem]'></div>
              <div className='absolute inset-x-0 bottom-7 space-y-3 px-10 text-white'>
                <Text className=' text-3xl font-bold sm:text-4xl'>
                  {elem?.attributes?.name}
                </Text>
                <Text className=' sm:text-xl'>
                  {elem?.attributes?.description}
                </Text>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PersonalitySection;

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
