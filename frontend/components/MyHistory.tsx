import React, { useContext, useEffect, useState } from "react";
import { bookingSlots, tomorrow } from "@components/Booking";
import styles from "@modules/History.module.scss";
import { apiLink, BookingData, HomeContext } from "@pages/[[...slug]]";
import { useRouter } from "next/router";
import { formatDate, getHeaders } from "@utils/helpers";

const MyHistory = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { changeFormData, removeBooking } = useContext(HomeContext);
  const router = useRouter();
  const startEdit = (booking: BookingData) => {
    changeFormData(booking);
    router.push("/edit");
  };

  const handleRemove = (id: number) => {
    fetch(`${apiLink}/appointments/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        if (message !== "deleted") return;
        setBookings((v) => v.filter((b) => b.id !== id));
        removeBooking(id);
      });
  };

  useEffect(() => {
    fetch(`${apiLink}/history`, { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.map((v) => ({ ...v, date: new Date(v.date) })));
      })
      .finally(() => setLoading(false));
  });
  return (
    <div className={styles.history}>
      {!bookings.length ? (
        <p className={styles.placeholder}>
          {loading ? "loading" : "You haven't booked anything yet"}
        </p>
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
                      onClick={() => handleRemove(id)}
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
