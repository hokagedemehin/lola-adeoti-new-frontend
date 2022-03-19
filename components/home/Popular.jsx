import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';
// import { BsHandbagFill } from 'react-icons/bs';
import Link from 'next/link';

const Popular = ({ data }) => {
  /**
   * *when the color is selected a a function sets the following state (price, quantity, image)
   */
  const { globalCurr } = useGlobal();
  // console.log('globalCurr :>> ', globalCurr);
  // console.log('data :>> ', data[0]);
  // console.log('variants :>> ', data[0]?.attributes?.variants?.data[0]);
  const [varImg, setVarImg] = useState(null);
  const [varName, setVarName] = useState(null);
  // console.log('varName :>> ', varName);
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };

  const handleVariant = (val, elem) => {
    setVarImg(val?.attributes?.image?.data?.attributes?.url);
    setVarName(elem?.attributes?.name);
  };
  return (
    <div className='pt-10 pb-10 sm:pt-20'>
      <div className='space-y-1 pb-10 text-center sm:space-y-3 '>
        <Text className=' text-xl font-black  sm:text-4xl'>
          Popular Handbags
        </Text>
        <Text className='text-sm sm:text-lg '>
          Durable bags that sells fast
        </Text>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {data &&
          data.map((elem, id) => (
            <div
              data-aos='flip-right'
              data-aos-duration='2000'
              data-aos-easing='ease-in-out'
              key={id}
              className='flex flex-col'
            >
              {/* image | name | price | color pallet */}
              <div className='flex space-x-2'>
                {/* image & name & price */}
                <div className='flex  flex-col  '>
                  {/* image */}
                  <div className='relative h-40 w-40'>
                    <Image
                      src={
                        varImg && varName == elem?.attributes?.name
                          ? varImg
                          : elem?.attributes?.image?.data?.attributes?.url
                      }
                      layout='fill'
                      objectFit='cover'
                      placeholder='blur'
                      blurDataURL={
                        elem?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url
                      }
                      alt={elem?.attributes?.name}
                      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                    />
                  </div>

                  {/* name & price */}
                  <div className='flex'>
                    {/* name */}
                    <div className='flex flex-col'>
                      <Text className='font-semibold sm:text-xl '>
                        {elem?.attributes?.name}
                      </Text>
                      {/* price */}
                      {globalCurr == 'naira' ? (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#8358;{elem?.attributes?.nairaSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              elem?.attributes?.nairaSalePrice ==
                              elem?.attributes?.nairaPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#8358;{elem?.attributes?.nairaPrice}
                          </Text>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#x24;{elem?.attributes?.dollarSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              elem?.attributes?.dollarSalePrice ==
                              elem?.attributes?.dollarPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#x24;{elem?.attributes?.dollarPrice}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* color pallet */}
                <div className='grid h-fit grid-cols-5 flex-wrap gap-2 pl-2 text-white '>
                  {elem?.attributes?.variants?.data.map((val, id) => (
                    <div
                      key={id}
                      style={{ backgroundColor: val?.attributes?.hex }}
                      onClick={() => handleVariant(val, elem)}
                      className='h-5 w-5 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-6 sm:w-6'
                    ></div>
                  ))}
                </div>
              </div>
              {/* select options */}
              <div className='flex  pt-4'>
                <Link
                  href={`/product/${elem?.id}/${elem?.attributes?.slug}`}
                  passHref
                >
                  <a
                    onClick={() => handleActive('shop')}
                    className='flex items-center justify-center rounded-lg bg-teal-500 px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 hover:text-white hover:shadow-md hover:shadow-teal-200 active:scale-90 active:shadow-md active:shadow-gray-400 sm:px-4 sm:py-2 '
                  >
                    Select Options
                  </a>
                </Link>
              </div>
            </div>
          ))}
        <Link href='/shop' passHref>
          <a
            onClick={() => handleActive('shop')}
            className='flex items-center justify-center rounded-lg bg-gray-200   px-16 py-10 font-semibold text-black ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-black hover:shadow-md hover:shadow-gray-600 active:scale-90 active:shadow-md active:shadow-gray-600 sm:text-lg'
          >
            View More 👉🏽
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Popular;
