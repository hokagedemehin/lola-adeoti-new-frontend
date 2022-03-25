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

const NavBar = () => {
  /**
   * ? This will have the logo on the left
   * ? nav links in the middle (Home, Shop, About us, Contact Us)
   * ? auth logic and cart at the end
   * ? cart is a draw that has the details in it
   * TODO: work out the logic of a guest making a purchase without login
   */
  const { setGlobalCurr, cartInfo, checkCart, setCheckCart } = useGlobal();

  // const [cartTotal, setCartTotal] = useState(0);
  const cartTotal = cartInfo.reduce((prev, curr) => prev + +curr?.quantity, 0);
  // useEffect(() => {
  //   console.log('fire');
  //   const total = cartInfo.reduce((prev, curr) => prev + +curr?.quantity, 0);
  //   setCartTotal(total);
  // }, [cartInfo]);

  const user = false;
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

  return (
    <div className=' mx-auto max-w-screen-xl px-1 py-2 sm:py-3 sm:px-2 '>
      {/* large screens */}
      <Box
        // data-aos='zoom-in'
        // data-aos-duration='1000'
        data-name='large-screen'
        className='mx-4 hidden sm:block'
      >
        <Flex justify='center' align='center'>
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
          <Box
            data-name='large-links'
            className=' flex items-center justify-center space-x-3 text-lg font-semibold'
          >
            <Link data-name='home' href='/' passHref>
              <a
                data-name='home'
                className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                  active == 'home'
                    ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                    : ''
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
                  active == 'shop'
                    ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                    : ''
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
                  active == 'about'
                    ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                    : ''
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
                  active == 'contact'
                    ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                    : ''
                }`}
                onClick={() => handleActive('contact')}
              >
                Contact Us
              </a>
            </Link>
          </Box>
          <Spacer />
          <Box className='flex items-center justify-center space-x-0'>
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
                  className={` cursor-pointer py-2 px-2  transition duration-300 ease-in-out  hover:ring-1 hover:ring-gray-300 ${
                    active == 'dashboard'
                      ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                      : ''
                  }`}
                  onClick={() => handleDashboard('dashboard')}
                >
                  Dashboard
                </MenuItem>
                {/* </MenuList> */}
                {user ? (
                  // <MenuList>
                  <MenuItem as='a' href='/' icon={<GrLogout />}>
                    Log Out
                  </MenuItem>
                ) : (
                  // </MenuList>
                  // <MenuList>
                  <MenuItem
                    as='a'
                    href='/login'
                    icon={<GrLogin />}
                    className={` py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                      active == 'login'
                        ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                        : ''
                    }`}
                    onClick={() => handleActive('login')}
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
        </Flex>
      </Box>
      {/*small screens */}
      <Box data-name='small-screen' className=' mx-1 block sm:hidden'>
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
                        active == 'home'
                          ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                          : ''
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
                        active == 'shop'
                          ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                          : ''
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
                        active == 'about'
                          ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                          : ''
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
                        active == 'contact'
                          ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                          : ''
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
                        active == 'dashboard'
                          ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                          : ''
                      }`}
                      onClick={() => handleActive('dashboard')}
                    >
                      Dashboard
                    </a>
                  </Link>
                  {user ? (
                    <Link href='/' passHref>
                      <a
                        data-name='logout'
                        className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 `}
                        onClick={() => handleActive('home')}
                      >
                        Logout
                      </a>
                    </Link>
                  ) : (
                    <Link href='/login' passHref>
                      <a
                        data-name='login'
                        className={`rounded-md py-2 px-2 transition  duration-300 ease-in-out hover:bg-gray-500 hover:text-white hover:ring-1 hover:ring-gray-300 ${
                          active == 'login'
                            ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                            : ''
                        }`}
                        onClick={() => handleActive('login')}
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
                        ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
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
                      ? 'bg-yellow-500 text-white ring-1 ring-gray-300'
                      : ''
                  }`}
                  onClick={() => handleActive('login')}
                >
                  Login
                </a>
              </Link>
            )}
 */
