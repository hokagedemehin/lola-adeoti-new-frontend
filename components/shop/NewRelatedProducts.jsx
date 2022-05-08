import React, { useEffect, useState } from 'react';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
import { Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const NewRelatedProducts = ({ id }) => {
  const { globalCurr, setVariantColor, setVariantName } = useGlobal();
  const [finalData, setFinalData] = useState([]);

  // console.log('instanceRef :>> ', instanceRef);

  const handleProducts = async () => {
    const { data: products } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variants?populate=*`
    );
    // console.log('data', data);
    return products;
  };
  // code
  const { isSuccess, data, dataUpdatedAt } = useQuery(
    'products',
    async () => await handleProducts()
  );
  // const data3=[]
  // const data1 = data?.data.filter((elem) => elem?.id !== id);
  // // console.log(data1);
  // const data2 = shuffle(data1);
  // const data3 = data2?.slice(0, 4);
  // console.log('data :>> ', data3);
  // console.log('isSuccess :>> ', isSuccess);
  useEffect(() => {
    if (isSuccess) {
      let data1;
      if (id) {
        data1 = data?.data.filter((elem) => elem?.id !== id);
      } else {
        data1 = data?.data;
      }

      const data2 = shuffle(data1);
      const data3 = data2?.slice(0, 4);
      setFinalData(data3);
    }
    // }, [data, isSuccess, dataUpdatedAt, id]);
  }, [data, isSuccess, dataUpdatedAt, id]);

  function shuffle(array) {
    for (let i = array?.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleVariant = (elem) => {
    setVariantColor(elem?.attributes?.color);
    setVariantName(elem?.attributes?.name);
  };

  return (
    <div className='w-full'>
      <div className='relative flex flex-col space-y-5'>
        <Text className='text-center text-xl font-bold '>Related Products</Text>
        <div className=''>
          {isSuccess && (
            <Swiper
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
            >
              {finalData.length > 0 &&
                finalData.map((elem, id) => (
                  <SwiperSlide key={id} className=''>
                    <div className='flex items-center justify-center rounded-lg p-3 transition duration-300 ease-in-out'>
                      <Link
                        href={`/product/${elem?.attributes?.product?.data?.id}/${elem?.attributes?.product?.data?.attributes?.slug}`}
                        passHref
                      >
                        <a
                          className='hover:text-current'
                          onClick={() => handleVariant(elem)}
                        >
                          {/* image */}
                          <div className='relative h-36 w-36 overflow-hidden rounded-lg  sm:h-52 sm:w-52'>
                            <Image
                              src={
                                elem?.attributes?.image?.data?.attributes?.url
                              }
                              layout='fill'
                              objectFit='cover'
                              placeholder='blur'
                              blurDataURL={
                                elem?.attributes?.image?.data?.attributes
                                  ?.formats?.small?.url
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
                                {
                                  elem?.attributes?.product?.data?.attributes
                                    ?.name
                                }
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
                        </a>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewRelatedProducts;
