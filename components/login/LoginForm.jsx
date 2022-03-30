import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  MdAlternateEmail,
  MdOutlineLock,
  // MdArrowForward,
} from 'react-icons/md';
// import { setCookies } from 'cookies-next';
import { useGlobal } from '../../utils/context/GlobalData';

const LoginForm = () => {
  const { setUserID, setCartInfo, setLolaKey } = useGlobal();
  const toast = useToast();
  // const router = useRouter();
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  // const { user } = useUser();
  const router = useRouter();

  // console.log('formValue :>> ', formValue);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
        {
          identifier: formValue?.identifier,
          password: formValue?.password,
        }
      );
      // console.log('data :>> ', data);
      // setCookies('lola_key', data.jwt);
      localStorage.setItem('lola-key', data.jwt);
      setLolaKey(data.jwt);
      router.push('/shop');

      // *set lola-userid from starpi
      // ############################################################
      const { data: userData } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/anonusers/${data?.user?.anonId.toString()}`
      );
      // console.log('userData :>> ', userData);
      const users = {
        addressID: data?.user?.addressId,
        anonID: data?.user?.anonId,
        userID: userData?.data?.attributes?.userId,
      };
      localStorage.setItem('lola-userId', JSON.stringify(users));
      setUserID(users);
      //  ##################################################

      // * set lola-address from strapi
      // #######################################################
      const { data: addressData } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/addresses/${data?.user?.addressId.toString()}`
      );
      // console.log('addressData', addressData);
      const addressInfo = {
        firstName: addressData?.data?.attributes?.firstName,
        lastName: addressData?.data?.attributes?.lastName,
        phoneNumber: addressData?.data?.attributes?.phoneNumber,
        emailAddress: addressData?.data?.attributes?.emailAddress,
        country: addressData?.data?.attributes?.country,
        state: addressData?.data?.attributes?.state,
        deliveryAddress: addressData?.data?.attributes?.deliveryAddress,
        additionalInfo: addressData?.data?.attributes?.additionalInfo,
      };
      localStorage.setItem('lola-address', JSON.stringify(addressInfo));
      // ########################################################

      // * set lola-cart from strapi
      //  ########################################################
      const { data: cartData } = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/anonusers/${data?.user?.anonId.toString()}?populate=*`
      );
      // console.log('cartData :>> ', cartData);
      const userCart = cartData?.data?.attributes?.carts?.data.filter(
        (elem) => elem?.attributes?.complete == false
      );
      // console.log('userCart', userCart);
      let newArr = [];
      userCart.forEach((elem) => newArr.push(elem?.attributes));
      setCartInfo(newArr);
      // console.log('cartInfo :>> ', cartInfo);
      const newObj = {};
      userCart.forEach((elem) => {
        Object.assign(newObj, {
          [elem?.attributes?.variantId]: {
            cartId: elem?.attributes?.cartId,
            datID: elem?.id,
            variantId: elem?.attributes?.variantId,
          },
        });
      });
      // console.log('newObj :>> ', newObj);
      localStorage.setItem('lola-cart', JSON.stringify(newObj));
      // ###########################################################
    } catch (error) {
      console.error(error.message);
      toast({
        title: 'Account exists',
        // description: error.response.data.error.message,
        description: 'Invalid Email or Password',
        status: 'error',
        variant: 'top-accent',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }

    // e.preventDefault();
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
    //     identifier: formValue?.identifier,
    //     password: formValue?.password,
    //   })
    //   .then((response) => {
    //     // Handle success.
    //     // console.log('Well done!');
    //     setIsLoading(true);
    //     // setCookies('lola_key', response.data.jwt);
    //     // router.push('/shop');
    //     console.log('User profile', response.data);
    //     console.log('User token', response.data.jwt);

    //     // set localhost userid to new-userid
    //     // setuserid to new-userid
    //     // get address and create lola-address
    //     // get unconfirmed cart and create lola-cart
    //     // set cartItnfo
    //   })
    //   .catch((error) => {
    //     // Handle error.
    //     setIsLoading(true);

    //     toast({
    //       title: 'Account exists',
    //       description: error.response.data.error.message,
    //       status: 'error',
    //       variant: 'top-accent',
    //       position: 'top',
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     console.log('An error occurred:', error.response);
    //   });
  };

  const handleShow = () => setShow(!show);

  // const handleClick = (e, href) => {
  //   e.preventDefault();
  //   router.push(href);
  //   // console.log("final Data:", formValue);
  // };

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
        <Text className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl'>
          Login
        </Text>

        <form className='mx-auto max-w-xl rounded-lg border'>
          <div className='flex flex-col gap-4 p-4 md:p-8'>
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='identifier'>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<MdAlternateEmail />}
                  />
                  <Input
                    name='identifier'
                    id='identifier'
                    type='email'
                    placeholder='Email address'
                    // value={formValue?.emailAddress}
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
              </FormControl>
            </div>

            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='password'>Password</FormLabel>

                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<MdOutlineLock />}
                  />
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    name='password'
                    id='password'
                    onChange={(e) => handleChange(e)}
                  />
                  <InputRightElement>
                    <Button size='sm' variant='ghost' onClick={handleShow}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </div>

            <div className='my-5 flex'>
              <Button
                colorScheme='blue'
                variant='solid'
                isFullWidth
                fontSize='xl'
                // onClick={handleSubmission}
                isLoading={isLoading}
                loadingText='Sending'
                spinnerPlacement='end'
                onClick={async (e) => await handleLogin(e)}
              >
                Log in
              </Button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center space-y-2 bg-gray-100 p-4'>
            <Text className='text-center text-sm text-gray-500'>
              Forgot Password?{' '}
              <Link href='/reset' passHref>
                <a
                  // href='!#'
                  // onClick={(e) => handleClick(e, '/reset')}
                  className='text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700'
                >
                  Reset
                </a>
              </Link>
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

/*****
 *  // e.preventDefault();
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
    //     identifier: formValue?.identifier,
    //     password: formValue?.password,
    //   })
    //   .then((response) => {
    //     // Handle success.
    //     // console.log('Well done!');
    //     console.log('User profile', response.data.user);
    //     console.log('User token', response.data.jwt);
    //   })
    //   .catch((error) => {
    //     // Handle error.
    //     toast({
    //       title: 'Account exists',
    //       description: error.response.data.error.message,
    //       status: 'error',
    //       variant: 'top-accent',
    //       position: 'top',
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     console.log('An error occurred:', error.response);
    //   });
 */
