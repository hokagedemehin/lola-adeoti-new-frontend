import '../styles/globals.css';
import 'antd/dist/antd.css';

import { ChakraProvider } from '@chakra-ui/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
const progress = new ProgressBar({
  size: 4,
  color: '#2563eb',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);

Router.events.on('routeChangeComplete', progress.finish);

Router.events.on('routeChangeError', progress.finish);

// process.env.NODE_ENV === 'development';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
