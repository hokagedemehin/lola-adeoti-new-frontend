import Head from 'next/head';
import Image from 'next/image';
import { BsArrowUpCircle } from 'react-icons/bs';
import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';
// fixed top-0 left-0 right-0
import HeroSection from '../components/home/HeroSection';
import NavBar from '../components/navbar/NavBar';
export default function Home() {
  return (
    <Layout name='Home'>
      <div className='relative'>
        <div className='fixed top-0 left-0 right-0 z-10 bg-white shadow-md'>
          <NavBar />
        </div>
        <HeroSection />
      </div>
    </Layout>
  );
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
