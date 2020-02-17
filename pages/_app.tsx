import React from 'react';
import App from 'next/app';
import { DefaultLayout } from '../components/DefaultLayout';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    );
  }
}

export default MyApp;
