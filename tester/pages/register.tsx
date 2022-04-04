import React, { FormEventHandler, useState } from "react";
import styles from "@modules/Register.module.scss";
import Link from "next/link";
import { formatDate } from "@utils/helpers";
import { toast } from "react-toastify";

const register = () => {
  const [key, setKey] = useState(undefined);
  const initialState = {
    firstName: "",
    lastName: "",
    birthdate: new Date(),
    profession: "",
  };
  const [state, setState] = useState(initialState);
  const placeholders: { [key in keyof typeof state]?: string } = {
    firstName: "John",
    lastName: "Smith",
    profession: "Software Developer",
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const toastId = toast("Creating account", {
      position: "bottom-right",
      isLoading: true,
    });
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...state,
        birthdate: formatDate(state.birthdate),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data?.role ?? "client");
        setKey(data.key);
        toast.update(toastId, {
          isLoading: false,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
          render: "Account created successfully",
        });
      });
  };

  return (
    <div className={styles.register}>
      {key && (
        <div className={styles.message}>
          <p className={styles.text}>
            here is your personal key please save it
          </p>
          <p className={styles.key}>{key}</p>
          <Link href={"/"}>
            <a className={styles.link}>Book an appointment now</a>
          </Link>
        </div>
      )}
      {!key && (
        <>
          <h1 className={styles.header}>Sign Up</h1>
          <form onSubmit={handleSubmit} className={styles.main}>
            {Object.entries(state).map(([key, value]) => {
              const fieldName = key.replace(
                /[A-Z][a-z]*/g,
                (v) => ` ${v.toLowerCase()}`
              );
              const isBirthdate = key === "birthdate";
              const inputType = isBirthdate ? "date" : "text";
              const changeHandler = (e) => {
                setState((v) => ({
                  ...v,
                  [key]: e.target[isBirthdate ? "valueAsDate" : "value"],
                }));
              };
              const placeholder = placeholders[key];
              let val = state[key];
              if (isBirthdate) {
                val = formatDate(val);
              }
              return (
                <label key={key} className={styles.field}>
                  <span className={styles.text}>{fieldName}</span>
                  <input
                    required
                    value={val}
                    type={inputType}
                    onChange={changeHandler}
                    placeholder={placeholder}
                  />
                </label>
              );
            })}
            <p className={styles.other}>
              Already have an account?{" "}
              <Link href={"/login"}>
                <a>Sign In</a>
              </Link>
            </p>
            <button>Sign Up</button>
          </form>
        </>
      )}
    </div>
  );
};

export default register;
