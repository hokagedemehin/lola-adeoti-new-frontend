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
// import NavBar from '../components/navbar/NavBar';
export default function Home({ data }) {
  console.log('props :>> ', data?.data);
  // console.log(process.env.NODE_ENV);
  return (
    <Layout
      name='Home'
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className=''>
        <HeroSection />
        <div className='mx-2'>
          <CampaignSection data={data?.data} />
          <PersonalitySection />
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
  // const res = await fetch(`${URL}/api/campaigns?populate=*`);
  // const res = await fetch(`http://localhost:1337/api/campaigns?populate=*`);
  // const result = await res.json();
  // const { data } = await axios.get(
  //   `http://localhost:1337/api/campaigns?populate=*`
  // );
  const { data } = await axios.get(`${URL}/api/campaigns?populate=*`);
  // console.log(res);
  // const result = await res.data;

  return {
    props: {
      data,
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
