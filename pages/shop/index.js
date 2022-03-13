import React from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import ShopHeroSection from '../../components/shop/HeroSection';
const qs = require('qs');

const ShopPage = ({ product }) => {
  console.log('product', product);
  return (
    <Layout name='Home'>
      <ShopHeroSection />
    </Layout>
  );
};

export default ShopPage;

export async function getStaticProps() {
  // console.log('context :>> ', context);
  const queryPopulate = qs.stringify(
    {
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );

  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  let product = await axios.get(`${URL}/api/products?${queryPopulate}`);

  return {
    props: {
      product: product.data,
    },
    revalidate: 10,
  };
}
