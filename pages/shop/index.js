import React from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
// import ShopHeroSection from '../../components/shop/HeroSection';
// import ProductList from '../../components/shop/ProductList';
import NewShopHeroSection from '../../components/shop/NewHeroSection';
import NewProductList from '../../components/shop/NewProductList';
const qs = require('qs');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ShopPage = ({ product }) => {
  // console.log('product', product);
  const data = shuffle(product?.data);
  return (
    <Layout name='Shop' desc='Shop all your lola adeoti bags '>
      {/* <ShopHeroSection /> */}
      <NewShopHeroSection />
      <div className='mx-2'>
        {/* <ProductList data={product.data} /> */}
        <NewProductList data={data} />
      </div>
    </Layout>
  );
};

export default ShopPage;

export async function getStaticProps() {
  // console.log('context :>> ', context);
  const queryPopulate = qs.stringify(
    {
      populate: ['image', 'product'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';

  let product = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variants?${queryPopulate}`
  );
  // const { data } = await axios.get(`${URL}/api/products`);
  // console.log('data', data);
  return {
    props: {
      product: product.data,
    },
    revalidate: 10,
  };
}
