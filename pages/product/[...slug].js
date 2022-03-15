import React from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
const qs = require('qs');

const ProductDetails = ({ product }) => {
  // console.log('product details:>> ', product);
  return (
    <Layout
      name={`${product?.attributes?.name}`}
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className='pt-20'>Product Details</div>
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
