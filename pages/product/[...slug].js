import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
// import { Image } from 'antd';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';
import { Text } from '@chakra-ui/react';
const qs = require('qs');

const ProductDetails = ({ product }) => {
  console.log('product details:>> ', product);

  const { globalCurr } = useGlobal();
  const [varImg, setVarImg] = useState(null);
  const [varName, setVarName] = useState(null);
  const [varColor, setVarColor] = useState(null);

  const handleVariant = (val, elem) => {
    setVarImg(val?.attributes?.image?.data?.attributes?.url);
    setVarName(elem?.attributes?.name);
    setVarColor(val?.attributes?.color);
  };

  return (
    <Layout
      name={`${product?.attributes?.name}`}
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className='pt-16'>
        <div className=' py-6 sm:py-8 lg:py-12'>
          <div className='mx-auto max-w-screen-lg px-4 md:px-8'>
            <div className='grid gap-8 md:grid-cols-2'>
              {/* <!-- images - start --> */}
              <div className=''>
                <div className=''></div>
                {/* large screens */}
                <div className='hidden h-full w-full md:relative md:block '>
                  <Image
                    src={
                      varImg && varName == product?.attributes?.name
                        ? varImg
                        : product?.attributes?.image?.data?.attributes?.url
                    }
                    layout='fill'
                    objectFit='contain'
                    // objectPosition='center'
                    placeholder='blur'
                    blurDataURL={
                      product?.attributes?.image?.data?.attributes?.formats
                        ?.small?.url
                    }
                    alt={product?.attributes?.name}
                    className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                  />
                </div>
                {/* small screens */}
                <div className='relative block h-72 w-full md:hidden '>
                  <Image
                    src={
                      varImg && varName == product?.attributes?.name
                        ? varImg
                        : product?.attributes?.image?.data?.attributes?.url
                    }
                    layout='fill'
                    objectFit='contain'
                    placeholder='blur'
                    blurDataURL={
                      product?.attributes?.image?.data?.attributes?.formats
                        ?.small?.url
                    }
                    alt={product?.attributes?.name}
                    className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                  />
                </div>
              </div>
              {/* <!-- images - end --> */}

              {/* <!-- content - start --> */}
              <div className='md:py-2'>
                {/* <!-- name - start --> */}
                <div className='mb-2 md:mb-3'>
                  <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
                    {product?.attributes?.name}
                  </h2>
                </div>
                {/* <!-- name - end --> */}

                {/* <!-- color - start --> */}
                <div className='mb-4 md:mb-6'>
                  <div className='mb-3 flex space-x-2 text-sm font-semibold text-gray-500 sm:text-lg'>
                    <Text>Color:</Text>
                    <Text className='text-zinc-700'>
                      {varColor ? varColor : 'Choose a color'}
                    </Text>
                  </div>
                  {/* color pallet */}
                  <div className='flex h-fit w-64 flex-wrap gap-3 pl-2 text-white '>
                    {product?.attributes?.variants?.data.map((val, id) => (
                      <div
                        key={id}
                        style={{ backgroundColor: val?.attributes?.hex }}
                        onClick={() => handleVariant(val, product)}
                        className='h-8 w-8 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-10 sm:w-10'
                      ></div>
                    ))}
                  </div>

                  {/* <div className='flex flex-wrap gap-2'>
                    <span className='h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100'></span>
                    <button
                      type='button'
                      className='h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200'
                    ></button>
                    <button
                      type='button'
                      className='h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200'
                    ></button>
                    <button
                      type='button'
                      className='h-8 w-8 rounded-full border bg-white ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200'
                    ></button>
                  </div> */}
                </div>
                {/* <!-- color - end --> */}

                {/* <!-- price - start --> */}
                <div className='mb-4'>
                  <div className='flex items-end gap-2'>
                    {globalCurr == 'naira' ? (
                      <div className='flex items-center space-x-2'>
                        <Text className='text-xl font-bold md:text-2xl'>
                          &#8358;{product?.attributes?.nairaSalePrice}
                        </Text>
                        <Text
                          as='s'
                          className='text-sm font-semibold text-gray-400'
                        >
                          &#8358;{product?.attributes?.nairaPrice}
                        </Text>
                      </div>
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <Text className='text-xl font-bold md:text-2xl'>
                          &#x24;{product?.attributes?.dollarSalePrice}
                        </Text>
                        <Text
                          as='s'
                          className='text-sm font-semibold text-gray-400'
                        >
                          &#x24;{product?.attributes?.dollarPrice}
                        </Text>
                      </div>
                    )}
                    {/* <span className='text-xl font-bold text-gray-800 md:text-2xl'>
                      $15.00
                    </span>
                    <span className='mb-0.5 text-gray-500 line-through'>
                      $30.00
                    </span> */}
                  </div>
                </div>
                {/* <!-- price - end --> */}

                {/* <!-- buttons - start --> */}
                <div className='flex gap-2.5'>
                  <a
                    href='#'
                    className='inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base'
                  >
                    Add to cart
                  </a>
                </div>
                {/* <!-- buttons - end --> */}
              </div>
              {/* <!-- content - end --> */}
            </div>
            {/* <!-- description - start --> */}
            <div className='mt-10 md:mt-16 lg:mt-20'>
              <div className='mb-3 text-lg font-semibold text-gray-800'>
                Description
              </div>
              <Text>{product?.attributes?.shortDescription}</Text>
              <br />
              {/* <br /> */}
              <Text>{product?.attributes?.description}</Text>
              {/* <p className='text-gray-500'>
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random or otherwise generated. It may be
                used to display a sample of fonts or generate text for testing.
                <br />
                <br />
                This is a section of some simple filler text, also known as
                placeholder text. It shares some characteristics of a real
                written text but is random or otherwise generated.
              </p> */}
            </div>
            {/* <!-- description - end --> */}
          </div>
        </div>
      </div>
    </Layout>
    // <div className='pt-20'>Productdetails</div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';
  const { data } = await axios.get(`${URL}/api/products`);

  const paths = data.data.map((product) => ({
    params: { slug: [product?.id.toString(), product?.attributes?.slug] },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // console.log(params);
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  const queryPopulate = qs.stringify(
    {
      populate: ['image', 'variants.image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  // let product = await axios.get(`${URL}/api/products?${queryPopulate}`);
  const { data } = await axios.get(
    `${URL}/api/products/${params.slug[0]}?${queryPopulate}`
  );
  if (!data?.data) {
    return { notFound: true };
  }
  // console.log('data', data);
  return {
    props: {
      product: data.data,
    },
    revalidate: 10,
  };
}

// // import {getServerSideSitemap} from 'next-sitemap'
// export async function getServerSideProps({ params }) {
//   const URL =
//     process.env.NODE_ENV !== 'production'
//       ? 'http://localhost:1337'
//       : 'https://lola-adeoti-new-backend.herokuapp.com';

//   const queryPopulate = qs.stringify(
//     {
//       populate: ['image', 'variants.image'],
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   );

//   const { data } = await axios.get(
//     `${URL}/api/products/${params.slug[0]}?${queryPopulate}`
//   );
//   if (!data?.data) {
//     return { notFound: true };
//   }
//   // console.log('data', data);

//   return {
//     props: { product: data.data },
//   };
// }

// const queryPopularPopulate = qs.stringify(
//   {
//     populate: ['image', 'variants.image'],
//     filters: {
//       popular: {
//         $eq: true,
//       },
//     },
//   },

//   {
//     encodeValuesOnly: true,
//   }
// );
