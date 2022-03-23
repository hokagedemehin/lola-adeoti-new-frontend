// import axios from 'axios';
import React from 'react';
// import { useQuery } from 'react-query';
import Dashboard from '../../components/dashboard/Dashboard';
import DashboardHero from '../../components/dashboard/DashboardHero';
import Layout from '../../components/layout/Layout';
// import { useGlobal } from '../../utils/context/GlobalData';
// const qs = require('qs');

const DashboardPage = () => {
  return (
    <Layout
      name='Dashboard'
      desc='dashboard with profile details and order details'
    >
      <div className=''>
        <DashboardHero />
        <div className='mx-2'>
          <Dashboard />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
