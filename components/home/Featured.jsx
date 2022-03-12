import { Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Image from 'next/image';

const Featured = ({ data }) => {
  console.log('data :>> ', data[0]);
  console.log('variants :>> ', data[0]?.attributes?.variants?.data);

  useEffect(() => {
    // const val = localStorage.getItem('active');
    // setActive(val);
    // AOS.init();
  }, []);

  return (
    <div className='pt-10 sm:pt-20'>
      <div className='space-y-1 pb-10 text-center sm:space-y-3 '>
        <Text className=' text-xl font-black  sm:text-4xl'>
          Featured Products
        </Text>
        <Text className='text-sm sm:text-lg '>
          Best deals on some of our bags
        </Text>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4 space-y-3'>
        {data &&
          data.map((elem, id) => (
            <div key={id} className='flex flex-col'>
              <div className='flex w-fit '>
                {/* image */}
                <div className='relative h-40 w-40'>
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
                    className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                  />
                </div>
                {/* color pallet */}
                <div className='grid h-fit grid-cols-5 flex-wrap gap-2 pl-2 text-white '>
                  {/* <Text>Colors</Text> */}
                  {elem?.attributes?.variants?.data.map((val, id) => (
                    <div
                      key={id}
                      style={{ backgroundColor: val?.attributes?.hex }}
                      className='h-5 w-5 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-6 sm:w-6'
                    >
                      {/* <div></div> */}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex'>
                {/* name & price */}
                <div className='flex flex-col'>
                  <Text className='font-semibold sm:text-lg '>
                    {elem?.attributes?.name}
                  </Text>
                  <Text>
                    {
                      elem?.attributes?.variants?.data[id]?.attributes
                        ?.nairaPrice
                    }
                  </Text>
                  <Text>
                    {
                      elem?.attributes?.variants?.data[id]?.attributes
                        ?.dollarPrice
                    }
                  </Text>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Featured;
