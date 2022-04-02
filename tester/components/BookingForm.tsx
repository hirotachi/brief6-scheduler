import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { bookingSlots, tomorrow } from "@components/Booking";
import styles from "@modules/BookingForm.module.scss";
import { HomeContext } from "@pages/[[...slug]]";
import clsx from "clsx";
import { formatDate } from "@utils/helpers";
import { useRouter } from "next/router";

const BookingForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    formData,
    changeFormData,
    availableSlots,
    availableSlotsSet,
    handleSubmitForm,
    resetFormData,
  } = useContext(HomeContext);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeFormData((data) => ({ ...data, subject: e.target.value }));
  };

  const handleDateChange = (e) => {
    const date = e.target.valueAsDate;
    changeFormData((data) => ({ ...data, date }));
  };

  const handleEnter: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter") return;
    handleSubmit();
  };
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        resetFormData();
      }
    };
    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  });

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = () => {
    if (formData.subject) {
      return handleSubmitForm();
    }
    setError(formData.subject ? "" : "A subject is required");
  };

  const showError = error && !formData.subject;
  const isEditMode = formData.id;

  function cancel() {
    resetFormData();
    router.back();
  }

  const changeSlot = (slot) => changeFormData((v) => ({ ...v, slot }));

  const [previousSlot, setPreviousSlot] = useState(formData.slot);
  useEffect(() => {
    if (isEditMode) {
      setPreviousSlot(formData.slot);
    }
  }, [isEditMode]);

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
        <div className={clsx(styles.fields, isEditMode && styles.fieldsEdit)}>
          {isEditMode && (
            <>
              <label className={clsx(styles.field, styles.fieldEdit)}>
                <span className={styles.text}>Date</span>
                <input
                  type="date"
                  value={formatDate(formData.date)}
                  onChange={handleDateChange}
                  min={formatDate(tomorrow)}
                />
              </label>
              <label className={clsx(styles.field, styles.fieldEdit)}>
                <span className={styles.text}>Slot</span>
                <div className={styles.slots}>
                  {bookingSlots.map((slot, index) => {
                    if (index !== previousSlot && !availableSlotsSet.has(slot))
                      return;
                    return (
                      <span
                        onClick={() => changeSlot(index)}
                        className={clsx(
                          styles.slot,
                          index === formData.slot && styles.slotSelected
                        )}
                        key={slot}
                      >
                        {slot}
                      </span>
                    );
                  })}
                </div>
              </label>
            </>
          )}
          {!isEditMode && (
            <>
              <label className={styles.field}>
                <span className={styles.text}>Date:</span>
                <span className={styles.val}>
                  {formData.date.toDateString()}
                </span>
              </label>
              <label className={styles.field}>
                <span className={styles.text}>Slot:</span>
                <span className={styles.val}>
                  {bookingSlots[formData.slot]}
                </span>
              </label>
            </>
          )}
        </div>
      </div>
      <div className={styles.btns}>
        <span className={styles.submit} onClick={handleSubmit}>
          {isEditMode ? "update" : "book now"}
        </span>
        <span className={styles.cancel} onClick={cancel}>
          cancel
        </span>
      </div>
    </div>
  );
};

export default BookingForm;
