// import Head from 'next/head';
// import Image from 'next/image';
// import { BsArrowUpCircle } from 'react-icons/bs';
import Layout from '../components/layout/Layout';
// import styles from '../styles/Home.module.css';
// fixed top-0 left-0 right-0
import HeroSection from '../components/home/HeroSection';
import PersonalitySection from '../components/home/Personality';
import CampaignSection from '../components/home/Campaign';
import axios from 'axios';
// import TawkTo from 'tawkto-react';
// import { useEffect } from 'react';
// import NavBar from '../components/navbar/NavBar';
export default function Home({ campaign, personality }) {
  // console.log('props :>> ', data?.data);
  // console.log(process.env.NODE_ENV);
  // useEffect(() => {
  //   const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;
  //   const tawkId = process.env.NEXT_PUBLIC_TAWK_ID;
  //   var tawk = new TawkTo(propertyId, tawkId);
  //   tawk.hideWidget();
  // }, []);

  return (
    <Layout
      name='Home'
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className=''>
        <HeroSection />
        <div className='mx-2'>
          <CampaignSection data={campaign?.data} />
          <PersonalitySection data={personality?.data} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  let campaign = await axios.get(`${URL}/api/campaigns?populate=*`);
  let personality = await axios.get(`${URL}/api/personalities?populate=*`);

  return {
    props: {
      campaign: campaign.data,
      personality: personality.data,
    },
    revalidate: 10,
  };
}

/**
 * <div>
  <div>
    <div class="sticky top-0 ...">A</div>
    <div>
      <div>
        <img src="..." />
        <strong>Andrew Alfred</strong>
      </div>
      <div>
        <img src="..." />
        <strong>Aisha Houston</strong>
      </div>
      
    </div>
  </div>
  <div>
    <div class="sticky top-0">B</div>
    <div>
      <div>
        <img src="..." />
        <strong>Bob Alfred</strong>
      </div>
      
    </div>
  </div>
  
</div>
 */
