import Layout from '../components/layout/Layout';

import HeroSection from '../components/home/HeroSection';
// import PersonalitySection from '../components/home/Personality';
import CampaignSection from '../components/home/Campaign';
import axios from 'axios';
import Featured from '../components/home/Featured';
// import Popular from '../components/home/Popular';
import Notification from '../components/home/Notification';
import TawkTo from 'tawkto-react';
import { useEffect } from 'react';
import NewPersonalitySection from '../components/home/NewPersonality';
const qs = require('qs');

export default function Home({ campaign, personality, variant }) {
  useEffect(() => {
    new TawkTo(
      process.env.NEXT_PUBLIC_PROPERTY_ID,
      process.env.NEXT_PUBLIC_TAWK_ID
    );
  }, []);

  // console.log('variant :>> ', variant);

  return (
    <Layout
      name='Home'
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className=''>
        <HeroSection />
        <div className='mx-2'>
          <CampaignSection data={campaign?.data} />
          {/* <PersonalitySection data={personality?.data} /> */}
          <NewPersonalitySection data={personality?.data} />
          <Featured data={variant?.data} />
          {/* <Popular data={popular?.data} /> */}
          <Notification />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // console.log('context :>> ', context);
  const queryPopulate = qs.stringify(
    {
      populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );
  // const queryFeaturedPopulate = qs.stringify(
  //   {
  //     populate: ['image', 'variants.image'],
  //     filters: {
  //       variants: {
  //         featured: {
  //           $eq: true,
  //         },
  //       },
  //     },
  //   },
  //   {
  //     encodeValuesOnly: true,
  //   }
  // );

  const queryVariantPopulate = qs.stringify({
    populate: '*',
    filters: {
      featured: {
        $eq: true,
      },
    },
  });
  // const queryPopularPopulate = qs.stringify(
  //   {
  //     populate: ['image', 'variants.image'],
  //     filters: {
  //       popular: {
  //         $eq: true,
  //       },
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

  let campaign = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/campaigns?${queryPopulate}`
  );
  let personality = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/personalities?${queryPopulate}`
  );
  // let featuredData = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?${queryFeaturedPopulate}`
  // );
  let variantData = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variants?${queryVariantPopulate}`
  );
  // let popularData = await axios.get(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?${queryPopularPopulate}`
  // );
  // let campaign = await axios.get(`${URL}/api/campaigns?populate=*`);
  // let personality = await axios.get(`${URL}/api/personalities?populate=*`);
  // let featuredData = await axios.get(`${URL}/api/products?populate=*`);
  return {
    props: {
      campaign: campaign.data,
      personality: personality.data,
      // featured: featuredData.data,
      variant: variantData.data,
      // popular: popularData.data,
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
