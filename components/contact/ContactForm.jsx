import React from 'react';
import {
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
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

const ContactForm = () => {
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
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='name'>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsPerson />}
                  />
                  <Input name='name' id='name' type='text' />
                </InputGroup>
              </FormControl>
            </div>
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<MdOutlineAlternateEmail />}
                  />
                  <Input name='email' id='email' type='email' />
                </InputGroup>
              </FormControl>
            </div>
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='subject'>Subject</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<BsChatLeftText />}
                  />
                  <Input name='subject' id='subject' type='text' />
                </InputGroup>
              </FormControl>
            </div>
            <div className='flex'>
              <FormControl isRequired>
                <FormLabel htmlFor='message'>Message</FormLabel>
                <Textarea
                  // value={value}
                  // onChange={handleInputChange}
                  name='message'
                  id='message'
                  rows='8'
                  // placeholder='Here is a sample placeholder'
                  // size='lg'
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
