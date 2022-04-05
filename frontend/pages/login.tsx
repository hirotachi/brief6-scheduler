import React, { FormEventHandler, useState } from "react";
import styles from "@modules/Login.module.scss";
import Link from "next/link";
import useInput from "@hooks/useInput";
import clsx from "clsx";
import { useRouter } from "next/router";

const login = () => {
  const [error, setError] = useState("");
  const [inputProps] = useInput("");
  const { value } = inputProps;
  const router = useRouter();
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!value) return;

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") {
          return;
        }
        localStorage.setItem("role", data.isAdmin ? "admin" : "client");
        localStorage.setItem("token", data.token);
        router.replace(data.isAdmin ? "/users" : "/");
      });
  };
  return (
    <div className={styles.login}>
      <h1 className={styles.header}>Sign in</h1>
      <form onSubmit={handleSubmit} className={styles.main}>
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
          <button>sign in</button>
        </label>
      </form>
    </div>
  );
};

export default login;
