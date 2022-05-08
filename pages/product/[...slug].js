import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
// import { Image } from 'antd';
import Image from 'next/image';
import { useGlobal } from '../../utils/context/GlobalData';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  // Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
// import RelatedProducts from '../../components/shop/RelatedProducts';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import NewRelatedProducts from '../../components/shop/NewRelatedProducts';
// import Link from 'next/link';

const qs = require('qs');
const ProductDetails = ({ products }) => {
  // const product = products;
  // const {variantImage} = useGlobal();
  // console.log('product details:>> ', products);
  const router = useRouter();
  let id = null;
  // console.log('router :>> ', router);

  if (router?.query?.slug) {
    id = router?.query?.slug[0];
  }
  // console.log(id);
  const queryPopulate = qs.stringify(
    {
      populate: ['image', 'variants.image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const handleProducts = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}?${queryPopulate}`
      // `${URL}/api/anonusers/${userID?.anonID}?populate=*`
    );
    // console.log(data);
    return data?.data;
  };

  const {
    data: product,
    isSuccess,
    isLoading,
  } = useQuery(['products', id], async () => await handleProducts(), {
    enabled: !!id,
  });
  // console.log('product', product);
  // console.log('isSuccess', isSuccess);

  const {
    globalCurr,
    userID,
    cartInfo,
    setCartInfo,
    variantColor,
    variantName,
  } = useGlobal();

  console.log('variantColor :>> ', variantColor);
  console.log('variantName :>> ', variantName);

  const initialData = async () => {
    const queryColor = qs.stringify(
      {
        populate: '*',
        filters: {
          color: {
            $eq: variantColor,
          },
          name: {
            $eq: variantName,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data: variantImage } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variants?${queryColor}`
    );

    const id = variantImage?.data[0]?.attributes?.product?.data?.id;

    const { data: productData } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}?populate=*`
    );

    // console.log('variantImage', variantImage);
    // console.log('productData', productData);

    const img = variantImage?.data[0]?.attributes?.image?.data?.attributes?.url;

    const productName = productData?.data?.attributes?.name;
    const color = variantColor;
    const selectQuantity = 1;
    const variantID = variantImage?.data[0]?.id;
    const index = productData?.data?.attributes?.variants?.data.findIndex(
      (elem) => elem?.attributes?.color == variantColor
    );
    const variantQty = variantImage?.data[0]?.attributes?.quantity;
    // console.log(
    //   img,
    //   productName,
    //   color,
    //   selectQuantity,
    //   variantID,
    //   index,
    //   variantQty
    // );
    setVarImg(img);
    setVarName(productName);
    setVarColor(color);
    setQty(selectQuantity);
    setVarID(variantID);
    setIndexID(index);
    setVarQty(variantQty);
    if (variantQty > 0) {
      setBtnLoad(true);
      setCartLoad(false);
    } else {
      setBtnLoad(false);
      setCartLoad(true);
    }
  };

  useEffect(() => {
    if (variantColor && variantName) {
      initialData();
    }
  }, [variantColor, variantName]);

  const [varImg, setVarImg] = useState(null);
  const [varName, setVarName] = useState(null);
  const [varColor, setVarColor] = useState(null);
  const [varID, setVarID] = useState(null);
  const [varQty, setVarQty] = useState(null);
  const [btnLoad, setBtnLoad] = useState(false);
  const [cartLoad, setCartLoad] = useState(false);
  const [indexID, setIndexID] = useState(null);
  const [qty, setQty] = useState(1);

  // console.log(userID, setUserID);
  // const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  // console.log('formValue', formValue);
  // console.log('indexID :>> ', indexID);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  // useEffect(() => {
  //   setVarImg(variantImage?.data?.attributes?.image?.data?.attributes?.url);
  // }, [variantImage]);

  const handleNotify = async () => {
    try {
      setModalLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bagnotifications`,
        {
          data: {
            variantId: varID,
            name: product?.attributes?.name,
            color:
              product?.attributes?.variants?.data[indexID]?.attributes?.color,

            userName: formValue?.name,
            userEmail: formValue?.email,
          },
        }
      );
      const sendForm = JSON.stringify(formValue);
      const form = await axios.post('/api/contact', sendForm);
      console.log('form :>> ', JSON.parse(form?.config?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setModalLoading(false);
      onClose();
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleChange = (value) => {
    setQty(+value.target.value);
  };

  const handleVariant = (val, elem, id) => {
    // console.log(val);
    setVarImg(val?.attributes?.image?.data?.attributes?.url);
    setVarName(elem?.attributes?.name);
    setVarColor(val?.attributes?.color);
    setQty(1);
    setVarID(val?.id);
    setIndexID(id);
    setVarQty(val?.attributes?.quantity);
    if (val?.attributes?.quantity > 0) {
      setBtnLoad(true);
      // setVarQty(true);
      setCartLoad(false);
    } else {
      setBtnLoad(false);
      setCartLoad(true);
    }
  };

  const handleCart = async () => {
    const id = nanoid();
    const link = `/product/${product?.id}/${product?.attributes?.slug}`;
    const newCart = {
      cartId: id,
      strapiId: null,
      name: product?.attributes?.name,
      color: product?.attributes?.variants?.data[indexID]?.attributes?.color,
      link: link,
      image:
        product?.attributes?.variants?.data[indexID]?.attributes?.image?.data
          ?.attributes?.url,
      quantity: qty,
      nairaPrice: product?.attributes?.nairaSalePrice,
      dollarPrice: product?.attributes?.dollarSalePrice,
      // totalNaira: +product?.attributes?.nairaSalePrice * +qty,
      // totalDollar: +product?.attributes?.dollarSalePrice * +qty,
      variantId: varID,
      anonuser: userID?.anonID,
      variant: varID,
      variantQty: varQty,
    };
    // console.log('newCart', newCart);
    const arr = {
      cartId: id,
      variantId: varID,
      datID: null,
    };
    if (cartInfo.length === 0) {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts`,
        {
          data: newCart,
          variant: varID,
        }
      );
      const newID = data?.data?.id;
      newCart.strapiId = newID;
      arr.datID = newID;
      localStorage.setItem('lola-cart', JSON.stringify({ [varID]: arr }));
      // const query = qs.stringify(
      //   {
      //     filters: {
      //       cartId: {
      //         $eq: elem?.cartId.toString(),
      //       },
      //     },
      //   },
      //   {
      //     encodeValuesOnly: true,
      //   }
      // );
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/${newID}`,
        {
          data: { strapiId: newID },
        }
      );
      // localStorage.setItem('lola-cart-1', JSON.stringify({[varID]: newCart}))
      setCartInfo([newCart]);
      toast({
        title: 'Added to cart 🎉',
        description: 'Open your cart to see your bags',
        status: 'success',
        // duration: 9000,
        isClosable: true,
      });
    } else {
      const carts = JSON.parse(localStorage.getItem('lola-cart'));
      // const carts1 = JSON.parse(localStorage.getItem('lola-cart-1'));

      const cartKeys = Object.keys(carts);
      // const cartKeys1 = Object.keys(carts1);

      if (!cartKeys.includes(newCart.variantId.toString())) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts`,
          {
            data: newCart,
            variant: varID,
          }
        );
        const newID = data?.data?.id;
        newCart.strapiId = newID;
        arr.datID = newID;
        const newCart1 = Object.assign(carts, {
          [varID]: arr,
        });
        // const newCart2 = Object.assign(carts1, {
        //   [varID]: newCart,
        // });

        localStorage.setItem('lola-cart', JSON.stringify(newCart1));
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/${newID}`,
          {
            data: { strapiId: newID },
          }
        );
        // localStorage.setItem('lola-cart-1', JSON.stringify(newCart2));
        setCartInfo([...cartInfo, newCart]);
        toast({
          title: 'Added to cart 🎉',
          description: 'Open your cart to see your bags',
          status: 'success',
          // duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Bag already in cart 🛒',
          description: 'Open your cart to see your bags',
          status: 'info',
          variant: 'left-accent',
          // duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const toast = useToast();

  // console.log('range', range(1, 4));

  return (
    <Layout
      name={`${products?.attributes?.name}`}
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className='pt-16'>
        <div className=' py-6 sm:py-8 lg:py-12'>
          <div className='mx-auto max-w-screen-lg px-4 md:px-8'>
            {/* product detail start */}
            {isSuccess && (
              <div className='grid gap-8 md:grid-cols-2'>
                {/* <!-- images - start --> */}
                <div className=''>
                  <div className=''></div>
                  {/* large screens */}
                  <div className='hidden h-full w-full md:relative md:block '>
                    <Image
                      src={
                        varImg && varName == product?.attributes?.name
                          ? varImg
                          : product?.attributes?.image?.data?.attributes?.url
                      }
                      layout='fill'
                      objectFit='cover'
                      // objectPosition='center'
                      placeholder='blur'
                      blurDataURL={
                        product?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url
                      }
                      alt={product?.attributes?.name}
                      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                    />
                  </div>
                  {/* small screens */}
                  <div className='relative block h-72 w-full md:hidden '>
                    <Image
                      src={
                        varImg && varName == product?.attributes?.name
                          ? varImg
                          : product?.attributes?.image?.data?.attributes?.url
                      }
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      blurDataURL={
                        product?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url
                      }
                      alt={product?.attributes?.name}
                      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                    />
                  </div>
                </div>
                {/* <!-- images - end --> */}

                {/* <!-- content - start --> */}
                <div className='md:py-2'>
                  {/* <!-- name - start --> */}
                  <div className='mb-2 md:mb-3'>
                    <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
                      {product?.attributes?.name}
                    </h2>
                  </div>
                  {/* <!-- name - end --> */}

                  {/* <!-- color - start --> */}
                  <div className='mb-4 md:mb-6'>
                    <div className='mb-3 flex space-x-2 text-sm font-semibold text-gray-500 sm:text-lg'>
                      <Text>Color:</Text>
                      <Text className='text-zinc-700'>
                        {varColor ? varColor : 'Choose a color'}
                      </Text>
                    </div>
                    {/* color pallet */}
                    <div className='flex h-fit w-64 flex-wrap gap-3 pl-2 text-white '>
                      {product?.attributes?.variants?.data.map((val, id) => (
                        <div
                          key={id}
                          style={{ backgroundColor: val?.attributes?.hex }}
                          onClick={() => handleVariant(val, product, id)}
                          className='h-8 w-8 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-10 sm:w-10'
                        ></div>
                      ))}
                    </div>
                  </div>
                  {/* <!-- color - end --> */}

                  {/* <!-- price - start --> */}
                  <div className='mb-4'>
                    <div className='flex items-end gap-2'>
                      {globalCurr == 'naira' ? (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#8358;{product?.attributes?.nairaSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              product?.attributes?.nairaSalePrice ==
                              product?.attributes?.nairaPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#8358;{product?.attributes?.nairaPrice}
                          </Text>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#x24;{product?.attributes?.dollarSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              product?.attributes?.dollarSalePrice ==
                              product?.attributes?.dollarPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#x24;{product?.attributes?.dollarPrice}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <!-- price - end --> */}

                  {/* quantity start */}
                  <div className='mb-4 flex'>
                    {cartLoad ? (
                      ''
                    ) : (
                      <Select
                        // placeholder='Quantity'
                        value={qty}
                        maxW='120px'
                        className='cursor-pointer'
                        onChange={(e) => handleChange(e)}
                        isDisabled={!btnLoad}
                      >
                        {range(1, varQty).map((elem) => (
                          <option key={elem} value={elem}>
                            {elem}
                          </option>
                        ))}
                      </Select>
                    )}
                  </div>
                  {/* quantity end */}

                  {/* <!-- cart buttons - start --> */}
                  <div className='flex'>
                    {cartLoad ? (
                      <div className='flex flex-col space-y-2'>
                        <Text className='text-xl font-bold text-red-700'>
                          Out of Stock
                        </Text>
                        <Button
                          onClick={onOpen}
                          colorScheme='teal'
                          variant='outline'
                          ref={finalRef}
                          // isDisabled={true}
                        >
                          Notify Me When Available
                        </Button>
                        <Modal
                          initialFocusRef={initialRef}
                          finalFocusRef={finalRef}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Notify Me</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <Text className='mb-3 text-lg font-semibold'>
                                We will notify you when this bag is available
                              </Text>
                              <FormControl>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                  onChange={(e) => handleForm(e)}
                                  name='name'
                                  id='name'
                                  ref={initialRef}
                                  placeholder='Name...'
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                  onChange={(e) => handleForm(e)}
                                  name='email'
                                  id='email'
                                  placeholder='Email...'
                                  type='email'
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                onClick={() => handleNotify()}
                                colorScheme='blue'
                                mr={3}
                                isLoading={modalLoading}
                              >
                                Send
                              </Button>
                              <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </div>
                    ) : (
                      // <Button
                      //   // href='#'
                      //   onClick={() => handleCart()}
                      //   colorScheme='teal'
                      //   variant='solid'
                      //   isDisabled={!btnLoad}
                      // >
                      //   Add to cart
                      // </Button>
                      <div
                        onClick={() => handleCart()}
                        className='flex cursor-pointer items-center justify-center rounded-lg bg-black px-4 py-1  font-semibold text-white ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:bg-yellow-500 hover:text-black hover:shadow-md hover:shadow-gray-600  sm:px-6 sm:py-2 sm:text-lg'
                      >
                        Add to cart
                      </div>
                    )}
                  </div>
                  {/* <!-- cart buttons - end --> */}
                </div>
                {/* <!-- content - end --> */}
              </div>
            )}
            {isLoading && (
              <div className='grid gap-8 md:grid-cols-2'>
                {/* <!-- images - start --> */}
                <div className=''>
                  <div className=''></div>
                  {/* large screens */}
                  <div className='hidden h-full w-full md:relative md:block '>
                    <Image
                      src={
                        varImg && varName == products?.attributes?.name
                          ? varImg
                          : products?.attributes?.image?.data?.attributes?.url
                      }
                      layout='fill'
                      objectFit='cover'
                      // objectPosition='center'
                      placeholder='blur'
                      blurDataURL={
                        products?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url
                      }
                      alt={products?.attributes?.name}
                      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                    />
                  </div>
                  {/* small screens */}
                  <div className='relative block h-72 w-full md:hidden '>
                    <Image
                      src={
                        varImg && varName == products?.attributes?.name
                          ? varImg
                          : products?.attributes?.image?.data?.attributes?.url
                      }
                      layout='fill'
                      objectFit='contain'
                      placeholder='blur'
                      blurDataURL={
                        products?.attributes?.image?.data?.attributes?.formats
                          ?.small?.url
                      }
                      alt={products?.attributes?.name}
                      className='transition delay-150 duration-500 ease-in-out hover:scale-110'
                    />
                  </div>
                </div>
                {/* <!-- images - end --> */}

                {/* <!-- content - start --> */}
                <div className='md:py-2'>
                  {/* <!-- name - start --> */}
                  <div className='mb-2 md:mb-3'>
                    <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>
                      {products?.attributes?.name}
                    </h2>
                  </div>
                  {/* <!-- name - end --> */}

                  {/* <!-- color - start --> */}
                  <div className='mb-4 md:mb-6'>
                    <div className='mb-3 flex space-x-2 text-sm font-semibold text-gray-500 sm:text-lg'>
                      <Text>Color:</Text>
                      <Text className='text-zinc-700'>
                        {varColor ? varColor : 'Choose a color'}
                      </Text>
                    </div>
                    {/* color pallet */}
                    <div className='flex h-fit w-64 flex-wrap gap-3 pl-2 text-white '>
                      {products?.attributes?.variants?.data.map((val, id) => (
                        <div
                          key={id}
                          style={{ backgroundColor: val?.attributes?.hex }}
                          onClick={() => handleVariant(val, products, id)}
                          className='h-8 w-8 cursor-pointer rounded-full ring-1 ring-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-gray-800 sm:h-10 sm:w-10'
                        ></div>
                      ))}
                    </div>
                  </div>
                  {/* <!-- color - end --> */}

                  {/* <!-- price - start --> */}
                  <div className='mb-4'>
                    <div className='flex items-end gap-2'>
                      {globalCurr == 'naira' ? (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#8358;{products?.attributes?.nairaSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              products?.attributes?.nairaSalePrice ==
                              products?.attributes?.nairaPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#8358;{products?.attributes?.nairaPrice}
                          </Text>
                        </div>
                      ) : (
                        <div className='flex items-center space-x-2'>
                          <Text className='font-semibold sm:text-lg'>
                            &#x24;{products?.attributes?.dollarSalePrice}
                          </Text>
                          <Text
                            as='s'
                            className={`text-sm font-semibold text-gray-400 ${
                              products?.attributes?.dollarSalePrice ==
                              products?.attributes?.dollarPrice
                                ? 'hidden'
                                : ''
                            }`}
                          >
                            &#x24;{products?.attributes?.dollarPrice}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <!-- price - end --> */}

                  {/* quantity start */}
                  <div className='mb-4 flex'>
                    {cartLoad ? (
                      ''
                    ) : (
                      <Select
                        // placeholder='Quantity'
                        value={qty}
                        maxW='120px'
                        className='cursor-pointer'
                        onChange={(e) => handleChange(e)}
                        isDisabled={!btnLoad}
                      >
                        {range(1, varQty).map((elem) => (
                          <option key={elem} value={elem}>
                            {elem}
                          </option>
                        ))}
                      </Select>
                    )}
                  </div>
                  {/* quantity end */}

                  {/* <!-- cart buttons - start --> */}
                  <div className='flex'>
                    {cartLoad ? (
                      <div className='flex flex-col space-y-2'>
                        <Text className='text-xl font-bold text-red-700'>
                          Out of Stock
                        </Text>
                        <Button
                          onClick={onOpen}
                          colorScheme='teal'
                          variant='outline'
                          ref={finalRef}
                          // isDisabled={true}
                        >
                          Notify Me When Available
                        </Button>
                        <Modal
                          initialFocusRef={initialRef}
                          finalFocusRef={finalRef}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Notify Me</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <Text className='mb-3 text-lg font-semibold'>
                                We will notify you when this bag is available
                              </Text>
                              <FormControl>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                  onChange={(e) => handleForm(e)}
                                  name='name'
                                  id='name'
                                  ref={initialRef}
                                  placeholder='Name...'
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Input
                                  onChange={(e) => handleForm(e)}
                                  name='email'
                                  id='email'
                                  placeholder='Email...'
                                  type='email'
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                onClick={() => handleNotify()}
                                colorScheme='blue'
                                mr={3}
                                isLoading={modalLoading}
                              >
                                Send
                              </Button>
                              <Button onClick={onClose}>Close</Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                      </div>
                    ) : (
                      <Button
                        // href='#'
                        onClick={() => handleCart()}
                        colorScheme='teal'
                        variant='solid'
                        isDisabled={!btnLoad}
                      >
                        Add to cart
                      </Button>
                    )}
                  </div>
                  {/* <!-- cart buttons - end --> */}
                </div>
                {/* <!-- content - end --> */}
              </div>
            )}
            {/* product detail end  */}

            {/* <!-- description - start --> */}
            {isSuccess && (
              <div className='mt-10 md:mt-16 lg:mt-20'>
                <Tabs isFitted variant='enclosed'>
                  <TabList mb='1em'>
                    <Tab>Description</Tab>
                    <Tab>Reviews</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text>{product?.attributes?.shortDescription}</Text>
                      <br />
                      {/* <br /> */}
                      <Text>{product?.attributes?.description}</Text>
                      <br />
                      <Text className='font-bold'>
                        {product?.attributes?.disclaimer}
                      </Text>
                    </TabPanel>
                    <TabPanel>
                      <div className=' py-4 sm:py-6'>
                        <div className='mx-auto max-w-screen-lg px-2 md:px-4'>
                          <div className='mb-4 flex items-center border-b py-4'>
                            <Button
                              // href='#'
                              className='inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base'
                            >
                              Write a review
                            </Button>
                          </div>

                          <div className='divide-y'>
                            {/* <!-- review - start --> */}
                            <div className='flex flex-col gap-3 py-4 md:py-8'>
                              <div>
                                <div className='block text-sm font-bold'>
                                  John McCulling
                                </div>
                                <div className='block text-sm text-gray-500'>
                                  August 28, 2021
                                </div>
                              </div>

                              {/* <!-- stars - start --> */}
                              <div className='-ml-1 flex gap-0.5'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              </div>
                              {/* <!-- stars - end --> */}

                              <p className='text-gray-600'>
                                This is a section of some simple filler text,
                                also known as placeholder text. It shares some
                                characteristics of a real written text but is
                                random or otherwise generated. It may be used to
                                display a sample of fonts or generate text for
                                testing.
                              </p>
                            </div>
                            {/* <!-- review - end --> */}
                          </div>
                        </div>
                      </div>
                      ;
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                {/* <div className='mb-3 text-lg font-semibold text-gray-800'>
                Description
              </div> */}
              </div>
            )}
            {isLoading && (
              <div className='mt-10 md:mt-16 lg:mt-20'>
                <Tabs isFitted variant='enclosed'>
                  <TabList mb='1em'>
                    <Tab>Description</Tab>
                    <Tab>Reviews</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Text>{products?.attributes?.shortDescription}</Text>
                      <br />
                      {/* <br /> */}
                      <Text>{products?.attributes?.description}</Text>
                    </TabPanel>
                    <TabPanel>
                      <div className=' py-4 sm:py-6'>
                        <div className='mx-auto max-w-screen-lg px-2 md:px-4'>
                          <div className='mb-4 flex items-center border-b py-4'>
                            <Button
                              // href='#'
                              className='inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:px-8 md:py-3 md:text-base'
                            >
                              Write a review
                            </Button>
                          </div>

                          <div className='divide-y'>
                            {/* <!-- review - start --> */}
                            <div className='flex flex-col gap-3 py-4 md:py-8'>
                              <div>
                                <div className='block text-sm font-bold'>
                                  John McCulling
                                </div>
                                <div className='block text-sm text-gray-500'>
                                  August 28, 2021
                                </div>
                              </div>

                              {/* <!-- stars - start --> */}
                              <div className='-ml-1 flex gap-0.5'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>

                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-5 w-5 text-yellow-400'
                                  viewBox='0 0 20 20'
                                  fill='currentColor'
                                >
                                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                              </div>
                              {/* <!-- stars - end --> */}

                              <p className='text-gray-600'>
                                This is a section of some simple filler text,
                                also known as placeholder text. It shares some
                                characteristics of a real written text but is
                                random or otherwise generated. It may be used to
                                display a sample of fonts or generate text for
                                testing.
                              </p>
                            </div>
                            {/* <!-- review - end --> */}
                          </div>
                        </div>
                      </div>
                      ;
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                {/* <div className='mb-3 text-lg font-semibold text-gray-800'>
                Description
              </div> */}
              </div>
            )}
            {/* <!-- description - end --> */}

            {/* related product start */}
            <div className='mt-6 flex'>
              {/* <RelatedProducts id={product?.id} /> */}
              {<NewRelatedProducts id={varID} />}
              {/* <NewRelatedProducts id={product?.id} /> */}
            </div>
            {/* related products end */}
          </div>
        </div>
      </div>
    </Layout>
    // <div className='pt-20'>Productdetails</div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
  );

  const paths = data.data.map((product) => ({
    params: { slug: [product?.id.toString(), product?.attributes?.slug] },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log(params);
  // const URL =
  //   process.env.NODE_ENV !== 'production'
  //     ? 'http://localhost:1337'
  //     : 'https://lola-adeoti-new-backend.herokuapp.com';

  const queryPopulate = qs.stringify(
    {
      populate: ['image', 'variants.image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  // let product = await axios.get(`${URL}/api/products?${queryPopulate}`);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${params.slug[0]}?${queryPopulate}`
  );
  if (!data?.data) {
    return { notFound: true };
  }
  // console.log('data', data);
  return {
    props: {
      products: data.data,
    },
    revalidate: 5,
  };
}

// // import {getServerSideSitemap} from 'next-sitemap'
// export async function getServerSideProps({ params }) {
//   const URL =
//     process.env.NODE_ENV !== 'production'
//       ? 'http://localhost:1337'
//       : 'https://lola-adeoti-new-backend.herokuapp.com';

//   const queryPopulate = qs.stringify(
//     {
//       populate: ['image', 'variants.image'],
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   );

//   const { data } = await axios.get(
//     `${URL}/api/products/${params.slug[0]}?${queryPopulate}`
//   );
//   if (!data?.data) {
//     return { notFound: true };
//   }
//   // console.log('data', data);

//   return {
//     props: { product: data.data },
//   };
// }

// const queryPopularPopulate = qs.stringify(
//   {
//     populate: ['image', 'variants.image'],
//     filters: {
//       popular: {
//         $eq: true,
//       },
//     },
//   },

//   {
//     encodeValuesOnly: true,
//   }
// );
