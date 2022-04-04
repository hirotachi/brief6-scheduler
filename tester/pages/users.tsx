import React, { useEffect, useState } from "react";
import styles from "@modules/Users.module.scss";
import {
  formatDate,
  getAuthToken,
  getHeaders,
  unCamelCase,
} from "@utils/helpers";
import { apiLink } from "@pages/[[...slug]]";
import { useRouter } from "next/router";

const users = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace("/login");
      return;
    }
    if (localStorage.getItem("role") !== "admin") {
      router.replace("/");
      return;
    }
    fetch(`${apiLink}/users`, { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.map((v) => ({ ...v, birthdate: new Date(v.birthdate) })));
      })
      .catch((e) => {});
  });
  return (
    <div className={styles.users}>
      <h1 className={styles.header}>Users</h1>
      <div className={styles.list}>
        {!users.length ? (
          <p className={styles.placeholder}>
            There are no users in the database
          </p>
        ) : (
          users.map((user) => {
            return (
              <div className={styles.user} key={user.id}>
                <div className={styles.controls}>
                  <span className={styles.remove}>remove</span>
                  <span className={styles.remove}>edit</span>
                </div>
                <div className={styles.fields}>
                  {Object.entries(user).map(([key, val]) => {
                    if (key === "birthdate") {
                      val = formatDate(val as Date);
                    }
                    return (
                      <div className={styles.field} key={key}>
                        <span className={styles.text}>{unCamelCase(key)}:</span>
                        <span className={styles.val}>{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default users;
