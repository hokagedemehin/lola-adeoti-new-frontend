import React from 'react';
import CheckoutComponent from '../../components/cart/Checkout';
import Layout from '../../components/layout/Layout';

const CheckoutPage = () => {
  return (
    <Layout name='Checkout' desc='Pay for your bags here'>
      <div className='mt-20'>
        <CheckoutComponent />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
