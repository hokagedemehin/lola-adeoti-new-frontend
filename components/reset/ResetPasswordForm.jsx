import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import {
  // MdAlternateEmail,
  MdOutlineLock,
  // MdArrowForward,
} from 'react-icons/md';
const ResetPasswordForm = () => {
  // const router = useRouter();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmission = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (
        formValue?.code.length == 0 ||
        formValue?.password.length == 0 ||
        formValue?.confirmpassword.length == 0
      ) {
        toast({
          title: 'Missing Details',
          description:
            'Please fill all required fields marked with red asterisk',
          status: 'error',
          variant: 'solid',
          position: 'top',
          // duration: 9000,
          isClosable: true,
        });
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`,
          {
            email: formValue?.emailAddress,
          }
        );
        toast({
          title: 'Reset Password Complete',
          // description: error.response.data.error.message,
          description: 'Please login with your new password',
          status: 'success',
          variant: 'left-accent',
          position: 'top',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // console.error(error.message);
      toast({
        title: 'Reset Failed',
        // description: error.response.data.error.message,
        description: 'Please check your new password and code again',
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
  const handleShow = () => setShow(!show);

  return (
    <div className='flex flex-col items-center justify-center pt-10'>
      <Heading>Reset Password</Heading>
      <form className='mt-5'>
        <div className='flex'>
          <FormControl isRequired>
            <FormLabel htmlFor='code'>Email address</FormLabel>
            <Input
              id='code'
              type='text'
              name='code'
              onChange={(e) => handleChange(e)}
            />
            <FormHelperText>
              Please provide the code sent to your mail
            </FormHelperText>
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
        <div className='flex'>
          <FormControl isRequired>
            <FormLabel htmlFor='confirmpassword'>Confirm confirm</FormLabel>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<MdOutlineLock />}
              />
              <Input
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                name='confirmpassword'
                id='confirmpassword'
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
      </form>
      <div className='my-5 flex space-x-2  shadow-sm'>
        {/*  */}
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
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
