import {
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';
import { useGlobal } from '../../utils/context/GlobalData';
import OrderCard from './OrderCard';
import ProfileCard from './ProfileCard';
import qs from 'qs';
import { useQuery } from 'react-query';
import axios from 'axios';

const Dashboard = () => {
  const { userID } = useGlobal();
  // console.log('userID', userID);

  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  const queryPopulate = qs.stringify(
    {
      populate: {
        confirmedcarts: {
          populate: ['carts'],
        },
        address: {
          populate: ['*'],
        },
        carts: {
          populate: ['*'],
        },
      },
      // sort: ['createdAt:desc'],
      // populate: '*',
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { isSuccess, isLoading, data } = useQuery(
    ['orders', userID?.anonID],
    async () => await handleOrders()
  );

  const sortedData = data?.attributes?.confirmedcarts?.data?.sort(
    (a, b) => b.id - a.id
  );

  console.log('data', data);
  console.log('isSuccess', isSuccess);

  const handleOrders = async () => {
    const { data } = await axios.get(
      `${URL}/api/anonusers/${userID?.anonID}?${queryPopulate}`
      // `${URL}/api/anonusers/${userID?.anonID}?populate=*`
    );
    return data?.data;
  };

  return (
    <div className='mx-auto max-w-screen-lg pt-8'>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab>My Orders</Tab>
          <Tab>My Profile</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* <div className='grid grid-cols-2 gap-4 sm:flex sm:flex-wrap'> */}
            <div className=' mx-auto flex max-w-4xl flex-wrap justify-center gap-2'>
              {data &&
                sortedData?.map((elem, id) => (
                  <OrderCard key={id} elem={elem} />
                ))}
              {isLoading &&
                [0, 1, 2, 3].map((elem, id) => (
                  <Skeleton className='h-48 w-36 sm:w-40' key={id}>
                    {elem}
                  </Skeleton>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <ProfileCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Dashboard;
