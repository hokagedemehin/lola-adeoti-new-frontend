import '../styles/globals.css';
import 'antd/dist/antd.css';
// import 'keen-slider/keen-slider.min.css';
// import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { ChakraProvider } from '@chakra-ui/react';
import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo } from 'next-seo';
import GlobalProvider from '../utils/context/GlobalData';
import { ReactQueryDevtools } from 'react-query/devtools';
// import SEO from '../next-seo.config';

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
        <DefaultSeo
          title='Lola Adeoti Bags & Accessories'
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.lolaadeoti.vercel.app/',
            site_name: 'Lola Adeoti Bags & Accessories',
            description:
              'Classic bag for everyone for every purpose and occassion',
            images: [
              {
                url: 'https://github.com/hokagedemehin/lola-adeoti-new-frontend/blob/main/public/logo/logo_only.png?raw=true',
                width: 800,
                height: 600,
                alt: 'Og:lola-adeoti',
              },
              {
                url: 'https://github.com/hokagedemehin/lola-adeoti-new-frontend/blob/main/public/logo/logo_and_name_coloured.png?raw=true',
                width: 800,
                height: 600,
                alt: 'Og:lola-adeoti',
              },
            ],
          }}
          twitter={{
            handle: '@lolaadeoti',
            site: '@lolaadeoti',
            cardType: 'summary_large_image',
          }}
        />
        <GlobalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {/* <TawkMessengerReact
            propertyId={process.env.NEXT_PUBLIC_PROPERTY_ID}
            widgetId={process.env.NEXT_PUBLIC_TAWK_ID}
          /> */}
          <Component {...pageProps} />
        </GlobalProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
