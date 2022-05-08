import React from 'react';
import ContactForm from '../../components/contact/ContactForm';
import ContactPoint from '../../components/contact/ContactPoint';
import NewContactHero from '../../components/contact/NewContactHero';
import Layout from '../../components/layout/Layout';
// import NavBar from '../../components/navbar/NavBar';

const ContactPage = () => {
  return (
    <Layout
      name='Contact'
      desc='Get all contact details to reach lola adeoti stores'
    >
      <NewContactHero />
      <div className='mx-4'>
        <ContactPoint />
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContactPage;
