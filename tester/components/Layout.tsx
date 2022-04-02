import React, { PropsWithChildren } from "react";
import styles from "@modules/Layout.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = (props: PropsWithChildren<any>) => {
  const { children } = props;
  const router = useRouter();
  const isHome = router.asPath === "/";
  const isHistory = router.asPath === "/history";
  return (
    <div className={styles.layout}>
      <div className={styles.intro}>
        <div className={styles.avatar}>
          <img
            src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=347&q=80"
            alt="john smith"
          />
        </div>
        <p className={styles.text}>Book a meeting with John Smith</p>
      </div>
      <div className={styles.controls}>
        {!isHome && (
          <Link href={"/"}>
            <a className={styles.booking}>new appointment</a>
          </Link>
        )}
        {!isHistory && (
          <Link href={"/history"}>
            <a className={styles.history}>My history</a>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;
