import {
  Button,
  // Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import { FcProcess } from 'react-icons/fc';
import { BiCheckDouble } from 'react-icons/bi';
import { RiEBike2Line } from 'react-icons/ri';
import Link from 'next/link';
const OrderCard = ({ elem }) => {
  const currency = elem?.attributes?.currency;
  return (
    <div>
      <Link
        href={`dashboard/${elem?.id}/${elem?.attributes?.orderId}`}
        passHref
      >
        <a>
          <div className='flex h-full w-36 cursor-pointer flex-col rounded-lg border p-4 transition duration-300 ease-in-out hover:scale-105 hover:text-black hover:shadow-md sm:w-full'>
            {/* order id */}
            <div className='flex flex-col text-justify '>
              <Text className=' font-bold'>Order</Text>
              <Text className=' font-bold'>
                #{elem?.attributes?.transactionId}
              </Text>
            </div>

            {/* date of order */}
            <div className='flex pt-1'>
              <Text className='text-xs text-zinc-600'>
                {moment(elem?.attributes?.createdAt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </Text>
            </div>

            {/* order summary */}
            <div className='flex items-center justify-center py-4'>
              <Text className='text-base font-bold sm:text-lg'>
                {elem?.attributes?.carts?.data?.length} items for{' '}
                {currency == 'NGN' ? <span>&#8358;</span> : <span>&#x24;</span>}
                {elem?.attributes?.amount}
              </Text>
            </div>

            {/* progress tag */}
            <div className='flex flex-col'>
              {elem?.attributes?.orderStatus == 'Processing' && (
                <div className='flex'>
                  <Tag size='sm' variant='subtle' colorScheme='blue'>
                    <TagLeftIcon as={FcProcess} />
                    <TagLabel className='text-xs'>Processing</TagLabel>
                  </Tag>
                </div>
              )}
              {elem?.attributes?.orderStatus == 'Out_for_delivery' && (
                <div className='flex flex-wrap gap-2'>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='text-[10px]' as={BiCheckDouble} />
                    <TagLabel className='text-[10px]'>Processed</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='blue'>
                    <TagLeftIcon className='text-[10px]' as={RiEBike2Line} />
                    <TagLabel className='text-[10px]'>
                      Out for delivery
                    </TagLabel>
                  </Tag>
                </div>
              )}
              {elem?.attributes?.orderStatus == 'Delivered' && (
                <div className='flex flex-wrap gap-2'>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='text-[10px]' as={BiCheckDouble} />
                    <TagLabel className='text-[10px]'>Processed</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='text-[10px]' as={BiCheckDouble} />
                    <TagLabel className='text-[10px]'>Delivered</TagLabel>
                  </Tag>
                  <Tag size='sm' variant='subtle' colorScheme='teal'>
                    <TagLeftIcon className='text-[10px]' as={BiCheckDouble} />
                    <TagLabel className='text-[10px]'>Confirmed</TagLabel>
                  </Tag>
                </div>
              )}
            </div>

            {/* view button */}
            <div className='mt-5 flex'>
              <Button isFullWidth variant='ghost'>
                View Order
              </Button>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default OrderCard;
