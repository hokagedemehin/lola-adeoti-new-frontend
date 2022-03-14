import { Input, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobal } from '../../utils/context/GlobalData';
import { Pagination } from 'antd';

const ProductList = ({ data }) => {
  /**
   * *? the data taken from index page
   * *? searching by name is implemented
   * *? pagination of all the data is implemented
   * ? large screens 3 columns 2 rows
   * ? small screens 2 columns 3 rows
   */
  // console.log('data', data);
  const { globalCurr } = useGlobal();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.length);
  console.log('searchTerm :>> ', searchTerm);

  const [pageSiz] = useState(2);

  const [fullData, setFullData] = useState(data);
  let startData = fullData.slice(0, pageSiz);
  let [newData, setNewData] = useState(startData);
  console.log('newData :>> ', newData);
  console.log('fullData', fullData);
  let data1 = [];
  // #####################################
  // * filter the data and slice it by pagesize afterwards
  // ########################################
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    let searchValue = e.target.value;
    console.log('searchValue', searchValue);
    data1 = data.filter((val) => {
      console.log('search here :>> ', searchTerm);
      if (searchValue == '' || searchValue.length === 0) {
        return val;
      } else if (
        val?.attributes?.name &&
        val?.attributes?.name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return val;
      }
    });
    console.log('data1 :>> ', data1);

    let data2 = data1.slice(0, pageSiz);
    // console.log('data2 :>> ', data2);
    setFullData(data1);
    setNewData(data2);
    setTotalPages(data1.length);
  };

  const handleChange = (page) => {
    const indexOfLast = page * pageSiz;
    const indexOfFirst = indexOfLast - pageSiz;
    setNewData(fullData.slice(indexOfFirst, indexOfLast));
    setCurrentPage(page);
  };

  return (
    <div className='pt-5 pb-5 sm:pt-10'>
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
      <div className='flex flex-wrap items-center justify-center gap-5 py-4'>
        {newData &&
          newData.map((elem, id) => (
            <div key={id} className='flex'>
              <LinkBox
                as='div'
                className='rounded-lg p-3 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-md'
              >
                {/* image */}
                <div className='relative h-36 w-36 sm:h-52 sm:w-52'>
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
                {/* select options */}
                <div className='flex  pt-4'>
                  <Link href={`/product/${elem?.attributes?.slug}`} passHref>
                    <LinkOverlay
                      // onClick={() => handleActive('shop')}
                      className='flex items-center justify-center rounded-lg bg-teal-500 px-2 py-1 font-semibold text-white  transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white hover:shadow-md hover:shadow-teal-200  sm:px-4 sm:py-2 '
                    >
                      Select Options
                    </LinkOverlay>
                  </Link>
                </div>
              </LinkBox>
            </div>
          ))}
      </div>
      <div className='flex items-center justify-center pt-5'>
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
      </div>
    </div>
  );
};

export default ProductList;