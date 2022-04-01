import React, { useState } from "react";
import styles from "@modules/Home.module.scss";
import Booking, { BookingData } from "@components/Booking";

const index = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const addSlot = (slot) => setBookings((v) => [...v, slot]);
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <div className={styles.avatar}>
          <img
            src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=347&q=80"
            alt="john smith"
          />
        </div>
        <p className={styles.text}>Book a meeting with John Smith</p>
      </div>
      <Booking book={addSlot} bookings={bookings} />
    </div>
  );
};

export default index;
