import React from "react";
import { BookingData, bookingSlots } from "@components/Booking";
import styles from "@modules/BookingForm.module.scss";

type BookingFormProps = {
  data: BookingData;
  cancel?: () => void;
  onSubmit?: () => void;
  handleSubjectChange: (subject: string) => void;
};
const BookingForm = (props: BookingFormProps) => {
  const { data, cancel, handleSubjectChange, onSubmit } = props;
  const handleChange = (e) => handleSubjectChange(e.target.value);
  return (
    <div className={styles.form}>
      <div className={styles.formMain}>
        <label className={styles.subject}>
          <span className={styles.text}>Subject</span>
          <input
            type="text"
            placeholder={"What is this about?"}
            value={data?.subject}
            onChange={handleChange}
          />
        </label>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.text}>Date:</span>
            <span className={styles.val}>{data.date}</span>
          </label>
          <label className={styles.field}>
            <span className={styles.text}>Slot:</span>
            <span className={styles.val}>{bookingSlots[data.slot]}</span>
          </label>
        </div>
      </div>
      <div className={styles.btns}>
        <span className={styles.submit} onClick={onSubmit}>
          submit
        </span>
        <span className={styles.cancel} onClick={cancel}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default BookingForm;
