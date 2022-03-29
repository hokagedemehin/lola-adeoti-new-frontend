// import axios from 'axios';
import React from 'react';
import Layout from '../../components/layout/Layout';
import LoginComponent from '../../components/login/LoginComponent';
import LoginHero from '../../components/login/LoginHero';

const LoginPage = () => {
  // console.log('data :>> ', data);
  return (
    <Layout name='Login' desc='Login page to get authenticated'>
      <div className=''>
        <LoginHero />
        <LoginComponent />
      </div>
    </Layout>
  );
};

export default LoginPage;

// export async function getServerSideProps() {
//   const loginInfo = {
//     identifier: 'test2@email.com',
//     password: 'testing1',
//   };

//   const { data } = await axios.post(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
//     loginInfo
//   );
//   // console.log('data :>> ', data);

//   return {
//     props: { data: data },
//   };
// }
