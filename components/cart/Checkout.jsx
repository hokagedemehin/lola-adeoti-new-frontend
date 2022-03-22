import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Descriptions, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGlobal } from '../../utils/context/GlobalData';
import { BsTelephone, BsCreditCard } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { MdAlternateEmail, MdArrowBack, MdArrowForward } from 'react-icons/md';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  CountryDropdown,
  RegionDropdown,
  // CountryRegionData,
} from 'react-country-region-selector';
// import { usePaystackPayment } from 'react-paystack';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import axios from 'axios';
import { nanoid } from 'nanoid';
import order_complete from '../../public/cart/order_complete.png';

const CheckoutComponent = () => {
  const { cartInfo, setCartInfo, globalCurr, userID } = useGlobal();
  const router = useRouter();
  console.log('userID', userID);
  console.log('checkout cart :>> ', cartInfo);
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  // const [noCart, setNoCart] = useState(false)

  // const [selector, setSelector] = useState({ country: '', region: '' });
  // console.log('CountryRegionData :>> ', CountryRegionData);

  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    state: '',
    deliveryAddress: '',
    additionalInfo: '',
  });
  console.log('formValue', formValue);
  // if (cartInfo.length === 0) {
  //   return () => router.push('/shop');
  // }

  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  const nairaTotal = cartInfo.reduce((prev, curr) => {
    const naira = +curr?.quantity * +curr?.nairaPrice;
    // const dollar = +curr?.quantity * +curr?.dollarPrice
    return prev + naira;
  }, 0);
  const dollarTotal = cartInfo.reduce((prev, curr) => {
    const dollar = +curr?.quantity * +curr?.dollarPrice;
    // const dollar = +curr?.quantity * +curr?.dollarPrice
    return prev + dollar;
  }, 0);

  // const [currentComp, setCurrentComp] = useState('address');
  useEffect(() => {
    // ? set the cart info fresh here
    console.log('fire');
    const address = localStorage.getItem('lola-address');
    const cleanedAddress = JSON.parse(address);
    setFormValue(cleanedAddress);
    // if (cartInfo.length === 0) {
    //   router.push('/shop');
    // }
  }, []);
  const toast = useToast();
  console.log('currentstep', currentStep);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // setAddressInfo({ ...addressInfo, [name]: value });
    setFormValue({ ...formValue, [name]: value });
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const selectCountry = (val) => {
    // setSelector({ ...selector, country: val });
    setFormValue({ ...formValue, country: val });
    // setAddressInfo({ ...addressInfo, country: val });
  };
  const selectRegion = (val) => {
    // setSelector({ ...selector, region: val });
    setFormValue({ ...formValue, state: val });
    // setAddressInfo({ ...addressInfo, state: val });
  };
  const handleNext = () => {
    if (
      formValue.firstName.length == 0 ||
      formValue.lastName.length == 0 ||
      formValue.phoneNumber.length == 0 ||
      formValue.emailAddress.length == 0 ||
      formValue.deliveryAddress == 0 ||
      formValue.country == 0 ||
      formValue.state == 0
    ) {
      toast({
        title: 'Missing Details',
        description: 'Please fill all required fields marked with red asterisk',
        status: 'error',
        variant: 'solid',
        position: 'top',
        // duration: 9000,
        isClosable: true,
      });
    } else {
      localStorage.setItem(
        'lola-address',
        JSON.stringify({
          firstName: formValue?.firstName,
          lastName: formValue?.lastName,
          phoneNumber: formValue?.phoneNumber,
          emailAddress: formValue?.emailAddress,
          country: formValue?.country,
          state: formValue?.state,
          deliveryAddress: formValue?.deliveryAddress,
          additionalInfo: formValue?.additionalInfo,
        })
      );
      // setAddressInfo({ ...formValue });
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePay = async (response) => {
    const orderId = nanoid();
    // setCurrentStep(currentStep + 1);
    try {
      // * post address to strapi
      await axios.put(`${URL}/api/addresses/${userID?.addressID}`, {
        data: formValue,
        anonuser: userID?.anonID,
      });
      // * post order  to strapi
      const anonid = userID?.anonID;
      const addressid = userID?.addressID;
      const newOrder = {
        orderId: orderId,
        firstName: formValue?.firstName,
        lastName: formValue?.lastName,
        phoneNumber: formValue?.phoneNumber,
        emailAddress: formValue?.emailAddress,
        country: formValue?.country,
        state: formValue?.state,
        deliveryAddress: formValue?.deliveryAddress,
        additionalInfo: formValue?.additionalInfo,
        transactionId: response?.transaction_id.toString(),
        flwRef: response?.flw_ref,
        txRef: response?.tx_ref.toString(),
        amount: +response?.amount,
        currency: response?.currency,
        status: response?.status,
        anonuser: anonid,
        address: addressid,
      };
      const { data: orderData } = await axios.post(
        `${URL}/api/confirmedcarts`,
        // `http://localhost:1337/api/confirmedcarts`,
        {
          data: newOrder,
        }
      );
      // ? change all the cart Items
      cartInfo.forEach(async (elem) => {
        // console.log('elem :>> ', elem);
        // *** get the current variant and calculate the new quantity ****
        const { data: variant } = await axios.get(
          `${URL}/api/variants/${elem?.variantId}`
        );
        // console.log(variant);
        const newQuantity =
          +variant?.data?.attributes?.quantity - +elem?.quantity;
        // console.log('newQuantity', newQuantity);
        // *** change the cart status ***
        await axios.put(`${URL}/api/carts/${elem?.strapiId}`, {
          data: {
            complete: true,
            confirmedcart: orderData?.data?.id,
          },
        });
        // *** change the cart quantity ***
        await axios.put(`${URL}/api/variants/${elem?.variantId}`, {
          data: {
            quantity: newQuantity,
          },
        });
        // console.log('varData', varData);
        //  ***clear cart everywhere****
        localStorage.removeItem('lola-cart');
        setCartInfo([]);
        setCurrentStep(currentStep + 1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const amount = globalCurr == 'naira' ? nairaTotal : dollarTotal;
  const currency = globalCurr == 'naira' ? 'NGN' : 'USD';

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_API,
    tx_ref: Date.now(),
    amount: amount,
    currency: currency,
    // redirect_url: 'http://localhost:3000/shop',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: `${formValue?.emailAddress}`,
      phonenumber: `${formValue?.phoneNumber}`,
      name: `${formValue?.firstName} ${formValue?.lastName}`,
    },
    customizations: {
      title: 'Lola Adeoti Checkout',
      description: 'Payment for items in cart',
      logo: 'https://github.com/hokagedemehin/lola-adeoti-new-frontend/blob/main/public/logo/logo_only.png?raw=true',
      // logo: 'https://github.com/hokagedemehin/lola-adeoti-new-frontend/blob/main/public/logo/logo_coloured.png?raw=true',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className='mx-auto mb-5 max-w-screen-xl sm:py-5'>
      {/* steps section */}
      <div className='mx-2 flex '>
        <Steps current={currentStep}>
          <Step title='Delivery Address' />
          <Step title='Order Summary' />
          <Step title='Order Complete' />
        </Steps>
      </div>

      {/* Delivery Address component */}
      {currentStep === 0 && (
        <div className=' mx-auto my-2 flex max-w-screen-lg sm:mt-10'>
          <div className='mx-2 flex w-full flex-col space-y-3'>
            {/* first & last name */}
            <div className=' grid w-full space-y-2 sm:grid-cols-2 sm:space-x-2 sm:space-y-0'>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='firstName'>FirstName</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineUser />}
                    />
                    <Input
                      name='firstName'
                      id='firstName'
                      type='text'
                      placeholder='First name'
                      value={formValue?.firstName}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineUser />}
                    />
                    <Input
                      name='lastName'
                      id='lastName'
                      type='text'
                      placeholder='Last name'
                      value={formValue?.lastName}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </FormControl>
              </div>
            </div>
            {/* Email & PhoneNumber */}
            <div className=' grid w-full space-y-2 sm:grid-cols-2 sm:space-x-2 sm:space-y-0'>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<BsTelephone />}
                    />
                    <Input
                      name='phoneNumber'
                      id='phoneNumber'
                      type='tel'
                      placeholder='Phone number'
                      value={formValue?.phoneNumber}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </FormControl>
              </div>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='emailAddress'>Email Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<MdAlternateEmail />}
                    />
                    <Input
                      name='emailAddress'
                      id='emailAddress'
                      type='email'
                      placeholder='Email address'
                      value={formValue?.emailAddress}
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>
                </FormControl>
              </div>
            </div>
            {/* country and state */}
            <div className=' grid w-full space-y-2 sm:grid-cols-2 sm:space-x-2 sm:space-y-0'>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='country'>Country</FormLabel>
                  {/* country */}
                  <CountryDropdown
                    name='country'
                    id='country'
                    value={formValue?.country}
                    onChange={selectCountry}
                    className='rounded-md border p-2'
                  />
                </FormControl>
              </div>
              <div className='flex'>
                <FormControl isRequired>
                  <FormLabel htmlFor='state'>State</FormLabel>
                  {/* state */}
                  <RegionDropdown
                    name='state'
                    id='state'
                    disableWhenEmpty={true}
                    country={formValue?.country}
                    value={formValue?.state}
                    onChange={selectRegion}
                    className='rounded-md border p-2'
                  />
                </FormControl>
              </div>
            </div>

            {/* delivery Address */}
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='deliveryAddress'>
                  Delivery Address
                </FormLabel>

                <Textarea
                  value={formValue?.deliveryAddress}
                  onChange={(e) => handleChange(e)}
                  placeholder='Delivery address'
                  id='deliveryAddress'
                  name='deliveryAddress'
                  size='sm'
                  // rows={5}
                  // resize='horizontal'
                />
              </FormControl>
            </div>
            {/* divider */}
            <Divider />
            {/* additional information */}
            <div className='flex flex-col space-y-4'>
              <Text className='text-xl font-semibold'>
                Additional Information
              </Text>
              <FormControl>
                <FormLabel htmlFor='additionalInfo'>
                  Order Notes (Optional)
                </FormLabel>

                <Textarea
                  value={formValue?.additionalInfo}
                  onChange={(e) => handleChange(e)}
                  id='additionalInfo'
                  name='additionalInfo'
                  placeholder='Notes about your order, e.g. special notes for delivery'
                  size='sm'
                  rows={5}
                  // resize='horizontal'
                />
              </FormControl>
            </div>
          </div>
        </div>
      )}

      {/* Order summary */}
      {currentStep === 1 && (
        <div className='mx-auto my-2 flex max-w-screen-xl sm:mt-10'>
          <div className='mx-2 flex w-full flex-col space-y-3 space-x-0 lg:flex-row lg:space-x-4 '>
            {/* delivery details */}
            <div className='flex w-full flex-col'>
              <div className='flex space-x-2 pb-4'>
                <span className='text-xl font-bold text-gray-400'>
                  Delivery
                </span>{' '}
                <span className='text-xl font-bold text-indigo-500 '>
                  Details
                </span>
              </div>
              <Descriptions
                // title='Responsive Descriptions'
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label='First Name'>
                  {formValue?.firstName}
                </Descriptions.Item>
                <Descriptions.Item label='Last Name'>
                  {formValue?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                  {formValue?.emailAddress}
                </Descriptions.Item>
                <Descriptions.Item label='Phone Number'>
                  {formValue?.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label='Address'>
                  {formValue?.deliveryAddress}
                </Descriptions.Item>
                <Descriptions.Item label='Country'>
                  {formValue?.country}
                </Descriptions.Item>
                <Descriptions.Item label='State'>
                  {formValue?.state}
                </Descriptions.Item>
                <Descriptions.Item label='Additional Information'>
                  {formValue.additionalInfo}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* cart details */}
            <div className='flex w-full flex-col'>
              {/* cart items */}
              <div className='flex space-x-2 pb-2'>
                <span className='text-xl font-bold text-gray-400'>Cart</span>{' '}
                <span className='text-xl font-bold text-yellow-600 '>
                  Items
                </span>
              </div>
              {/* cart details card */}
              <div className='space-y-2'>
                {cartInfo.map((elem, id) => (
                  <div
                    key={id}
                    className='flex h-fit w-full flex-col overflow-hidden rounded-lg border transition ease-in-out hover:shadow-md'
                  >
                    <div className='flex justify-between space-x-4'>
                      {/* image */}
                      <Link href={`${URL}${elem?.link}`} passHref>
                        <a
                          // href='#'
                          // className='group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40'
                          className=' relative block '
                        >
                          <div className='relative h-full w-32 sm:h-full sm:w-48'>
                            <Image
                              src={elem?.image}
                              layout='fill'
                              // loading='lazy'
                              objectFit='cover'
                              alt='Photo by Thái An'
                              className='h-full w-full object-cover object-center transition duration-200 hover:scale-110'
                              placeholder='blur'
                              blurDataURL={elem?.image}
                            />
                          </div>
                        </a>
                      </Link>

                      {/* name | color | quantity | price */}
                      <div className='flex flex-1 flex-col justify-between py-3 pr-2'>
                        {/* name | color */}
                        <div>
                          <Link href={`${URL}${elem?.link}`} passHref>
                            <a className='mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 md:text-xl'>
                              <Text>{elem?.name}</Text>
                            </a>
                          </Link>

                          <span className='block text-gray-500'>
                            Color: {elem?.color}
                          </span>
                        </div>
                        {/* Quantity */}
                        <div className='my-1 flex md:mb-2'>
                          <Text className='text-lg font-semibold text-gray-500'>
                            X {elem?.quantity}
                          </Text>
                        </div>
                        <div className='flex justify-between'>
                          {/* price */}
                          <div>
                            {globalCurr == 'naira' ? (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#8358;{elem?.nairaPrice}
                                </span>
                              </div>
                            ) : (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#x24;{elem?.dollarPrice}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* total */}
                          <div className='flex'>
                            {globalCurr == 'naira' ? (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#8358;{+elem?.quantity * +elem?.nairaPrice}
                                </span>
                              </div>
                            ) : (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#x24;{+elem?.quantity * +elem?.dollarPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* total */}
              <div className='mb-4 mt-4 flex w-full justify-end rounded-lg bg-gray-100 p-4 '>
                {globalCurr == 'naira' ? (
                  <div className=''>
                    {/* <div className='space-y-1'>
                      <div className='flex justify-between gap-4 text-gray-500'>
                        <span>Subtotal</span>
                        <span>&#8358;{nairaTotal}</span>
                      </div>
                    </div> */}

                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#8358;{nairaTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#x24;{dollarTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* order complete */}
      {currentStep === 2 && (
        <div className='mx-auto my-2 flex max-w-screen-xl sm:mt-10'>
          <div className=' mx-2 flex w-full flex-col items-center justify-center'>
            <div className='relative flex  h-96 w-full'>
              <Image
                src={order_complete}
                layout='fill'
                objectFit='contain'
                placeholder='blur'
                // blurDataURL={
                //   elem?.attributes?.image?.data?.attributes?.formats?.small
                //     ?.url
                // }
                alt='Empty Cart'
                className=''
              />
            </div>
            <div className='flex flex-col space-y-2 text-center'>
              <div>
                <span className='text-2xl font-bold text-gray-700 md:text-3xl'>
                  {' '}
                  Your Order is{' '}
                </span>
                <span className='text-2xl font-black text-teal-700 md:text-3xl'>
                  {' '}
                  Confirmed 🎉
                </span>
              </div>
              <Text className='font-semibold md:text-lg'>
                Track the status of your order in your dashboard or continue
                shopping
              </Text>
            </div>
            <div className='flex flex-row space-x-4 pt-4'>
              <Button onClick={() => router.push('/dashboard')}>
                Dahsboard
              </Button>
              <Button onClick={() => router.push('/shop')}>Go to Shop</Button>
            </div>
          </div>
        </div>
      )}
      {/* buttons */}
      <div className='my-4 mx-2 flex space-x-4'>
        {currentStep !== 0 && currentStep < 2 && (
          <Button
            variant='outline'
            colorScheme='blue'
            leftIcon={<MdArrowBack />}
            onClick={() => handlePrev()}
          >
            Previous
          </Button>
        )}
        {currentStep >= 0 && currentStep < 1 && (
          <Button
            variant='outline'
            colorScheme='teal'
            rightIcon={<MdArrowForward />}
            onClick={() => handleNext()}
          >
            Next
          </Button>
        )}
        {currentStep === 1 && (
          <Button
            variant='solid'
            colorScheme='teal'
            isDisabled={cartInfo.length === 0}
            rightIcon={<BsCreditCard />}
            // onClick={() => handlePay()}
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  if (response.status == 'successful') {
                    console.log(response);
                    handlePay(response);
                  } else {
                    console.log('not working');

                    // console.error(response);
                  }
                  closePaymentModal(); // this will close the modal programmatically
                },
                onClose: () => {
                  console.log('closed payment');
                },
              });
            }}
          >
            Pay Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheckoutComponent;
