import { Input, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobal } from '../../utils/context/GlobalData';
// import { Pagination } from 'antd';
import empty_search from '../../public/shop/empty_search.png';

const NewProductList = ({ data }) => {
  /**
   * *? the data taken from index page
   * *? searching by name is implemented
   * *? pagination of all the data is implemented
   * ? large screens 3 columns 2 rows
   * ? small screens 2 columns 3 rows
   */
  const { globalCurr } = useGlobal();
  shuffle(data);
  let [newData, setNewData] = useState(data);
  let data1 = [];
  // #####################################
  // * filter the data and slice it by pagesize afterwards
  // ########################################
  const handleSearch = (e) => {
    let searchValue = e.target.value;
    data1 = data.filter((val) => {
      if (searchValue == '' || searchValue.length === 0) {
        return val;
      } else if (
        val?.attributes?.name &&
        val?.attributes?.name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return val;
      }
    });
    shuffle(data1);
    setNewData(data1);
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className='mx-auto max-w-screen-lg pt-5 pb-5 sm:pt-10'>
      {/* search and sort */}
      <div className='flex w-fit space-x-4'>
        {/* search */}
        <Input
          id='search'
          name='search'
          type='search'
          placeholder='🔍 Search Products...'
          onChange={(e) => handleSearch(e)}
        />
        {/* sort */}
        <Select placeholder='Default sorting'>
          <option value='popular'>Sort by popularity</option>
          <option value='rating'>Sort by average rating</option>
          <option value='latest'>Sort by latest</option>
          <option value='price_low'>Sort by price: low to high</option>
          <option value='price_high'>Sort by price: high to low</option>
        </Select>
      </div>
      {/* product list */}
      <div className=' flex flex-wrap items-center justify-center gap-5 py-4'>
        {newData &&
          newData.map((elem, id) => (
            <div
              data-aos='fade-up'
              data-aos-duration='1000'
              data-aos-easing='ease-in-out'
              key={id}
              className='flex rounded-lg p-3 transition duration-300 ease-in-out'
            >
              <Link
                href={`/product/${elem?.id}/${elem?.attributes?.name
                  .split('-')[0]
                  .trim()}/${elem?.attributes?.name.split('-')[1].trim()}`}
                passHref
              >
                <a className='hover:text-current'>
                  {/* image */}
                  <div className='relative h-36 w-36 sm:h-52 sm:w-52'>
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
                          <div className='flex h-7 w-7 items-center justify-center rounded-full border border-white bg-yellow-500 text-center text-[10px] font-semibold text-black sm:h-10 sm:w-10 sm:text-base'>
                            Sale
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* name & price */}
                  <div className='flex'>
                    {/* name */}
                    <div className='flex flex-col'>
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
                  {/* select option */}
                  {/* <div className='flex  pt-4'>
                    <div
                      // onClick={() => handleActive('shop')}
                      className='flex items-center justify-center rounded-lg bg-teal-500 px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 hover:text-white hover:shadow-md hover:shadow-teal-200 active:scale-90 active:shadow-md active:shadow-gray-400 sm:px-4 sm:py-2 '
                    >
                      Select Options
                    </div>
                  </div> */}
                </a>
              </Link>
            </div>
          ))}

        {newData.length === 0 && (
          <div className='flex flex-col'>
            <div className='relative flex h-80 w-80'>
              <Image
                src={empty_search}
                layout='fill'
                objectFit='contain'
                placeholder='blur'
                // blurDataURL={
                //   elem?.attributes?.image?.data?.attributes?.formats?.small
                //     ?.url
                // }
                alt='Empty Search'
                className=''
              />
            </div>
            <Text className='text-center text-xl font-bold'>
              No Search Result
            </Text>
          </div>
        )}
      </div>
      {/* <div className='flex items-center justify-center pt-5'>
        <Pagination
          onChange={handleChange}
          current={currentPage}
          // defaultPageSize={1}
          pageSize={pageSiz}
          total={totalPages}
          responsive={true}
          // showTotal={(total) => `${total} items`}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          hideOnSinglePage
          // showLessItems
        />
      </div> */}
    </div>
  );
};

export default NewProductList;
