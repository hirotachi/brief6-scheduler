import React, { useState } from "react";
import styles from "@modules/Register.module.scss";
import Link from "next/link";

const register = () => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    birthdate: null,
    profession: "",
  });
  const placeholders: { [key in keyof typeof state]?: string } = {
    firstName: "John",
    lastName: "Smith",
    profession: "Software Developer",
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.header}>Sign Up</h1>
      <div className={styles.main}>
        {Object.entries(state).map(([key, value]) => {
          const fieldName = key.replace(
            /[A-Z][a-z]*/g,
            (v) => ` ${v.toLowerCase()}`
          );
          const inputType = key === "birthdate" ? "date" : "text";
          const changeHandler = (e) => {
            setState((v) => ({ ...v, [key]: e.target.value }));
          };
          const placeholder = placeholders[key];
          return (
            <label key={key} className={styles.field}>
              <span className={styles.text}>{fieldName}</span>
              <input
                type={inputType}
                onChange={changeHandler}
                placeholder={placeholder}
              />
            </label>
          );
        })}
        <p className={styles.other}>
          Already have an account?{" "}
          <Link href={"login"}>
            <a>Sign In</a>
          </Link>
        </p>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default register;
