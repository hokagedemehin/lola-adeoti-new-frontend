import React, { useState } from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {
  BsPerson,
  BsInstagram,
  BsWhatsapp,
  BsChatLeftText,
} from 'react-icons/bs';
import { FaLinkedinIn, FaFacebookF, FaPinterestP } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import Link from 'next/link';
import { MdOutgoingMail } from 'react-icons/md';
import axios from 'axios';

const ContactForm = () => {
  const toast = useToast();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loadingState, setLoadingState] = useState(false);

  // console.log('formValue :>> ', formValue);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formValue.name === '' ||
        formValue.email === '' ||
        formValue.subject === '' ||
        formValue.message === ''
      ) {
        toast({
          title: 'Missing Fields',
          description: 'Please fill all the required fields',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setLoadingState(true);
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact-messages`,
          {
            data: formValue,
          }
        );
        toast({
          title: 'Message Sent',
          description: 'Your message has been sent successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setFormValue({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setLoadingState(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingState(false);
    }
  };
  // console.log(formValue)

  return (
    <div className='mb-10 flex flex-col space-y-5'>
      <div className='mx-auto flex max-w-4xl flex-col text-center'>
        <Text className='text-2xl font-black sm:text-4xl'>Contact Us</Text>
        <Text className='text-base text-gray-500'>
          We’d love To Hear From You!
        </Text>
      </div>
      <div className='mx-auto  flex w-full max-w-xl justify-center space-x-3 sm:space-x-5'>
        {/* social links */}
        <div className='flex flex-col justify-between'>
          {/* Instagram */}
          <Link href='https://www.instagram.com/lolaadeoti/' passHref>
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400 '
            >
              <BsInstagram />
            </a>
          </Link>

          {/* Whatsapp */}
          <Link href='https://wa.me/2348073218933' passHref>
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400'
            >
              <BsWhatsapp />
            </a>
          </Link>

          {/* Twitter */}
          <Link href='https://twitter.com/lolaadeoti' passHref>
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400'
            >
              <FiTwitter />
            </a>
          </Link>

          {/* Linkedin */}
          <Link
            href='https://www.linkedin.com/in/lola-adeoti-59960866'
            passHref
          >
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400'
            >
              <FaLinkedinIn />
            </a>
          </Link>

          {/* Facebook */}
          <Link href='https://www.facebook.com/loladeoti' passHref>
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400'
            >
              <FaFacebookF />
            </a>
          </Link>

          {/* P-interest */}
          <Link href='https://www.pinterest.com/accessorizedbylisa' passHref>
            <a
              // href=''
              target='_blank'
              rel='noreferrer'
              className='flex cursor-pointer rounded-full p-3 text-2xl text-gray-500 transition duration-300 ease-in hover:scale-105 hover:bg-yellow-400 hover:text-gray-700 hover:shadow-md hover:shadow-gray-400'
            >
              <FaPinterestP />
            </a>
          </Link>
        </div>

        {/* contact form */}
        <div className='flex w-full rounded-lg border p-4 shadow-lg'>
          <div className='flex w-full flex-col space-y-5'>
            {/* name */}
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='name'>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsPerson />}
                  />
                  <Input
                    name='name'
                    id='name'
                    type='text'
                    value={formValue?.name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </div>
            {/* email */}
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<MdOutlineAlternateEmail />}
                  />
                  <Input
                    name='email'
                    id='email'
                    type='email'
                    value={formValue?.email}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </div>
            {/* subject */}
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='subject'>Subject</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsChatLeftText />}
                  />
                  <Input
                    name='subject'
                    id='subject'
                    type='text'
                    value={formValue?.subject}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            </div>
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='message'>Message</FormLabel>
                <Textarea
                  value={formValue?.message}
                  onChange={handleChange}
                  name='message'
                  id='message'
                  rows='8'

                  // placeholder='Here is a sample placeholder'
                  // size='lg'
                />
              </FormControl>
            </div>
            {/* submit buton */}
            <div className='flex justify-end'>
              <Button
                colorScheme='green'
                variant='solid'
                // size="lg"
                onClick={handleSubmit}
                rightIcon={<MdOutgoingMail />}
                isLoading={loadingState}
                loadingText='Sending'
                spinnerPlacement='end'
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
