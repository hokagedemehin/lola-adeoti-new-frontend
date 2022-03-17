import {
  Button,
  // FormControl,
  // FormHelperText,
  // FormLabel,
  Input,
  // InputGroup,
  // InputLeftElement,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { AtSignIcon } from '@chakra-ui/icons';
import { AiOutlineSend } from 'react-icons/ai';
import axios from 'axios';

const Notification = () => {
  const [formValue, setFormValue] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  // console.log('formValue', formValue);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const URL =
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:1337'
          : 'https://lola-adeoti-new-backend.herokuapp.com';
      await axios.post(`${URL}/api/promos`, {
        data: {
          email: formValue.email,
        },
      });
      setFormValue({ email: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between'>
          <div className='mb-4 sm:mb-8 lg:mb-0'>
            <Text className='text-center text-xl font-bold text-emerald-600 sm:text-2xl lg:text-left lg:text-3xl'>
              Get Notified Of Promos & Deals
            </Text>
            <p className='text-center text-gray-500 lg:text-left'>
              Join the family
            </p>
          </div>

          <div className='flex flex-col items-center lg:items-end'>
            <form className='mb-3 flex w-full max-w-md gap-2'>
              <Input
                onChange={(e) => setFormValue({ email: e.target.value })}
                value={formValue.email}
                id='email'
                placeholder='Email'
                type='email'
              />

              <Button
                rightIcon={<AiOutlineSend />}
                variant='outline'
                colorScheme='whatsapp'
                onClick={() => handleSubmit()}
                isLoading={isLoading}
                loadingText='Saving'
              >
                Submit
              </Button>
            </form>

            {/* <p className='text-center text-xs text-gray-400 lg:text-right'>
              By signing up to our newsletter you agree to our{' '}
              <a
                href='#'
                className='underline transition duration-100 hover:text-indigo-500 active:text-indigo-600'
              >
                Term of Service
              </a>{' '}
              and{' '}
              <a
                href='#'
                className='underline transition duration-100 hover:text-indigo-500 active:text-indigo-600'
              >
                Privacy Policy
              </a>
              .
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;

/**
 * <div className='flex flex-col space-y-3 pt-10 pb-10 sm:pt-20'>
      <Text className=' text-xl font-black  sm:text-4xl'>
        Get Notified Of Promos & Deals
      </Text>
      <div className='flex w-full flex-col items-center space-y-3 sm:flex-row sm:space-x-4'>
        <div className=' w-full sm:w-1/2'>
         

            <Input
              onChange={(e) => setFormValue({ email: e.target.value })}
              value={formValue.email}
              id='email'
              placeholder='Email'
              type='email'
            />

            
        </div>
        <Button
          rightIcon={<AiOutlineSend />}
          variant='outline'
          colorScheme='whatsapp'
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
    </div>


  
 */
