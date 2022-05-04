import React, { useRef, useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  // Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spacer,
  Text,
  // Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import logo_only from '../../public/logo/logo_only.png';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import {
  HamburgerIcon,
  // ChevronDownIcon,
  // ChevronUpIcon,
} from '@chakra-ui/icons';
import { BsCartCheck } from 'react-icons/bs';
import { Badge } from 'antd';
import CartDrawer from '../cart/CartDrawer';
import { GrLogout, GrLogin } from 'react-icons/gr';
import { MdOutlineDashboard } from 'react-icons/md';
import { useRouter } from 'next/router';
import AOS from 'aos';
import { useGlobal } from '../../utils/context/GlobalData';
// import { getCookie, removeCookies } from 'cookies-next';
import axios from 'axios';
// import { gsap } from 'gsap';

const NavBar = () => {
  /**
   * ? This will have the logo on the left
   * ? nav links in the middle (Home, Shop, About us, Contact Us)
   * ? auth logic and cart at the end
   * ? cart is a draw that has the details in it
   * TODO: work out the logic of a guest making a purchase without login
   */
  const {
    setGlobalCurr,
    cartInfo,
    checkCart,
    setCheckCart,
    setUserID,
    setCartInfo,
    lolaKey,
    setLolaKey,
  } = useGlobal();

  // const [cartTotal, setCartTotal] = useState(0);
  const cartTotal = cartInfo.reduce((prev, curr) => prev + +curr?.quantity, 0);
  // useEffect(() => {
  //   console.log('fire');
  //   const total = cartInfo.reduce((prev, curr) => prev + +curr?.quantity, 0);
  //   setCartTotal(total);
  // }, [cartInfo]);

  // const user = false;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: cartIsOpen,
    onOpen: cartOnOpen,
    onClose: cartOnClose,
  } = useDisclosure();
  const handleOpen = () => {
    cartOnOpen();
    setCheckCart(!checkCart);
  };
  const btnRef = useRef();
  const cartRef = useRef();
  const [active, setActive] = useState('');
  const [currency, setCurrency] = useState('');
  const [currentCurr, setCurrentCurr] = useState('');

  // console.log('lolaKey', lolaKey);
  // console.log('currenct :>> ', currency);
  // console.log('currentCurr', currentCurr);
  // console.log(location);
  const handleCurrency = (val) => {
    // console.log(val.target.value);
    setCurrentCurr(val?.target?.value);
    setGlobalCurr(val?.target?.value);
    localStorage.setItem('currency', val?.target?.value);
  };
  const handleActive = (val) => {
    // e.preventDefault();
    // setActive(val);
    localStorage.setItem('active', val);
  };

  const handleDashboard = (val) => {
    router.push('/dashboard');
    localStorage.setItem('active', val);
  };

  const handleLogin = (val) => {
    router.push('/login');
    localStorage.setItem('active', val);
  };

  const handleLogout = async (val) => {
    // * set localhost userid to new-userid and set global userID
    // ################################################################
    const users = localStorage.getItem('lola-new-userId');
    const userscleaned = JSON.parse(users);
    // console.log('userscleaned :>> ', userscleaned);
    localStorage.setItem('lola-userId', users);
    setUserID(userscleaned);
    // ##################################################################

    //* get address and create lola-address
    // #################################################################
    const { data: addressData } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/addresses/${userscleaned?.addressID.toString()}`
    );

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
    // #################################################################

    //* get unconfirmed cart and create lola-cart
    // ################################################################

    const { data: cartData } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/anonusers/${userscleaned?.anonID.toString()}?populate=*`
    );
    // console.log('cartData :>> ', cartData);
    localStorage.setItem('lola-cart', JSON.stringify({}));
    setCartInfo([]);
    if (cartData?.data?.attributes?.carts?.data.length !== 0) {
      const userCart = cartData?.data?.attributes?.carts?.data.filter(
        (elem) => elem?.attributes?.complete == false
      );
      let newArr = [];
      userCart.forEach((elem) => newArr.push(elem?.attributes));
      setCartInfo(newArr);
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
    }

    // #################################################################

    localStorage.removeItem('lola_key');
    setLolaKey('');
    router.push('/');
    localStorage.setItem('active', val);
  };
  useEffect(() => {
    let val = '';
    // console.log(window.location);
    if (window.location.pathname === '/') {
      localStorage.setItem('active', 'home');
      val = localStorage.getItem('active');
    } else if (window.location.pathname === '/shop') {
      localStorage.setItem('active', 'shop');
      val = localStorage.getItem('active');
    } else if (window.location.pathname === '/about') {
      localStorage.setItem('active', 'about');
      val = localStorage.getItem('active');
    } else if (window.location.pathname === '/contact') {
      localStorage.setItem('active', 'contact');
      val = localStorage.getItem('active');
    } else if (window.location.pathname === '/checkout') {
      localStorage.setItem('active', 'checkout');
      val = localStorage.getItem('active');
    } else if (window.location.pathname === '/dashboard') {
      localStorage.setItem('active', 'dashboard');
      val = localStorage.getItem('active');
    } else {
      val = localStorage.getItem('active');
    }
    setActive(val);

    AOS.init();
  }, []);
  useEffect(() => {
    const current = localStorage.getItem('currency');

    setCurrency(current);
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log('scrollPosition :>> ', scrollPosition);

  // const boxRef = useRef();

  // wait until DOM has been rendered
  // useEffect(() => {
  //   gsap.to(boxRef.current, { rotation: '+=360' });
  // });

  return (
    <div className=' mx-auto max-w-screen-xl px-1 py-2 sm:py-3 sm:px-2 '>
      {/* large screens */}
      <Box
        // data-aos='zoom-in'
        // data-aos-duration='1000'
        data-name='large-screen'
        className='mx-4 hidden md:block'
      >
        <Flex justify='center' align='center'>
          <div className=''>
            {scrollPosition <= 100 && (
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
              </div>
            )}
          </div>
          <Spacer />
          <div className='flex flex-col'>
            {scrollPosition > 100 ? (
              <div className='flex items-center justify-center pb-2'>
                <div className='relative h-8 w-8 '>
                  <Image
                    src={logo_only}
                    alt='lola-adeoti'
                    layout='fill'
                    placeholder='blur'
                  />
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center pb-2'>
                <div className='relative h-12 w-12'>
                  <Image
                    src={logo_only}
                    alt='lola-adeoti'
                    layout='fill'
                    // width={30}
                    // height={30}
                    // className='w-40'
                    placeholder='blur'
                  />
                </div>

                <Text className='text-center text-lg font-bold'>
                  Lola Adeoti
                </Text>
              </div>
            )}

            <Box
              data-name='large-links'
              className=' flex items-center justify-center space-x-3 text-lg font-semibold'
            >
              <Link data-name='home' href='/' passHref>
                <a
                  data-name='home'
                  className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                    active == 'home' ? ' text-yellow-500' : ''
                  }`}
                  onClick={() => handleActive('home')}
                >
                  Home
                </a>
              </Link>
              <Link href='/shop' passHref>
                <a
                  data-name='shop'
                  className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                    active == 'shop' ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => handleActive('shop')}
                >
                  Shop
                </a>
              </Link>
              <Link href='/about' passHref>
                <a
                  data-name='about'
                  className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                    active == 'about' ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => handleActive('about')}
                >
                  About Us
                </a>
              </Link>
              <Link href='/contact' passHref>
                <a
                  data-name='contact'
                  className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                    active == 'contact' ? 'text-yellow-500' : ''
                  }`}
                  onClick={() => handleActive('contact')}
                >
                  Contact Us
                </a>
              </Link>
            </Box>
          </div>
          <Spacer />
          <div className='flex '>
            {scrollPosition <= 100 && (
              <Box className='flex  items-center justify-end space-x-0'>
                {/* currency changer */}
                <Box>
                  {/* <Switch checkedChildren='&#8358;' unCheckedChildren='&#x24;' /> */}
                  <Select
                    value={currentCurr == '' ? currency : currentCurr}
                    variant='unstyled'
                    className='cursor-pointer'
                    onChange={(e) => handleCurrency(e)}
                  >
                    <option value='naira'>&#8358;</option>
                    <option value='dollar'>&#x24;</option>
                  </Select>
                </Box>
                {/* profile or login */}
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label='Profile Menu'
                    isRound
                    variant='ghost'
                  >
                    <Avatar
                      size='sm'
                      bg='white'
                      icon={<FaUser fontSize='1.2rem' />}
                      // src='https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100'
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      // as='box'
                      // href='/dashboard'
                      icon={<MdOutlineDashboard />}
                      className={` cursor-pointer py-2 px-2  transition duration-300 ease-in-out  hover:ring-1 hover:ring-gray-300`}
                      onClick={() => handleDashboard('dashboard')}
                    >
                      Dashboard
                    </MenuItem>
                    {/* </MenuList> */}
                    {lolaKey ? (
                      <MenuItem
                        className={` cursor-pointer py-2 px-2  transition duration-300 ease-in-out  hover:ring-1 hover:ring-gray-300`}
                        onClick={() => handleLogout('home')}
                        icon={<GrLogout />}
                      >
                        Log Out
                      </MenuItem>
                    ) : (
                      <MenuItem
                        // as='a'
                        // href='/login'
                        icon={<GrLogin />}
                        className={` cursor-pointer py-2 px-2  transition duration-300 ease-in-out  hover:ring-1 hover:ring-gray-300 `}
                        onClick={() => handleLogin('login')}
                      >
                        Login
                      </MenuItem>

                      // </MenuList>
                    )}
                  </MenuList>
                </Menu>

                {/* cart icon */}
                <IconButton
                  variant='ghost'
                  isRound
                  aria-label='Shopping Cart'
                  ref={cartRef}
                  onClick={handleOpen}
                  // size='lg'
                  // icon={<BsCartCheck fontSize='1.5rem' />}
                >
                  <Badge
                    count={cartTotal}
                    overflowCount={10}
                    style={{ backgroundColor: '#1e40af' }}
                  >
                    <Icon as={BsCartCheck} fontSize='1.5rem' />
                  </Badge>
                </IconButton>
              </Box>
            )}
          </div>
        </Flex>
      </Box>
      {/*small screens */}
      <Box data-name='small-screen' className=' mx-1 block md:hidden'>
        <Flex justify='center' align='center'>
          <IconButton
            // colorScheme='blue'
            ref={btnRef}
            onClick={onOpen}
            variant='ghost'
            aria-label='Navigation Links'
            icon={<HamburgerIcon />}
          />
          <Spacer />
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton className='transition duration-300 ease-in-out hover:rotate-180' />
              <DrawerHeader>
                <div className='flex space-x-2'>
                  <div className='relative h-8 w-8'>
                    <Image
                      src={logo_only}
                      alt='lola-adeoti'
                      layout='fill'
                      // width={30}
                      // height={30}
                      // className='w-40'
                      placeholder='blur'
                    />
                  </div>
                  <span>Lola Adeoti</span>
                </div>
              </DrawerHeader>
              <DrawerBody>
                <Box
                  // size='150px'
                  className='flex flex-col space-y-2 text-lg font-semibold'
                >
                  <Link href='/' passHref>
                    <a
                      data-name='home'
                      className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                        active == 'home' ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleActive('home')}
                    >
                      Home
                    </a>
                  </Link>
                  <Link href='/shop' passHref>
                    <a
                      data-name='shop'
                      className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                        active == 'shop' ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleActive('shop')}
                    >
                      Shop
                    </a>
                  </Link>
                  <Link href='/about' passHref>
                    <a
                      data-name='about'
                      className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                        active == 'about' ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleActive('about')}
                    >
                      About Us
                    </a>
                  </Link>
                  <Link href='/contact' passHref>
                    <a
                      data-name='contact'
                      className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                        active == 'contact' ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleActive('contact')}
                    >
                      Contact Us
                    </a>
                  </Link>
                  <Link href='/dashboard' passHref>
                    <a
                      data-name='dashboard'
                      className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                        active == 'dashboard' ? 'text-yellow-500' : ''
                      }`}
                      onClick={() => handleActive('dashboard')}
                    >
                      Dashboard
                    </a>
                  </Link>
                  {lolaKey ? (
                    <div
                      data-name='logout'
                      className={` cursor-pointer rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 `}
                      onClick={() => handleLogout('home')}
                    >
                      Logout
                    </div>
                  ) : (
                    <Link href='/login' passHref>
                      <a
                        data-name='login'
                        className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                          active == 'login' ? 'text-yellow-500' : ''
                        }`}
                        onClick={() => handleLogin('login')}
                      >
                        Login
                      </a>
                    </Link>
                  )}
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          <div className='relative h-8 w-8 sm:h-12 sm:w-12'>
            <Image
              src={logo_only}
              alt='lola-adeoti'
              layout='fill'
              // width={30}
              // height={30}
              // className='w-40'
              placeholder='blur'
            />
          </div>
          <Spacer />
          <Box className='flex items-center justify-center -space-x-1'>
            <Select
              value={currentCurr == '' ? currency : currentCurr}
              variant='unstyled'
              className='cursor-pointer'
              onChange={(e) => handleCurrency(e)}
            >
              <option value='naira'>&#8358;</option>
              <option value='dollar'>&#x24;</option>
            </Select>

            {/* cart */}
            <IconButton
              variant='ghost'
              isRound
              aria-label='Shopping Cart'
              ref={cartRef}
              onClick={handleOpen}
              // size='lg'
              // icon={<BsCartCheck fontSize='1.5rem' />}
            >
              <Badge
                count={cartTotal}
                overflowCount={10}
                style={{ backgroundColor: '#1e40af' }}
              >
                <Icon as={BsCartCheck} fontSize='1.5rem' />
              </Badge>
            </IconButton>
          </Box>
        </Flex>
      </Box>
      <CartDrawer
        isOpen={cartIsOpen}
        onClose={cartOnClose}
        finalFocusRef={cartRef}
      />
    </div>
  );
};

export default NavBar;

/**
 * 
 * <MenuItem
                    // as='box'
                    // href='/dashboard'
                    icon={<MdOutlineDashboard />}
                    className={` cursor-pointer py-2 px-2  transition duration-300 ease-in-out  hover:ring-1 hover:ring-gray-300 ${
                      active == 'dashboard'
                        ? 'text-yellow-500'
                        : ''
                    }`}
                    onClick={() => handleDashboard('dashboard')}
                  >
                    Dashboard
                  </MenuItem>


 * {false ? (
              <IconButton isRound variant='ghost' aria-label='User Profile'>
                <Avatar
                  size='sm'
                  bg='white'
                  icon={<FaUser fontSize='1.3rem' />}
                  src='https://avatars.dicebear.com/api/micah/:child.svg?mouth[]=laughing&mouth[]=smile&glassesProbability=100'
                />
              </IconButton>
            ) : (
              <Link href='/' passHref>
                <a
                  data-name='login'
                  className={`rounded-md py-2 px-2 text-lg  font-semibold transition duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                    active == 'login'
                      ? 'text-yellow-500'
                      : ''
                  }`}
                  onClick={() => handleActive('login')}
                >
                  Login
                </a>
              </Link>
            )}
 */
