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
  Skeleton,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Rate } from 'antd';
import axios from 'axios';
import { useGlobal } from '../../utils/context/GlobalData';
import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import moment from 'moment';
const qs = require('qs');

const ReviewComponent = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const { userID } = useGlobal();
  const toast = useToast();

  const getReviews = async () => {
    const query = qs.stringify(
      {
        populate: '*',
        sort: ['id:desc'],
        filters: {
          approved: {
            $eq: true,
          },
          product: {
            name: products?.attributes?.name,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?${query}`
    );
    return data?.data;
  };

  const { data, isSuccess, isLoading } = useQuery(
    'reviews',
    async () => await getReviews()
  );

  useEffect(() => {
    if (isSuccess) {
      setReviewData(data);
    }
    console.log('data :>> ', data);
  }, [isSuccess, data, products]);

  // console.log('initialRef', initialRef);

  const [starValue, setStarValue] = useState(0);
  const [formValue, setFormValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    rating: 0,
    review: '',
  });
  const [reviewData, setReviewData] = useState([]);

  const handleSubmit = async () => {
    if (
      formValue.firstName == '' ||
      formValue.lastName == '' ||
      formValue.email == '' ||
      formValue.review == ''
    ) {
      toast({
        title: 'Missing field.',
        description: 'Kindly fill all required fields.',
        status: 'error',
        // duration: 9000,
        isClosable: true,
      });
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`, {
        data: {
          firstName: formValue?.firstName,
          lastName: formValue?.lastName,
          email: formValue?.email,
          rating: formValue?.rating,
          content: formValue?.review,
          product: products?.id,
          anonuser: userID?.anonID,
        },
      });
      setFormValue({
        firstName: '',
        lastName: '',
        email: '',
        rating: 0,
        review: '',
      });
      onClose();
      setStarValue(0);
      toast({
        title: 'Review Sent.',
        description: 'Your Review is awaiting approval.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleStar = (value) => {
    console.log('value', value);
    setStarValue(value);
    setFormValue({
      ...formValue,
      rating: value,
    });
  };

  return (
    <div>
      <div className=' py-4 sm:py-6'>
        <div className='mx-auto max-w-screen-lg px-2 md:px-4'>
          <div className='mb-0 flex items-center border-b py-4'>
            <div
              onClick={onOpen}
              className='flex cursor-pointer items-center justify-center rounded-lg bg-black px-4 py-1  font-semibold text-white ring-1 ring-gray-200 transition delay-150 duration-300 ease-in-out hover:bg-yellow-500 hover:text-black hover:shadow-md hover:shadow-gray-600  sm:px-6 sm:py-2 sm:text-lg'
            >
              Write a review
            </div>
          </div>

          <div className='divide-y'>
            {/* <!-- review - start --> */}
            {isSuccess &&
              reviewData.length > 0 &&
              reviewData.map((review) => (
                <div key={review?.id} className='flex flex-col gap-3 py-4'>
                  <div>
                    <div className='block text-sm font-bold'>
                      {review?.attributes?.firstName}{' '}
                      {review?.attributes?.lastName}
                    </div>
                    <div className='block text-sm text-gray-500'>
                      {moment(review?.attributes?.createdAt).format(
                        'MMM Do YYYY'
                      )}
                    </div>
                  </div>

                  {/* rating star */}
                  <div className='flex items-center'>
                    <Rate
                      allowHalf
                      value={review?.attributes?.rating}
                      style={{ fontSize: '15px' }}
                      disabled
                    />
                  </div>

                  <p className='text-gray-600'>{review?.attributes?.content}</p>
                </div>
              ))}

            {isLoading && (
              <div className='flex flex-col gap-3 py-4 md:py-8'>
                <div>
                  <Skeleton className='block text-sm font-bold'>
                    John McCulling
                  </Skeleton>
                  <Skeleton className='block text-sm text-gray-500'>
                    August 28, 2021
                  </Skeleton>
                </div>

                {/* rating star */}
                <Skeleton className='flex items-center'>
                  <Rate
                    allowHalf
                    value={starValue}
                    style={{ fontSize: '15px' }}
                  />
                </Skeleton>

                <Skeleton className='text-gray-600'>
                  This is a section of some simple filler text, also known as
                  placeholder text. It shares some characteristics of a real
                  written text but is random or otherwise generated. It may be
                  used to display a sample of fonts or generate text for
                  testing.
                </Skeleton>
              </div>
            )}

            {isSuccess && reviewData.length == 0 && (
              <div className='flex flex-col gap-3 py-4 md:py-8'>
                <div>
                  <div className='block text-sm font-bold'>No reviews yet.</div>
                </div>
              </div>
            )}

            {/* <!-- review - end --> */}
          </div>
        </div>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{products?.attributes?.name} Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                name='firstName'
                onChange={(e) => handleChange(e)}
                value={formValue?.firstName}
                id='firstName'
                ref={initialRef}
                placeholder='First name'
              />
            </FormControl>

            <FormControl isRequired mt={2}>
              <FormLabel>Last name</FormLabel>
              <Input
                onChange={(e) => handleChange(e)}
                value={formValue?.lastName}
                name='lastName'
                id='lastName'
                placeholder='Last name'
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => handleChange(e)}
                value={formValue?.email}
                name='email'
                id='email'
                type='email'
                placeholder='Email'
              />
            </FormControl>
            <FormControl isRequired mt={2}>
              <FormLabel>Star Rating</FormLabel>
              <Rate allowHalf value={starValue} onChange={handleStar} />
            </FormControl>

            <FormControl isRequired mt={2}>
              <FormLabel>Review</FormLabel>
              <Textarea
                onChange={(e) => handleChange(e)}
                value={formValue?.review}
                name='review'
                id='review'
                placeholder='Review'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={async () => await handleSubmit()}
              colorScheme='blue'
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewComponent;
