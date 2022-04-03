import React, { PropsWithChildren } from "react";
import styles from "@modules/Layout.module.scss";
import { useRouter } from "next/router";

const Layout = (props: PropsWithChildren<any>) => {
  const { children } = props;
  const router = useRouter();
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
