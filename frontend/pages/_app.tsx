import { AppProps } from "next/app";
import  "@styles/styles.scss";

const MyApp = (props: AppProps) => {
  const { pageProps, Component } = props;
  return <Component {...pageProps} />;
};

export default MyApp;
