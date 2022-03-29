import React from 'react';
import Layout from '../../components/layout/Layout';
import ResetHero from '../../components/reset/ResetHero';
import ResetPasswordForm from '../../components/reset/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <Layout name='Reset Password' desc='Users can reset their password here'>
      <div className=''>
        <ResetHero />
        <ResetPasswordForm />
      </div>
    </Layout>
  );
};

export default ResetPassword;
