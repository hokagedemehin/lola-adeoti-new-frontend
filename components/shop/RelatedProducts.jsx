import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';

const RelatedProducts = ({ id }) => {
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  const { globalCurr } = useGlobal();

  // const [finalData, setFinalData] = useState([]);
  // console.log('finalData', finalData);
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          // origin: 'center',
          perView: 2,
          spacing: 15,
        },
      },
      '(min-width: 1000px)': {
        slides: {
          // origin: 'center',
          perView: 3,
          spacing: 15,
        },
      },
    },
    slides: {
      // origin: 'center',
      perView: 2,
      spacing: 15,
    },
  });

  const handleProducts = async () => {
    const { data: products } = await axios.get(
      `${URL}/api/products?populate=*`
    );
    // console.log('data', data);
    return products;
  };

  const { isSuccess, data } = useQuery(
    'products',
    async () => await handleProducts()
  );
  // const data3=[]
  const data1 = data?.data.filter((elem) => elem?.id !== id);
  // // console.log(data1);
  const data2 = shuffle(data1);
  const data3 = data2?.slice(0, 4);
  // console.log('data :>> ', data3);
  // console.log('isSuccess :>> ', isSuccess);

  function shuffle(array) {
    for (let i = array?.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className='w-full'>
      <div className='mx-2 flex flex-col space-y-5'>
        <Text className='text-xl font-bold'>Related Products</Text>
        {isSuccess && (
          <div ref={sliderRef} className='keen-slider '>
            {/* {isSuccess && */}

            {data3.map((elem, id) => (
              <div key={id} className='keen-slider__slide'>
                <div className='flex items-center justify-center rounded-lg p-3 transition duration-300 ease-in-out'>
                  <Link
                    href={`/product/${elem?.id}/${elem?.attributes?.slug}`}
                    passHref
                  >
                    <a className='hover:text-current'>
                      {/* image */}
                      <div className='relative h-36 w-36 overflow-hidden rounded-lg  sm:h-52 sm:w-52'>
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
                                className='text-sm font-semibold text-gray-400'
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
                                className='text-sm font-semibold text-gray-400'
                              >
                                &#x24;{elem?.attributes?.dollarPrice}
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* slect option */}
                      <div className='flex  pt-4'>
                        <div
                          // onClick={() => handleActive('shop')}
                          className='flex items-center justify-center rounded-lg bg-teal-500 px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 hover:text-white hover:shadow-md hover:shadow-teal-200 active:scale-90 active:shadow-md active:shadow-gray-400 sm:px-4 sm:py-2 '
                        >
                          Select Options
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
