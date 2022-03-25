import { Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import model1 from '../../public/about/model1.jpeg';
const AboutDetails = () => {
  const handleActive = (val) => {
    localStorage.setItem('active', val);
  };

  return (
    <div className='mb-10'>
      <div className='mx-auto flex max-w-screen-xl flex-col-reverse justify-center space-x-0 lg:flex-row lg:space-x-5'>
        {/* discription | Button */}
        <div className='flex flex-col justify-between'>
          {/* Description */}
          <div className=' flex flex-col items-center pt-4'>
            <Text className='pb-4 text-center text-2xl font-black sm:text-4xl lg:pb-8'>
              Lola Adeoti Bags
            </Text>
            <div className='mx-auto flex max-w-2xl flex-col space-y-3 lg:max-w-[90rem] lg:space-y-4'>
              <Text className='lg:text-lg'>
                Lola Adeoti is a genuine leather brand that designs and produces
                genuine leather bags for the modern day individual. Our bags are
                for men and women who value quality and to maintain this
                standard, we produce all our bags with genuine leather.
              </Text>
              <Text className='lg:text-lg'>
                All our products are made from scratch, choosing exquisite
                leather and then step by step, gently transforming them into a
                masterpiece for the modern day Individual. We pride ourselves in
                our ability to make great pieces that you would love and would
                stand the test of time.
              </Text>
              <Text className='lg:text-lg'>
                Our bags are great gifts, and people all over the world ask our
                customers how to purchase unique pieces. Each piece is made with
                lots of love and particularly tailored towards the needs of the
                modern day individual.
              </Text>
              <Text className='lg:text-lg'>
                Lola Adeoti is very passionate about showcasing the expertise of
                African artisans and because of this, we stay true to producing
                within the shores of Africa
              </Text>
            </div>
          </div>

          {/* Button */}
          <div className='lg: mt-6 flex justify-center sm:justify-start'>
            <Link href='/shop' passHref>
              <a
                onClick={() => handleActive('shop')}
                className='flex items-center justify-center rounded-lg bg-yellow-400 px-6 py-3  font-semibold text-black ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-black hover:shadow-md hover:shadow-gray-600 active:scale-90 active:shadow-md active:shadow-gray-600 sm:px-8 sm:py-4 sm:text-lg'
              >
                Shop Collection
              </a>
            </Link>
          </div>
        </div>

        {/* model image */}
        <div className='hidden w-full lg:block'>
          {/* large screens */}
          <div className='relative h-[40rem] w-full overflow-hidden rounded-lg'>
            <Image
              src={model1}
              layout='fill'
              objectFit='cover'
              placeholder='blur'
              alt='Lola Adeoti Models'
              className='transition delay-150 duration-500 ease-in-out hover:scale-110'
            />
          </div>
        </div>
        {/* small screens */}
        <div className='block w-full lg:hidden'>
          <div className='relative h-[30rem] w-full overflow-hidden rounded-lg'>
            <Image
              src={model1}
              layout='fill'
              objectFit='contain'
              placeholder='blur'
              alt='Lola Adeoti Models'
              className='transition delay-150 duration-500 ease-in-out hover:scale-110'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;
