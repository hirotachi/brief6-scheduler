import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from "@modules/Booking.module.scss";


const appointmentSpots = [
  "10 h to 10:30 h",
  "11 h to 11:30 h",
  "14 h to 14:30 h",
  "15 h to 15:30 h",
  "16 h to 16:30 h",
]


const Booking = () => {
  const [value, setValue] = useState(new Date());
  return (
    <div>

      <div>appointment spots</div>
    </div>
  );
};

export default Booking;
