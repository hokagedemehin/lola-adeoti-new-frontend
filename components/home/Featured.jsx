import { Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';
// import { BsHandbagFill } from 'react-icons/bs';
import Link from 'next/link';
import Aos from 'aos';

const Featured = ({ data }) => {
  /**
   * *when the color is selected a a function sets the following state (price, quantity, image)
   */
  const { globalCurr } = useGlobal();
  // console.log('globalCurr :>> ', globalCurr);
  // console.log('data :>> ', data[0]);
  // console.log('variants :>> ', data[0]?.attributes?.variants?.data[0]);
  // const [varImg, setVarImg] = useState(null);
  // const [varName, setVarName] = useState(null);
  // console.log('varName :>> ', varName);
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };

  // const handleVariant = (val, elem) => {
  //   setVarImg(val?.attributes?.image?.data?.attributes?.url);
  //   setVarName(elem?.attributes?.name);
  // };

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className='pt-10 pb-10 sm:pt-20'>
      <div className='space-y-1 pb-10 text-center sm:space-y-3 '>
        <Text className=' text-xl font-black  sm:text-4xl'>
          Featured Products
        </Text>
        <Text className='text-sm sm:text-lg '>
          Best deals on some of our bags
        </Text>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6'>
        {data &&
          data.map((elem, id) => (
            <div
              data-aos='zoom-in-right'
              data-aos-duration='2000'
              key={id}
              className='flex flex-col'
            >
              {/* image | name | price | color pallet */}
              <div className='flex space-x-2'>
                {/* image & name & price */}
                <div className='flex flex-col  '>
                  {/* image */}
                  <div className='relative h-36 w-36 overflow-hidden rounded-md sm:h-52 sm:w-52 lg:h-64 lg:w-64'>
                    <Image
                      src={elem?.attributes?.image?.data?.attributes?.url}
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
                    <div className='absolute top-2 left-2 '>
                      <div className='flex space-x-1'>
                        {elem?.attributes?.new && (
                          <Text className='flex h-7 w-7 items-center justify-center rounded-full border border-white bg-yellow-500 text-[10px] font-semibold text-black sm:h-10 sm:w-10 sm:text-base'>
                            New
                          </Text>
                        )}
                        {elem?.attributes?.sale && (
                          <div className='flex h-7 w-7 items-center justify-center rounded-full border border-white bg-yellow-500 text-[10px] font-semibold text-black sm:h-10 sm:w-10 sm:text-base'>
                            Sale
                          </div>
                        )}
                      </div>
                    </div>
                    {/* {elem?.attributes?.new && (
                      <div className='absolute top-2 left-2 rounded-xl border border-white bg-yellow-500 p-1 text-white'>
                        New
                      </div>
                    )} */}
                    {/* {elem?.attributes?.sale && (
                      <div className='absolute top-2 left-2 rounded-xl border border-white bg-yellow-500 p-1 text-white'>
                        Sale
                      </div>
                    )} */}
                  </div>

                  {/* name & price */}
                  <div className='flex'>
                    <div className='flex flex-col'>
                      {/* name */}
                      <Text className='font-semibold sm:text-xl '>
                        {elem?.attributes?.name.split('-')[0]}
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
                {/* <div className='grid h-fit grid-cols-5 flex-wrap gap-2 pl-2 text-white '>
                  {elem?.attributes?.variants?.data.map((val, id) => (
                    <div
                      key={id}
                      style={{ backgroundColor: val?.attributes?.hex }}
                      onClick={() => handleVariant(val, elem)}
                      className='h-5 w-5 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-6 sm:w-6'
                    ></div>
                  ))}
                </div> */}
              </div>
              {/* select options */}
              <div className='flex  pt-4'>
                <Link
                  href={`/product/${elem?.id}/${elem?.attributes?.slug}`}
                  passHref
                >
                  <a
                    onClick={() => handleActive('shop')}
                    className='flex items-center justify-center rounded-lg bg-black px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 hover:text-black hover:shadow-md  active:scale-90 active:shadow-md active:shadow-gray-400 sm:px-4 sm:py-2 '
                  >
                    Select Options
                  </a>
                </Link>
              </div>
            </div>
          ))}
        {/* <Link href='/shop' passHref>
          <a
            onClick={() => handleActive('shop')}
            className='flex items-center justify-center rounded-lg bg-gray-200   px-16 py-10 font-semibold text-black ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 hover:text-black hover:shadow-md hover:shadow-gray-600 active:scale-90 active:shadow-md active:shadow-gray-600 sm:text-lg'
          >
            View More 👉🏽
          </a>
        </Link> */}
      </div>
    </div>
  );
};

export default Featured;
