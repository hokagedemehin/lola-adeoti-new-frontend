import React from 'react';
import { Center, Flex, Spacer, Text } from '@chakra-ui/react';
const NavBar = () => {
  /**
   * ? This will have the logo on the left
   * ? nav links in the middle (Home, Shop, About us, Contact Us)
   * ? auth logic and cart at the end
   * ? cart is a draw that has the details in it
   * TODO: work out the logic of a guest making a purchase without login
   */
  return (
    <div className=' py-3 px-2 '>
      <Flex>
        <Center size='150px'>
          <Text>Logo</Text>
        </Center>
        <Spacer />
        <Center size='150px'>
          <Text>Nav Links</Text>
        </Center>
        <Spacer />
        <Center size='150px'>
          <Text>Auth &Cart</Text>
        </Center>
      </Flex>
    </div>
  );
};

export default NavBar;
