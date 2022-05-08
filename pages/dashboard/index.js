// import axios from 'axios';
// import axios from 'axios';
import React from 'react';
// import { useQuery } from 'react-query';
import Dashboard from '../../components/dashboard/Dashboard';
import NewDashboardHero from '../../components/dashboard/NewDashboardHero';
import Layout from '../../components/layout/Layout';
// import { useGlobal } from '../../utils/context/GlobalData';
// const qs = require('qs');

const DashboardPage = () => {
  // console.log('user :>> ', user);

  // const query = qs.stringify(
  //   {
  //     pagination: {
  //       // page: 1,
  //       // pageSize: 2,
  //       start: 4,
  //       limit: 4,
  //     },
  //   },
  //   {
  //     encodeValuesOnly: true,
  //   }
  // );
  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';

  // const handle = async () => {
  //   const { data } = await axios.get(`${URL}/api/anonusers?${query}`);
  // console.log(data);
  // };

  // handle();
  return (
    <Layout
      name='Dashboard'
      desc='dashboard with profile details and order details'
    >
      <div className=''>
        <NewDashboardHero />
        <div className='mx-2'>
          <Dashboard />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;

// export async function getStaticProps() {
//   // console.log('context :>> ', context);

//   const query = qs.stringify(
//     {
//       pagination: {
//         // page: 1,
//         pageSize: 2,
//       },
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   );
//   const URL =
//     process.env.NODE_ENV !== 'production'
//       ? 'http://localhost:1337'
//       : 'https://lola-adeoti-new-backend.herokuapp.com';

//   const { data } = await axios.get(`${URL}/api/anonusers?${query}`);
//   // const { data } = await axios.get(`${URL}/api/products`);
//   // console.log('data', data);
//   return {
//     props: {
//       user: data,
//     },
//     revalidate: 10,
//   };
// }
