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
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const CartDrawer = ({ isOpen, onClose, finalFocusRef }) => {
  // console.log(props);

  const { onOpen } = useDisclosure();

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={finalFocusRef}
      // size='sm'
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
          <Box
            // size='150px'
            className='flex flex-col space-y-2 text-lg font-semibold'
          >
            Cart is empty
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button variant='solid' colorScheme='teal'>
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
