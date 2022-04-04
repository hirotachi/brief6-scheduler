import React, { PropsWithChildren, useEffect, useState } from "react";
import styles from "@modules/Layout.module.scss";
import { useRouter } from "next/router";
import { apiLink } from "@pages/[[...slug]]";
import { getAuthToken, getHeaders } from "@utils/helpers";
import Link from "next/link";

const Layout = (props: PropsWithChildren<any>) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    const authToken = getAuthToken();
    if (!authToken || currentUser) {
      return;
    }
    fetch(apiLink + "/me", { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      });
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setCurrentUser(undefined);
    router.replace("/login");
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        {currentUser && (
          <p className={styles.user}>
            welcome{" "}
            <span>
              {currentUser.role === "admin"
                ? "admin"
                : `${currentUser.firstName} ${currentUser.lastName}`}
            </span>
          </p>
        )}
        {currentUser?.role === "admin" && (
          <Link href={"/users"}>
            <a className={styles.dashboard}>dashboard</a>
          </Link>
        )}
        {currentUser && (
          <span onClick={logout} className={styles.logout}>
            logout
          </span>
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
