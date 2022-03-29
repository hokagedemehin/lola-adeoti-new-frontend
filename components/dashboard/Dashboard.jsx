import {
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGlobal } from '../../utils/context/GlobalData';
import OrderCard from './OrderCard';
import ProfileCard from './ProfileCard';
import qs from 'qs';
import { useQuery } from 'react-query';
import axios from 'axios';
import Image from 'next/image';
import no_order from '../../public/dashboard/no_order.svg';
import { Pagination } from 'antd';
import ProfileDetails from './ProfileDetails';

const Dashboard = () => {
  const { userID } = useGlobal();
  // console.log('userID :>> ', userID);

  const [initial, setInitial] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(null);
  const [pageSiz] = useState(4);
  let [newData, setNewData] = useState(null);

  // console.log('newData', newData);
  // console.log('totalPages', totalPages);
  // console.log('initial :>> ', initial);

  const handleOrders = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/anonusers/${userID?.anonID}?${queryPopulate}`
      // `${URL}/api/anonusers/${userID?.anonID}?populate=*`
    );
    return data?.data;
  };

  const { isSuccess, isLoading, data } = useQuery(
    ['orders', userID?.anonID],
    async () => await handleOrders(),
    {
      enabled: !!userID?.anonID,
      // initialData: userData,
    }
  );

  // console.log('data', data);
  useEffect(() => {
    if (isSuccess) {
      const sortedData = data?.attributes?.confirmedcarts?.data?.sort(
        (a, b) => b.id - a.id
      );
      let startData = sortedData?.slice(0, pageSiz);
      setNewData(startData);
      settotalPages(data?.attributes?.confirmedcarts?.data?.length);
    }
  }, [isSuccess]);

  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';

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

  // console.log('data', data);
  // console.log('isSuccess', isSuccess);

  const handleChange = (page) => {
    const indexOfLast = page * pageSiz;
    const indexOfFirst = indexOfLast - pageSiz;
    const sortedData = data?.attributes?.confirmedcarts?.data?.sort(
      (a, b) => b.id - a.id
    );

    setNewData(sortedData.slice(indexOfFirst, indexOfLast));
    // startData = sortedData.slice(indexOfFirst, indexOfLast);
    setCurrentPage(page);
    setInitial(!initial);
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
            <>
              <div className=' mx-auto flex max-w-4xl flex-wrap justify-center gap-2'>
                {isSuccess &&
                  newData &&
                  newData?.map((elem, id) => (
                    <OrderCard key={id} elem={elem} />
                  ))}
                {isLoading &&
                  [0, 1, 2, 3].map((elem, id) => (
                    <Skeleton className='h-48 w-36 sm:w-40' key={id}>
                      {elem}
                    </Skeleton>
                  ))}
                {isSuccess &&
                  data?.attributes?.confirmedcarts?.data?.length === 0 && (
                    <div>
                      <div className='flex flex-col sm:space-y-5'>
                        <div className='sm:h:80 relative h-56 w-56 sm:w-80'>
                          <Image
                            src={no_order}
                            layout='fill'
                            // loading='lazy'
                            objectFit='contain'
                            alt='No Order'
                            className='h-full w-full object-cover object-center'
                            placeholder='blur'
                            blurDataURL={no_order}
                          />
                        </div>
                        <Text className='text-center text-xl font-bold sm:text-2xl'>
                          No Orders available
                        </Text>
                      </div>
                    </div>
                  )}
              </div>
              {isSuccess &&
                data?.attributes?.confirmedcarts?.data?.length !== 0 && (
                  <div className='flex items-center justify-center pt-5'>
                    <Pagination
                      onChange={handleChange}
                      current={currentPage}
                      // defaultPageSize={1}
                      pageSize={pageSiz}
                      total={totalPages}
                      responsive={true}
                      // showTotal={(total) => `${total} items`}
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`
                      }
                      hideOnSinglePage
                      // showLessItems
                    />
                  </div>
                )}
            </>
          </TabPanel>
          <TabPanel>
            <>
              {isSuccess && data?.attributes?.email === null && <ProfileCard />}
              {isSuccess && data?.attributes?.email !== null && (
                <ProfileDetails data={data} />
              )}
            </>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Dashboard;
