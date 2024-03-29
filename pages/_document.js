import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/logo/logo_coloured2.png' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&family=Arvo:wght@400;700&family=Catamaran:wght@400;500;600;700;800;900&family=Josefin+Sans:wght@400;500;600;700&family=Merriweather+Sans:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800;900&family=Oswald:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@400;600;700;900&family=Stardos+Stencil:wght@400;700&display=swap'
          />
          <link
            rel='stylesheet'
            href='https://unpkg.com/aos@next/dist/aos.css'
          />
          <meta
            name='google-site-verification'
            content='wp3A-ezGXoPfSCif3ObQc4BSJrx_fvFYvamsIYP27gk'
          />
          <script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4908548968774542'
            crossOrigin='anonymous'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
