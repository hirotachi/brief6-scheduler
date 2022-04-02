import React, { useContext } from "react";
import { bookingSlots, tomorrow } from "@components/Booking";
import styles from "@modules/History.module.scss";
import { BookingData, HomeContext } from "@pages/[[...slug]]";
import { useRouter } from "next/router";
import { formatDate } from "@utils/helpers";

const MyHistory = () => {
  const { bookings, removeBooking, changeFormData } = useContext(HomeContext);
  const router = useRouter();
  const startEdit = (booking: BookingData) => {
    changeFormData(booking);
    router.push("/edit");
  };

  return (
    <div className={styles.history}>
      {!bookings.length ? (
        <p className={styles.placeholder}>You haven't booked anything yet</p>
      ) : (
        bookings.map((booking) => {
          const { date, slot, subject, id } = booking;
          return (
            <div className={styles.booking} key={id + date.toString()}>
              <div className={styles.controls}>
                {formatDate(tomorrow) <= formatDate(date) && (
                  <>
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
                  </>
                )}
              </div>

              {Object.entries({
                subject,
                date: date.toDateString(),
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
