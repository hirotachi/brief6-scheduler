import React from "react";
import { AppProps } from "next/app";
import "@styles/styles.scss";
import Layout from "@components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
