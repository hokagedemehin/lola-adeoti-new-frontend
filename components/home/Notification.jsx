import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
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
  // console.log('formValue', formValue);
  const handleSubmit = async () => {
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
  };

  return (
    <div className='flex flex-col space-y-3 pt-10 pb-10 sm:pt-20'>
      <Text className=' text-xl font-black  sm:text-4xl'>
        Get Notified Of Promos & Deals
      </Text>
      <div className='flex w-full flex-col items-center space-y-3 sm:flex-row sm:space-x-4'>
        <div className=' w-full sm:w-1/2'>
          <FormControl>
            <FormLabel htmlFor='email'>Email address</FormLabel>

            <Input
              onChange={(e) => setFormValue({ email: e.target.value })}
              value={formValue.email}
              id='email'
              type='email'
            />

            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
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
  );
};

export default Notification;
