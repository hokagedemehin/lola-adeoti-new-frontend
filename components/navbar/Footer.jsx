import { Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo_coloured2 from '../../public/logo/logo_coloured2.png';
// import email from '../../public/home/email.png';

const Footer = () => {
  const year = new Date().getFullYear();
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };

  return (
    <div>
      <div className='bg-black'>
        <footer className='mx-auto max-w-screen-2xl px-4 md:px-8'>
          <div className='mb-16 grid grid-cols-2 gap-12 pt-10 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12'>
            {/* logo and social link */}
            <div className='col-span-full lg:col-span-2'>
              {/* <!-- logo - start --> */}
              <div className='mb-4 lg:-mt-2'>
                <Link href='/' passHref>
                  <a
                    // href='/'
                    className='inline-flex items-center gap-2 text-xl font-bold text-gray-100 hover:text-white md:text-2xl'
                    aria-label='logo'
                  >
                    <div className='relative h-8 w-8 bg-transparent'>
                      <Image
                        src={logo_coloured2}
                        alt='lola-adeoti'
                        layout='fill'
                        placeholder='blur'
                      />
                    </div>
                    Lola Adeoti
                  </a>
                </Link>
              </div>
              {/* <!-- logo - end --> */}

              <Text className='mb-6 text-gray-400 sm:pr-8'>
                Genuine leather brand for the modern day individual
              </Text>

              {/* <!-- social - start --> */}
              <div className='flex items-center gap-4'>
                {/* instagram */}
                <a
                  href='https://www.instagram.com/lolaadeoti/'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    className='h-5 w-5 '
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                  </svg>
                </a>
                {/* whatsapp */}
                <a
                  href='https://wa.me/2348073218933'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24px'
                    height='24px'
                  >
                    {' '}
                    <path d='M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z' />
                  </svg>
                </a>
                {/* twitter */}
                <a
                  href='https://twitter.com/lolaadeoti'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    className='h-5 w-5'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                  </svg>
                </a>
                {/* linkedin */}
                <a
                  href='https://www.linkedin.com/in/lola-adeoti-59960866'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    className='h-5 w-5'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                  </svg>
                </a>
                {/* facebook */}
                <a
                  href='https://www.facebook.com/loladeoti'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24px'
                    height='24px'
                  >
                    <path d='M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.014467 17.065322 19.313017 13.21875 19.898438 L 13.21875 14.384766 L 15.546875 14.384766 L 15.912109 12.019531 L 13.21875 12.019531 L 13.21875 10.726562 C 13.21875 9.7435625 13.538984 8.8710938 14.458984 8.8710938 L 15.935547 8.8710938 L 15.935547 6.8066406 C 15.675547 6.7716406 15.126844 6.6953125 14.089844 6.6953125 C 11.923844 6.6953125 10.654297 7.8393125 10.654297 10.445312 L 10.654297 12.019531 L 8.4277344 12.019531 L 8.4277344 14.384766 L 10.654297 14.384766 L 10.654297 19.878906 C 6.8702905 19.240845 4 15.970237 4 12 C 4 7.5698774 7.5698774 4 12 4 z' />
                  </svg>
                </a>
                {/* pinterest */}
                <a
                  href='https://www.pinterest.com/accessorizedbylisa'
                  target='_blank'
                  rel='noreferrer'
                  className='text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600'
                >
                  <svg
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24px'
                    height='24px'
                  >
                    {' '}
                    <path d='M 12 2 C 6.477 2 2 6.477 2 12 C 2 17.523 6.477 22 12 22 C 17.523 22 22 17.523 22 12 C 22 6.477 17.523 2 12 2 z M 12 4 C 16.418 4 20 7.582 20 12 C 20 16.418 16.418 20 12 20 C 11.264382 20 10.555494 19.892969 9.8789062 19.707031 C 10.09172 19.278284 10.282622 18.826454 10.386719 18.425781 C 10.501719 17.985781 10.972656 16.191406 10.972656 16.191406 C 11.278656 16.775406 12.173 17.271484 13.125 17.271484 C 15.958 17.271484 18 14.665734 18 11.427734 C 18 8.3227344 15.467031 6 12.207031 6 C 8.1520313 6 6 8.7215469 6 11.685547 C 6 13.063547 6.73325 14.779172 7.90625 15.326172 C 8.08425 15.409172 8.1797031 15.373172 8.2207031 15.201172 C 8.2527031 15.070172 8.4114219 14.431766 8.4824219 14.134766 C 8.5054219 14.040766 8.4949687 13.958234 8.4179688 13.865234 C 8.0299688 13.394234 7.71875 12.529656 7.71875 11.722656 C 7.71875 9.6496562 9.2879375 7.6445312 11.960938 7.6445312 C 14.268937 7.6445313 15.884766 9.2177969 15.884766 11.466797 C 15.884766 14.007797 14.601641 15.767578 12.931641 15.767578 C 12.009641 15.767578 11.317063 15.006312 11.539062 14.070312 C 11.804063 12.953313 12.318359 11.747406 12.318359 10.941406 C 12.318359 10.220406 11.932859 9.6191406 11.130859 9.6191406 C 10.187859 9.6191406 9.4296875 10.593391 9.4296875 11.900391 C 9.4296875 12.732391 9.7109375 13.294922 9.7109375 13.294922 C 9.7109375 13.294922 8.780375 17.231844 8.609375 17.964844 C 8.5246263 18.326587 8.4963381 18.755144 8.4941406 19.183594 C 5.8357722 17.883113 4 15.15864 4 12 C 4 7.582 7.582 4 12 4 z' />
                  </svg>
                </a>
              </div>
              {/* <!-- social - end --> */}
            </div>

            {/* <!-- link nav - start --> */}
            <div>
              <div className='mb-4 font-bold uppercase tracking-widest text-gray-100'>
                Links
              </div>

              <nav className='flex flex-col gap-4'>
                <div>
                  <Link href='/shop' passHref>
                    <a
                      onClick={() => handleActive('shop')}
                      className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                    >
                      Shop
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href='/contact' passHref>
                    <a
                      onClick={() => handleActive('contact')}
                      className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                    >
                      Contact Us
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href='/about' passHref>
                    <a
                      onClick={() => handleActive('about')}
                      className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                    >
                      About Us
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href='/dashboard' passHref>
                    <a
                      onClick={() => handleActive('dashboard')}
                      className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                    >
                      My Account
                    </a>
                  </Link>
                </div>
              </nav>
            </div>
            {/* <!-- link nav - end --> */}

            {/* <!-- about us nav - start --> */}
            <div>
              <div className='mb-4 font-bold uppercase tracking-widest text-gray-100'>
                About Us
              </div>

              <nav className='flex flex-col gap-4'>
                <div>
                  <Link href='/about' passHref>
                    <a
                      onClick={() => handleActive('about')}
                      className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                    >
                      Our Story
                    </a>
                  </Link>
                </div>
              </nav>
            </div>
            {/* <!-- about us nav - end --> */}

            {/* <!-- nav - start --> */}
            <div className='col-span-2'>
              <div className='mb-4 font-bold uppercase tracking-widest text-gray-100'>
                Contact Info
              </div>
              {/* contact info */}
              <Text className='text-base text-gray-100'>
                Keep in touch with us via any of the below means
              </Text>
              <nav className=' mt-4 flex flex-col gap-4'>
                {/* whatsapp */}
                <div className=''>
                  <a
                    href='https://wa.me/2348073218933'
                    target='_blank'
                    rel='noreferrer'
                    className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                  >
                    <div className='flex items-center space-x-3'>
                      <svg
                        className='h-8 w-8'
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        width='24px'
                        height='24px'
                      >
                        {' '}
                        <path d='M 12.011719 2 C 6.5057187 2 2.0234844 6.478375 2.0214844 11.984375 C 2.0204844 13.744375 2.4814687 15.462563 3.3554688 16.976562 L 2 22 L 7.2324219 20.763672 C 8.6914219 21.559672 10.333859 21.977516 12.005859 21.978516 L 12.009766 21.978516 C 17.514766 21.978516 21.995047 17.499141 21.998047 11.994141 C 22.000047 9.3251406 20.962172 6.8157344 19.076172 4.9277344 C 17.190172 3.0407344 14.683719 2.001 12.011719 2 z M 12.009766 4 C 14.145766 4.001 16.153109 4.8337969 17.662109 6.3417969 C 19.171109 7.8517969 20.000047 9.8581875 19.998047 11.992188 C 19.996047 16.396187 16.413812 19.978516 12.007812 19.978516 C 10.674812 19.977516 9.3544062 19.642812 8.1914062 19.007812 L 7.5175781 18.640625 L 6.7734375 18.816406 L 4.8046875 19.28125 L 5.2851562 17.496094 L 5.5019531 16.695312 L 5.0878906 15.976562 C 4.3898906 14.768562 4.0204844 13.387375 4.0214844 11.984375 C 4.0234844 7.582375 7.6067656 4 12.009766 4 z M 8.4765625 7.375 C 8.3095625 7.375 8.0395469 7.4375 7.8105469 7.6875 C 7.5815469 7.9365 6.9355469 8.5395781 6.9355469 9.7675781 C 6.9355469 10.995578 7.8300781 12.182609 7.9550781 12.349609 C 8.0790781 12.515609 9.68175 15.115234 12.21875 16.115234 C 14.32675 16.946234 14.754891 16.782234 15.212891 16.740234 C 15.670891 16.699234 16.690438 16.137687 16.898438 15.554688 C 17.106437 14.971687 17.106922 14.470187 17.044922 14.367188 C 16.982922 14.263188 16.816406 14.201172 16.566406 14.076172 C 16.317406 13.951172 15.090328 13.348625 14.861328 13.265625 C 14.632328 13.182625 14.464828 13.140625 14.298828 13.390625 C 14.132828 13.640625 13.655766 14.201187 13.509766 14.367188 C 13.363766 14.534188 13.21875 14.556641 12.96875 14.431641 C 12.71875 14.305641 11.914938 14.041406 10.960938 13.191406 C 10.218937 12.530406 9.7182656 11.714844 9.5722656 11.464844 C 9.4272656 11.215844 9.5585938 11.079078 9.6835938 10.955078 C 9.7955938 10.843078 9.9316406 10.663578 10.056641 10.517578 C 10.180641 10.371578 10.223641 10.267562 10.306641 10.101562 C 10.389641 9.9355625 10.347156 9.7890625 10.285156 9.6640625 C 10.223156 9.5390625 9.737625 8.3065 9.515625 7.8125 C 9.328625 7.3975 9.131125 7.3878594 8.953125 7.3808594 C 8.808125 7.3748594 8.6425625 7.375 8.4765625 7.375 z' />
                      </svg>
                      <div className='flex flex-col text-gray-100'>
                        <Text className='text-sm '>Whatsapp:</Text>
                        <Text className='text-xs'>+2348073218933</Text>
                      </div>
                    </div>
                  </a>
                </div>
                {/* email */}
                <div className=''>
                  <a
                    href='mailto:accessorizedbylisa@gmail.com'
                    target='_blank'
                    rel='noreferrer'
                    className='text-gray-400 transition duration-100 hover:text-yellow-500 active:text-yellow-600'
                  >
                    <div className='flex items-center space-x-3'>
                      <svg
                        className='h-8 w-8 '
                        fill='currentColor'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                      >
                        <path d='M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z' />
                      </svg>
                      <div className='flex flex-col text-gray-100'>
                        <Text className='text-sm '>Email:</Text>
                        <Text className='text-xs'>
                          accessorizedbylisa@gmail.com
                        </Text>
                      </div>
                    </div>
                  </a>
                </div>
              </nav>
            </div>
            {/* <!-- nav - end --> */}
          </div>
          {/* signature */}
          <div className=' border-t border-gray-800 py-4 text-center text-sm text-gray-400'>
            <Text className=' '>Designed with ❤ by Demehin Ibukun.</Text>
            <Text className=' '>&#169;{year} All rights reserved.</Text>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
