import React, { useContext } from "react";
import { bookingSlots } from "@components/Booking";
import styles from "@modules/History.module.scss";
import { BookingData, HomeContext } from "@pages/[[...slug]]";

const MyHistory = () => {
  const { bookings, removeBooking, changeFormData } = useContext(HomeContext);
  const startEdit = (booking: BookingData) => {
    changeFormData(booking);
  };

  return (
    <div className={styles.history}>
      {!bookings.length ? (
        <p className={styles.placeholder}>You haven't booked anything yet</p>
      ) : (
        bookings.map((booking) => {
          const { date, slot, subject, id } = booking;
          const dateFormatted = new Date(date);
          return (
            <div className={styles.booking} key={id + date.toString()}>
              <div className={styles.controls}>
                <span
                  className={styles.remove}
                  onClick={() => removeBooking(id)}
                >
                  remove
                </span>
                <span
                  className={styles.edit}
                  onClick={() => startEdit(booking)}
                >
                  edit
                </span>
              </div>

              {Object.entries({
                subject,
                date: dateFormatted.toDateString(),
                slot: bookingSlots[slot],
              }).map(([key, value]) => {
                return (
                  <div className={styles.field} key={id + key}>
                    <span className={styles.label}>{key}:</span>
                    <span className={styles.value}>{value}</span>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyHistory;
