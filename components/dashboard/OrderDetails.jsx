import { Button, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { Descriptions } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FcProcess } from 'react-icons/fc';
import { BiCheckDouble } from 'react-icons/bi';
import { RiEBike2Line } from 'react-icons/ri';
import moment from 'moment';

const OrderDetails = ({ data, isSuccess }) => {
  const currency = data?.attributes?.currency;

  const router = useRouter();

  return (
    <div>
      <div className='w-full'>
        <Button
          leftIcon={<BiArrowBack />}
          onClick={() => router.push('/dashboard')}
          variant='ghost'
          colorScheme='teal'
        >
          Back
        </Button>
      </div>
      {isSuccess && (
        <div className='mx-auto my-2 flex max-w-screen-xl flex-col sm:mt-10'>
          {/* order ID | Order tags */}
          <div className='flex w-full flex-col space-y-3 pb-5 '>
            {/* order ID */}
            <div className='flex flex-col'>
              <Text className='text-2xl font-bold'>
                Order #{data?.attributes?.transactionId}
              </Text>
              <Text className='font-bold text-gray-400'>
                This order was placed on{' '}
                {moment(data?.attributes?.createdAt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </Text>
            </div>

            {/* Order Tag */}
            <div className='flex flex-wrap'>
              {data?.attributes?.orderStatus == 'Processing' && (
                <div className='flex'>
                  <Tag size='sm' variant='subtle' colorScheme='blue'>
                    <TagLeftIcon as={FcProcess} />
                    <TagLabel className=''>Processing</TagLabel>
                  </Tag>
                </div>
              )}
              {data?.attributes?.orderStatus == 'Out_for_delivery' && (
                <div className='flex flex-wrap gap-2'>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='' as={BiCheckDouble} />
                    <TagLabel className=''>Processed</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='blue'>
                    <TagLeftIcon className='' as={RiEBike2Line} />
                    <TagLabel className=''>Out for delivery</TagLabel>
                  </Tag>
                </div>
              )}
              {data?.attributes?.orderStatus == 'Delivered' && (
                <div className='flex flex-wrap gap-2'>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='' as={BiCheckDouble} />
                    <TagLabel className=''>Processed</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='' as={BiCheckDouble} />
                    <TagLabel className=''>Delivered</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='' as={BiCheckDouble} />
                    <TagLabel className=''>Confirmed</TagLabel>
                  </Tag>
                </div>
              )}
            </div>
          </div>
          <div className='flex w-full flex-col space-y-3 space-x-0 lg:flex-row lg:space-x-4 '>
            {/* delivery details */}
            <div className='flex w-full flex-col'>
              <div className='flex space-x-2 pb-4'>
                <span className='text-xl font-bold text-gray-400'>
                  Delivery
                </span>{' '}
                <span className='text-xl font-bold text-indigo-500 '>
                  Details
                </span>
              </div>
              <Descriptions
                // title='Responsive Descriptions'
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label='First Name'>
                  {data?.attributes?.firstName}
                </Descriptions.Item>
                <Descriptions.Item label='Last Name'>
                  {data?.attributes?.lastName}
                </Descriptions.Item>
                <Descriptions.Item label='Email'>
                  {data?.attributes?.emailAddress}
                </Descriptions.Item>
                <Descriptions.Item label='Phone Number'>
                  {data?.attributes?.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label='Address'>
                  {data?.attributes?.deliveryAddress}
                </Descriptions.Item>
                <Descriptions.Item label='Country'>
                  {data?.attributes?.country}
                </Descriptions.Item>
                <Descriptions.Item label='State'>
                  {data?.attributes?.state}
                </Descriptions.Item>
                <Descriptions.Item label='Additional Information'>
                  {data?.attributes.additionalInfo}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* cart details */}
            <div className='flex w-full flex-col'>
              {/* cart items */}
              <div className='flex space-x-2 pb-2'>
                <span className='text-xl font-bold text-gray-400'>Order</span>{' '}
                <span className='text-xl font-bold text-yellow-600 '>
                  Items
                </span>
              </div>
              {/* cart details card */}
              <div className='space-y-2'>
                {data?.attributes?.carts?.data?.map((elem, id) => (
                  <div
                    key={id}
                    className='flex h-fit w-full flex-col overflow-hidden rounded-lg border transition ease-in-out hover:shadow-md'
                  >
                    <div className='flex justify-between space-x-4'>
                      {/* image */}
                      <div className='relative h-32 w-32 sm:h-36 sm:w-36'>
                        <Image
                          src={elem?.attributes?.image}
                          layout='fill'
                          // loading='lazy'
                          objectFit='cover'
                          alt='Photo by Thái An'
                          className='h-full w-full object-cover object-center transition duration-200 hover:scale-110'
                          placeholder='blur'
                          blurDataURL={elem?.attributes?.image}
                        />
                      </div>

                      {/* name | color | quantity | price */}
                      <div className='flex flex-1 flex-col justify-between py-3 pr-2'>
                        {/* name | color */}
                        <div>
                          <Text>{elem?.attributes?.name}</Text>

                          <span className='block text-gray-500'>
                            Color: {elem?.attributes?.color}
                          </span>
                        </div>
                        {/* Quantity */}
                        <div className='my-1 flex md:mb-2'>
                          <Text className='text-lg font-semibold text-gray-500'>
                            X {elem?.attributes?.quantity}
                          </Text>
                        </div>
                        <div className='flex justify-between'>
                          {/* price */}
                          <div>
                            {currency == 'NGN' ? (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#8358;{elem?.attributes?.nairaPrice}
                                </span>
                              </div>
                            ) : (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#x24;{elem?.attributes?.dollarPrice}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* total */}
                          <div className='flex'>
                            {currency == 'NGN' ? (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#8358;
                                  {+elem?.attributes?.quantity *
                                    +elem?.attributes?.nairaPrice}
                                </span>
                              </div>
                            ) : (
                              <div className=''>
                                <span className='mb-1 block font-bold text-gray-800 md:text-lg'>
                                  &#x24;
                                  {+elem?.attributes?.quantity *
                                    +elem?.attributes?.dollarPrice}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* total */}
              <div className='mb-4 mt-4 flex w-full justify-end rounded-lg bg-gray-100 p-4 '>
                {currency == 'NGN' ? (
                  <div className=''>
                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#8358;{data?.attributes?.amount}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=''>
                    <div className='mt-2 '>
                      <div className='flex items-start justify-between gap-4 text-gray-800'>
                        <span className='text-lg font-bold'>Total</span>

                        <span className='flex flex-col items-end'>
                          <span className='text-lg font-bold'>
                            {' '}
                            &#x24;{data?.attributes?.amount}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
