import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const ResetForm = () => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (getCookie('lola_key')) {
      // router.back();
      router.push('/');
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmission = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
        {
          email: formValue?.emailAddress,
        }
      );
      toast({
        title: 'Reset Email Sent',
        // description: error.response.data.error.message,
        description: 'Please check your mail for the reset link',
        status: 'success',
        variant: 'left-accent',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // console.error(error.message);
      toast({
        title: 'Email not found',
        // description: error.response.data.error.message,
        description: 'Please provide a registered email',
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

  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <Heading>Reset Password</Heading>
      <form className='mt-5'>
        <FormControl isRequired>
          <FormLabel htmlFor='emailAddress'>Email address</FormLabel>
          <Input
            id='emailAddress'
            type='email'
            name='emailAddress'
            onChange={(e) => handleChange(e)}
          />
          <FormHelperText>
            Please provide the email you registered with.
          </FormHelperText>
        </FormControl>
      </form>
      <div className='my-5 flex space-x-2  shadow-sm'>
        <Button
          // leftIcon={<MdArrowBackIos />}
          colorScheme='teal'
          variant='outline'
          fontSize='xl'
          onClick={() => router.push('/login')}
        >
          Back
        </Button>
        <Button
          leftIcon={<BiMailSend />}
          colorScheme='teal'
          variant='solid'
          isFullWidth
          fontSize='xl'
          onClick={handleSubmission}
          isLoading={isLoading}
          loadingText='Sending'
          spinnerPlacement='end'
        >
          Send Reset Email
        </Button>
      </div>
    </div>
  );
};

export default ResetForm;
