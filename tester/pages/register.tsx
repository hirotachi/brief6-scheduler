import React, { FormEventHandler, useState } from "react";
import styles from "@modules/Register.module.scss";
import Link from "next/link";
import { formatDate } from "@utils/helpers";

const register = () => {
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
    console.log(state);
    // toast("Authenticating", { position: "bottom-right", isLoading: true });
  };

  return (
    <div className={styles.register}>
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
    </div>
  );
};

export default register;
