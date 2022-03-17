import React, { useRef, useState } from 'react';
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
const qs = require('qs');

const ProductDetails = ({ product }) => {
  // console.log('product details:>> ', product);
  const { globalCurr, userID, setUserID, cartInfo, setCartInfo } = useGlobal();
  const [varImg, setVarImg] = useState(null);
  const [varName, setVarName] = useState(null);
  const [varColor, setVarColor] = useState(null);
  const [varID, setVarID] = useState(null);
  const [varQty, setVarQty] = useState(null);
  const [btnLoad, setBtnLoad] = useState(false);
  const [cartLoad, setCartLoad] = useState(false);
  const [indexID, setIndexID] = useState(null);
  const [qty, setQty] = useState(1);
  console.log(setQty, userID, setUserID);
  // const [isLoading, setIsLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  // console.log('formValue', formValue);
  // console.log('indexID :>> ', indexID);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const finalRef = useRef();

  const handleNotify = async () => {
    try {
      setModalLoading(true);
      const URL =
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:1337'
          : 'https://lola-adeoti-new-backend.herokuapp.com';
      await axios.post(`${URL}/api/bagnotifications`, {
        data: {
          variantId: varID,
          name: product?.attributes?.name,
          color:
            product?.attributes?.variants?.data[indexID]?.attributes?.color,

          userName: formValue?.name,
          userEmail: formValue?.email,
        },
      });
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
    console.log(value.target.value);
  };

  const handleVariant = (val, elem, id) => {
    // console.log(val);
    setVarImg(val?.attributes?.image?.data?.attributes?.url);
    setVarName(elem?.attributes?.name);
    setVarColor(val?.attributes?.color);
    setVarID(val?.id);
    setIndexID(id);
    setVarQty(val?.attributes?.quantity);
    if (val?.attributes?.quantity !== 0) {
      setBtnLoad(true);
      // setVarQty(true);
      setCartLoad(false);
    } else {
      setBtnLoad(false);
      setCartLoad(true);
    }
  };

  const handleCart = () => {
    if (!cartInfo) {
      const id = nanoid();
      setCartInfo({
        cartId: id,
        quantity: qty,
        nairaPrice: product?.attributes?.nairaSalePrice,
        dollarPrice: product?.attributes?.dollarSalePrice,
        totalNaira: product?.attributes?.nairaSalePrice * qty,
        totalDollar: product?.attributes?.dollarSalePrice * qty,
        variantId: varID,
      });
      const arr = {
        cartId: id,
        quantity: qty,
        nairaPrice: product?.attributes?.nairaSalePrice,
        dollarPrice: product?.attributes?.dollarSalePrice,
        totalNaira: product?.attributes?.nairaSalePrice * qty,
        totalDollar: product?.attributes?.dollarSalePrice * qty,
        variantId: varID,
      };
      const stringifyCart = JSON.stringify(arr);
      localStorage.setItem('lola-cart', stringifyCart);
    }
  };

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  // console.log('range', range(1, 4));

  return (
    <Layout
      name={`${product?.attributes?.name}`}
      desc='Classic bag for everyone for every purpose and occassion'
    >
      <div className='pt-16'>
        <div className=' py-6 sm:py-8 lg:py-12'>
          <div className='mx-auto max-w-screen-lg px-4 md:px-8'>
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
                        <Text className='text-xl font-bold md:text-2xl'>
                          &#8358;{product?.attributes?.nairaSalePrice}
                        </Text>
                        <Text
                          as='s'
                          className='text-sm font-semibold text-gray-400'
                        >
                          &#8358;{product?.attributes?.nairaPrice}
                        </Text>
                      </div>
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <Text className='text-xl font-bold md:text-2xl'>
                          &#x24;{product?.attributes?.dollarSalePrice}
                        </Text>
                        <Text
                          as='s'
                          className='text-sm font-semibold text-gray-400'
                        >
                          &#x24;{product?.attributes?.dollarPrice}
                        </Text>
                      </div>
                    )}
                    {/* <span className='text-xl font-bold text-gray-800 md:text-2xl'>
                      $15.00
                    </span>
                    <span className='mb-0.5 text-gray-500 line-through'>
                      $30.00
                    </span> */}
                  </div>
                </div>
                {/* <!-- price - end --> */}

                {/* quantity start */}
                <div className='mb-4 flex'>
                  {cartLoad ? (
                    ''
                  ) : (
                    <Select
                      placeholder='Quantity'
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
                        colorScheme='blue'
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
                      colorScheme='purple'
                      variant='solid'
                      isDisabled={!btnLoad}
                    >
                      Add to cart
                    </Button>
                  )}
                  {/* {!cartLoad ? (
                    <Button
                      // href='#'

                      colorScheme='purple'
                      variant='solid'
                      isDisabled={true}
                    >
                      Add to cart
                    </Button>
                  ) : varQty ? (
                    <div className='flex flex-col space-y-2'>
                      <Text className='text-xl font-bold text-red-700'>
                        Out of Stock
                      </Text>
                      <Button
                        onClick={onOpen}
                        colorScheme='blue'
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
                      colorScheme='purple'
                      variant='solid'
                      // className='inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base'
                    >
                      Add to cart
                    </Button>
                  )} */}
                </div>
                {/* <!-- cart buttons - end --> */}
              </div>
              {/* <!-- content - end --> */}
            </div>
            {/* <!-- description - start --> */}
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
                  </TabPanel>
                  <TabPanel>
                    <Text>review</Text>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              {/* <div className='mb-3 text-lg font-semibold text-gray-800'>
                Description
              </div> */}
            </div>
            {/* <!-- description - end --> */}
          </div>
        </div>
      </div>
    </Layout>
    // <div className='pt-20'>Productdetails</div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';
  const { data } = await axios.get(`${URL}/api/products`);

  const paths = data.data.map((product) => ({
    params: { slug: [product?.id.toString(), product?.attributes?.slug] },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // console.log(params);
  const URL =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:1337'
      : 'https://lola-adeoti-new-backend.herokuapp.com';

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
    `${URL}/api/products/${params.slug[0]}?${queryPopulate}`
  );
  if (!data?.data) {
    return { notFound: true };
  }
  // console.log('data', data);
  return {
    props: {
      product: data.data,
    },
    revalidate: 10,
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
