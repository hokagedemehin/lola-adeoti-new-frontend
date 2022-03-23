import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import OrderDetails from '../../components/dashboard/OrderDetails';
import Layout from '../../components/layout/Layout';
import qs from 'qs';

const DashboardDetails = () => {
  const router = useRouter();
  console.log(router);
  // const [orderID, setOrderID] = useState(null);
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  // useEffect(() => {
  //   if (router?.query?.orderid) {
  //     setOrderID(router?.query?.orderid[0]);
  //   }
  // }, [router]);

  let id = null;

  if (router?.query?.orderid) {
    id = router?.query?.orderid[0];
  }
  console.log('id', id);
  // console.log('orderID :>> ', orderID);
  const queryPopulate = qs.stringify(
    {
      populate: ['carts'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const { isSuccess, data } = useQuery(
    ['orders details', id],
    async () => await handleOrders(),
    { enabled: !!id }
  );

  console.log('data', data);
  console.log('isSuccess', isSuccess);

  const handleOrders = async () => {
    const { data } = await axios.get(
      `${URL}/api/confirmedcarts/${id}?${queryPopulate}`
      // `${URL}/api/anonusers/${userID?.anonID}?populate=*`
    );
    return data?.data;
  };

  return (
    <Layout name='Dashboard' desc='order details for a single order'>
      <div className='mx-2 mt-20'>
        <OrderDetails data={data} />
      </div>
    </Layout>
  );
};

export default DashboardDetails;
