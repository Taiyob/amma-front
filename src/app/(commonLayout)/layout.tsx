import Footer from '@/components/commonLayout/home/Footer';
import {Header} from '@/components/header';
// import Header from '@/components/commonLayout/home/Header';
import React from 'react';

export default function CommonLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
