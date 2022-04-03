import React, { useState } from "react";
import styles from "@modules/Login.module.scss";
import Link from "next/link";
import useInput from "@hooks/useInput";
import clsx from "clsx";

const login = () => {
  const [error, setError] = useState("");
  const [inputProps] = useInput("");
  const { value } = inputProps;
  const handleClick = () => {
    if (!value) return;
    console.log("submit to api");
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Sign in</h1>
      <div className={styles.main}>
        <label className={clsx(styles.field, error && styles.fieldError)}>
          <span className={styles.text}>Personal Key</span>
          <input {...inputProps} type="text" placeholder={"key"} />
          {error && <p className={styles.error}>Wrong Personal Key</p>}
          <p className={styles.other}>
            Dont have a personal key?{" "}
            <Link href={"/register"}>
              <a>Get one</a>
            </Link>
          </p>
          <button onClick={handleClick}>sign in</button>
        </label>
      </div>
    </div>
  );
};

export default login;
