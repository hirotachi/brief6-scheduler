import React, { KeyboardEventHandler, useEffect, useState } from "react";
import styles from "@modules/Users.module.scss";
import {
  formatDate,
  getAuthToken,
  getHeaders,
  unCamelCase,
} from "@utils/helpers";
import { apiLink } from "@pages/[[...slug]]";
import { useRouter } from "next/router";
import { accountPlaceholders } from "@pages/register";

const users = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const userFormInitialState = {
    id: undefined,
    firstName: "",
    lastName: "",
    birthdate: new Date(),
    profession: "",
    authKey: "",
  };

  const [userForm, setUserForm] = useState(userFormInitialState);

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

  const handleRemove = (user) => {
    const canRemove = confirm(
      `Do you really want to delete user "${user.id}" (${user.firstName} ${user.lastName})`
    );
    if (!canRemove) return;
    fetch(`${apiLink}/users/${user.id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "deleted") return;
        setUsers((list) => list.filter((v) => v.id !== user.id));
      });
  };

  const { id, ...formFields } = userForm;

  const update = () => {
    fetch(`${apiLink}/users/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        ...formFields,
        birthdate: formatDate(formFields.birthdate),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "success") return;
        setUsers((list) =>
          list.map((v) => {
            return v.id === id ? { ...v, ...formFields } : v;
          })
        );
        setUserForm(userFormInitialState);
      });
  };
  const handleSubmit: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter") return;
    update();
  };

  const startEdit = (user) => {
    setUserForm(user);
  };

  function cancel() {
    setUserForm(userFormInitialState);
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key !== "Escape" || id === undefined) return;
      cancel();
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [userForm]);

  return (
    <div className={styles.users}>
      <h1 className={styles.header}>
        {userForm.id ? `Update User ${userForm.id}` : "Users"}
      </h1>
      {userForm.id !== undefined ? (
        <div className={styles.main}>
          <form onKeyUp={handleSubmit} className={styles.form}>
            {Object.entries(formFields).map(([key, value]) => {
              const fieldName = unCamelCase(key);
              const isBirthdate = key === "birthdate";
              const inputType = isBirthdate ? "date" : "text";
              const changeHandler = (e) => {
                setUserForm((v) => ({
                  ...v,
                  [key]: e.target[isBirthdate ? "valueAsDate" : "value"],
                }));
              };
              const placeholder = accountPlaceholders[key];
              let val = userForm[key];
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
          </form>
          <div className={styles.controls}>
            <button onClick={cancel}>cancel</button>
            <button onClick={update} className={styles.submit}>
              update
            </button>
          </div>
        </div>
      ) : (
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
                    <span
                      className={styles.remove}
                      onClick={() => handleRemove(user)}
                    >
                      remove
                    </span>
                    <span
                      className={styles.remove}
                      onClick={() => startEdit(user)}
                    >
                      edit
                    </span>
                  </div>
                  <div className={styles.fields}>
                    {Object.entries(user).map(([key, val]) => {
                      if (key === "birthdate") {
                        val = formatDate(val as Date);
                      }
                      return (
                        <div className={styles.field} key={key}>
                          <span className={styles.text}>
                            {unCamelCase(key)}:
                          </span>
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
      )}
    </div>
  );
};

export default users;
