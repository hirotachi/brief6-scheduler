import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { bookingSlots } from "@components/Booking";
import styles from "@modules/BookingForm.module.scss";
import { HomeContext } from "@pages/[[...slug]]";
import clsx from "clsx";

const BookingForm = () => {
  const [error, setError] = useState("");
  const { formData, changeFormData, handleSubmitForm, resetFormData } =
    useContext(HomeContext);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeFormData((data) => ({ ...data, subject: e.target.value }));
  };

  const handleEnter: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter") return;
    handleSubmit();
  };
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current.focus();
    const handler = (e) => {
      if (e.key === "Escape") {
        resetFormData();
      }
    };
    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  });

  const handleSubmit = () => {
    if (formData.subject) {
      return handleSubmitForm();
    }
    setError(formData.subject ? "" : "A subject is required");
  };

  const showError = error && !formData.subject;
  return (
    <div className={styles.form}>
      <div className={styles.formMain}>
        <label className={clsx([styles.subject, showError && styles.error])}>
          <span className={styles.text}>Subject</span>
          <input
            ref={ref}
            onKeyUp={handleEnter}
            type="text"
            placeholder={"What is this about?"}
            value={formData?.subject}
            onChange={handleChange}
          />
          {showError && <span className={styles.message}>{error}</span>}
        </label>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.text}>Date:</span>
            <span className={styles.val}>{formData.date.toDateString()}</span>
          </label>
          <label className={styles.field}>
            <span className={styles.text}>Slot:</span>
            <span className={styles.val}>{bookingSlots[formData.slot]}</span>
          </label>
        </div>
      </div>
      <div className={styles.btns}>
        <span className={styles.submit} onClick={handleSubmit}>
          book now
        </span>
        <span className={styles.cancel} onClick={resetFormData}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default BookingForm;
