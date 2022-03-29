import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { BsTelephone, BsCreditCard } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { MdAlternateEmail, MdOutlineLock } from 'react-icons/md';
import { setCookies } from 'cookies-next';
import { useGlobal } from '../../utils/context/GlobalData';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { nanoid } from 'nanoid';

const RegisterForm = () => {
  const { userID } = useGlobal();
  const router = useRouter();
  const toast = useToast();
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getCookie('lola_key')) {
      // router.back();
      router.push('/shop');
    }
  }, []);

  // const { user } = useUser();
  // const router = useRouter();
  // console.log('formValue :>> ', formValue);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleShow = () => setShow(!show);

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // create user details and save anon ID
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
        {
          username: `${formValue?.firstName.trim()}_${formValue?.lastName.trim()}`,
          email: formValue?.emailAddress,
          password: formValue?.registerpassword,
          anonId: userID?.anonID,
          addressId: userID?.addressID,
          anonuser: userID?.anonID,
        }
      );
      // console.log('data :>> ', data);
      setCookies('lola_key', data.jwt);

      // update anon details
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/anonusers/${userID?.anonID}`,
        {
          data: {
            firstName: formValue?.firstName,
            lastName: formValue?.lastName,
            email: formValue?.emailAddress,
          },
        }
      );

      //* create new anon called lola_placeholder
      // ###########################################################
      let id = nanoid();
      let addressId = nanoid();
      const { data: newAnon } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/anonusers`,
        {
          data: {
            userId: id,
          },
        }
      );

      const { data: addressData } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addresses`,
        {
          data: {
            userId: addressId,
            anonuser: newAnon?.data?.id,
          },
        }
      );

      localStorage.setItem(
        'lola-new-userId',
        JSON.stringify({
          userID: id,
          anonID: newAnon?.data?.id,
          addressID: addressData?.data?.id,
        })
      );
      // ###################################################################

      router.push('/shop');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Account exists',
        description: 'Email is already taken',
        status: 'error',
        variant: 'top-accent',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(getCookie('lola_key'));
  return (
    <div>
      <div className='bg-white py-6 sm:py-8 lg:py-12'>
        <div className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl'>
            Register
          </h2>

          <form className='mx-auto max-w-2xl rounded-lg border'>
            <div className='flex flex-col gap-4 p-4 md:p-8'>
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
                        // value={formValue?.firstName}
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
                        // value={formValue?.lastName}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>
              </div>
              <div className=' grid w-full space-y-2 sm:grid-cols-2 sm:space-x-2 sm:space-y-0'>
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
                        // value={formValue?.emailAddress}
                        onChange={(e) => handleChange(e)}
                      />
                    </InputGroup>
                  </FormControl>
                </div>
                <div className='flex'>
                  <FormControl isRequired>
                    <FormLabel htmlFor='registerpassword'>Password</FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<MdOutlineLock />}
                      />
                      <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        name='registerpassword'
                        id='registerpassword'
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
              </div>

              <div className='my-5 flex'>
                <Button
                  // leftIcon={<BiMailSend />}
                  colorScheme='blue'
                  variant='solid'
                  isFullWidth
                  fontSize='xl'
                  // onClick={handleSubmission}
                  isLoading={isLoading}
                  loadingText='Sending'
                  spinnerPlacement='end'
                  onClick={async (e) => await handleRegister(e)}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

/******
 * // setIsLoading(true);
    // e.preventDefault();
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
    //     username: formValue?.firstName,
    //     email: formValue?.emailAddress,
    //     password: formValue?.registerpassword,
    //   })
    //   .then((response) => {
    //     // Handle success.
    //     // console.log('Well done!');/
    //     setIsLoading(false);
    //     console.log('User profile', response.data.user);
    //     console.log('User token', response.data.jwt);
    //   })
    //   .catch((error) => {
    //     // Handle error.
    //     setIsLoading(false);
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
