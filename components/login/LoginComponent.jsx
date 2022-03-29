import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
import React from 'react';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginComponent = () => {
  return (
    <div className='pt-5'>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default LoginComponent;
