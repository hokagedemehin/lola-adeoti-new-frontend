import React from 'react';
import Layout from '../../components/layout/Layout';
import ResetForm from '../../components/reset/ResetForm';
import ResetHero from '../../components/reset/ResetHero';

const ResetPage = () => {
  return (
    <Layout name='Reset' desc='Users can reset their password here'>
      <div className=''>
        <ResetHero />
        <ResetForm />
      </div>
    </Layout>
  );
};

export default ResetPage;
