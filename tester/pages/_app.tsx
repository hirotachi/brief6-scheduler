import React from "react";
import { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
