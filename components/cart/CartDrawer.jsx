import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Select,
  Text,
  useToast,
  // useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { useGlobal } from '../../utils/context/GlobalData';
import empty_cart from '../../public/cart/empty_cart.png';
import axios from 'axios';

const CartDrawer = ({ isOpen, onClose, finalFocusRef }) => {
  const { cartInfo, globalCurr, setCartInfo } = useGlobal();

  console.log('cart drawer :>> ', cartInfo);
  const nairaTotal = cartInfo.reduce((prev, curr) => {
    const naira = +curr?.quantity * +curr?.nairaPrice;
    // const dollar = +curr?.quantity * +curr?.dollarPrice
    return prev + naira;
  }, 0);
  const dollarTotal = cartInfo.reduce((prev, curr) => {
    const dollar = +curr?.quantity * +curr?.dollarPrice;
    // const dollar = +curr?.quantity * +curr?.dollarPrice
    return prev + dollar;
  }, 0);
  // console.log('adds :>> ', adds);
  const [updateLoading, setUpdateLoading] = useState(false);
  // const [cartName, setCartName] = useState([]);

  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://lolaadeoti.vercel.app';

  const URL1 =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

  const handleChange = (e, elem) => {
    let numm = [];
    cartInfo.forEach((val) => {
      if (val?.variantId == elem?.variantId) {
        val.quantity = e.target.value;
      }
      numm.push(val);
    });
    setCartInfo(numm);
  };

  const updateCart = () => {
    try {
      setUpdateLoading(true);
      cartInfo.forEach(async (element) => {
        await axios.put(`${URL1}/api/carts/${element?.strapiId}`, {
          data: element,
        });
      });
      toast({
        title: 'Cart Updated.',
        // description: "We've created your account for you.",
        status: 'info',
        position: 'top',
        // duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const toast = useToast();

  const deleteCart = async (val) => {
    try {
      const newArr = cartInfo.filter(
        (elem) => elem?.strapiId !== val?.strapiId
      );
      setCartInfo(newArr);
      const cartLocal = JSON.parse(localStorage.getItem('lola-cart'));
      delete cartLocal[val?.variantId];
      // const newCart = Object.values(cartLocal)
      // const newLocal = cartLocal
      localStorage.setItem('lola-cart', JSON.stringify(cartLocal));
      await axios.delete(`${URL1}/api/carts/${val?.strapiId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const cartLocal = JSON.parse(localStorage.getItem('lola-cart'));
      const newCart = Object.values(cartLocal);
      newCart.forEach(async (values) => {
        await axios.delete(`${URL1}/api/carts/${values?.datID}`);
      });
      setCartInfo([]);
      localStorage.removeItem('lola-cart');
      toast({
        title: 'Cart cleared 🚨.',
        description: 'Your Cart is now empty.',
        status: 'error',
        position: 'top',
        // duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      size='sm'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton className='transition duration-300 ease-in-out hover:rotate-180' />
        <DrawerHeader>
          <div className='flex space-x-2'>
            <span className='font-black text-gray-400'>Cart</span>
            <span className='font-black text-yellow-600'>Items</span>
          </div>
        </DrawerHeader>
        <DrawerBody>
          {cartInfo.length === 0 ? (
            <Box
              // size='150px'
              className='flex flex-col'
            >
              <div className='relative flex  h-80 w-full'>
                <Image
                  src={empty_cart}
                  layout='fill'
                  objectFit='cover'
                  placeholder='blur'
                  // blurDataURL={
                  //   elem?.attributes?.image?.data?.attributes?.formats?.small
                  //     ?.url
                  // }
                  alt='Empty Cart'
                  className=''
                />
              </div>
              <Text className='text-center text-2xl font-bold'>
                {' '}
                Cart is Empty
              </Text>
            </Box>
          ) : (
            <div className='flex w-full flex-col'>
              {cartInfo.map((elem, id) => (
                <div key={id} className=''>
                  <div className='mb-4 flex  '>
                    {/* <!-- product - start --> */}
                    <div className='flex w-full flex-col overflow-hidden rounded-lg border transition ease-in-out hover:shadow-md'>
                      <div className='flex justify-between space-x-4'>
                        {/* image */}
                        <Link href={`${URL}${elem?.link}`} passHref>
                          <a
                            // href='#'
                            // className='group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40'
                            className=' relative block '
                          >
                            <div className='relative h-32 w-32 sm:h-40 sm:w-40'>
                              <Image
                                src={elem?.image}
                                layout='fill'
                                // loading='lazy'
                                objectFit='cover'
                                alt='Photo by Thái An'
                                className='h-full w-full object-cover object-center transition duration-200 hover:scale-110'
                                placeholder='blur'
                                blurDataURL={elem?.image}
                              />
                            </div>
                          </a>
                        </Link>

                        {/* name | color | price */}
                        <div className='flex flex-1 flex-col justify-between py-4 pr-2'>
                          {/* name | color */}
                          <div>
                            <Link href={`${URL}${elem?.link}`} passHref>
                              <a className='mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 md:text-xl'>
                                <Text>{elem?.name}</Text>
                              </a>
                            </Link>

                            <span className='block text-gray-500'>
                              Color: {elem?.color}
                            </span>
                          </div>
                          {/* Quantity */}
                          <div className='my-1 flex md:mb-4'>
                            <Select
                              // placeholder='Quantity'
                              value={elem?.quantity}
                              // value={qty[id]}
                              maxW='100px'
                              className='cursor-pointer'
                              onChange={(e) => handleChange(e, elem)}
                            >
                              {range(1, elem?.variantQty).map((elem) => (
                                <option key={elem} value={elem}>
                                  {elem}
                                </option>
                              ))}
                            </Select>
                          </div>
                          {/* price */}
                          <div>
                            {globalCurr == 'naira' ? (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#8358;{elem?.nairaPrice}
                                </span>
                              </div>
                            ) : (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#x24;{elem?.dollarPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* quantity | delete | price */}
                      <div className='flex w-full justify-between py-2 px-4 sm:w-auto'>
                        {/* quantity | delete */}
                        <div className='flex flex-col items-start justify-center gap-2'>
                          <Button
                            variant='ghost'
                            onClick={() => deleteCart(elem)}
                            className='select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700'
                          >
                            Delete
                          </Button>
                        </div>
                        {/* total */}
                        <div className='ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16'>
                          {globalCurr == 'naira' ? (
                            <div className=''>
                              <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                &#8358;{+elem?.quantity * +elem?.nairaPrice}
                              </span>
                            </div>
                          ) : (
                            <div className=''>
                              <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                &#x24;{+elem?.quantity * +elem?.dollarPrice}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <!-- product - end --> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter>
          {/* <!-- totals - start --> */}
          {cartInfo.length !== 0 && (
            <div className='flex flex-col items-end gap-2 md:gap-4'>
              {/* subtotal | all total */}
              <div className='mb-4 w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs'>
                {globalCurr == 'naira' ? (
                  <div className=''>
                    {/* <div className='space-y-1'>
                      <div className='flex justify-between gap-4 text-gray-500'>
                        <span>Subtotal</span>
                        <span>&#8358;{nairaTotal}</span>
                      </div>
                    </div> */}

                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#8358;{nairaTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    {/* <div className='space-y-1'>
                      <div className='flex justify-between gap-4 text-gray-500'>
                        <span>Subtotal</span>
                        <span>&#x24;{dollarTotal}</span>
                      </div>
                    </div>
                    
                    <div className='mt-4 border-t pt-1 md:pt-4'>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          &#x24;{dollarTotal}
                          <span className='text-lg font-bold'></span>
                        </span>
                      </div>
                    </div>*/}
                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#x24;{dollarTotal}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* clear | update | checkout */}
              <div className='flex space-x-1 md:space-x-4'>
                <Button
                  onClick={() => clearCart()}
                  variant='outline'
                  colorScheme='red'
                  // isLoading={updateLoading}
                >
                  Clear Cart
                </Button>
                <Button
                  onClick={() => updateCart()}
                  variant='solid'
                  colorScheme='blue'
                  isLoading={updateLoading}
                >
                  Update Cart
                </Button>
                <Button variant='solid' colorScheme='teal'>
                  Checkout
                </Button>
              </div>
            </div>
          )}
          {/* <!-- totals - end --> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
