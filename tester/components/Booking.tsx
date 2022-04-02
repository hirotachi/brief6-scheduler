import React, { useContext, useMemo, useState } from "react";
import styles from "@modules/Booking.module.scss";
import BookingForm from "@components/BookingForm";
import { HomeContext } from "@pages/[[...slug]]";
import { formatDate } from "@utils/helpers";

export const bookingSlots = [
  "10 h to 10:30 h",
  "11 h to 11:30 h",
  "14 h to 14:30 h",
  "15 h to 15:30 h",
  "16 h to 16:30 h",
];

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
const Booking = () => {
  const { bookings, changeFormData, formData } = useContext(HomeContext);
  const [currentDate, setCurrentDate] = useState(tomorrow);

  const handleChange = (e) => setCurrentDate(new Date(e.target.value));

  const changeBooking = (slot) =>
    changeFormData((v) => ({
      ...v,
      slot,
      date: currentDate,
    }));

  const availableSlots = useMemo(() => {
    const usedSlotsSet = new Set(
      bookings.map((b) => `${formatDate(b.date)}-${b.slot}`)
    );
    return bookingSlots.filter((slot, index) => {
      return !usedSlotsSet.has(`${formatDate(currentDate)}-${index}`);
    });
  }, [bookings]);

  return (
    <div className={styles.booking}>
      {formData.slot === undefined && (
        <>
          <label className={styles.date}>
            <span className={styles.text}>choose a date</span>
            <input
              className={styles.input}
              type="date"
              value={formatDate(currentDate)}
              onChange={handleChange}
              min={formatDate(tomorrow)}
            />
          </label>
          <div className={styles.slots}>
            {currentDate.getTime() ? (
              !availableSlots.length ? (
                <p className={styles.placeholder}>no slots available</p>
              ) : (
                availableSlots.map((slot) => {
                  const index = bookingSlots.indexOf(slot);
                  return (
                    <span
                      className={styles.slot}
                      key={slot}
                      onClick={() => changeBooking(index)}
                    >
                      {slot}
                    </span>
                  );
                })
              )
            ) : (
              <p className={styles.placeholder}>select a date first</p>
            )}
          </div>
        </>
      )}
      {formData.slot !== undefined && <BookingForm />}
    </div>
  );
};

export default Booking;
