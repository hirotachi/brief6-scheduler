import React from 'react';
import styles from "@modules/Calendar/Calendar.module.scss";

type CalendarProps = {
    onChange?: (date:Date) => void;
    currentDate?: Date
}
const Calendar = () => {
  return (
    <div className={styles.calendar}>
      <div className={styles.controls}>calendar controls</div>
      <div className={styles.names}>day names</div>
      <div className={styles.days}>days with numbers</div>
    </div>
  );
};

export default Calendar;
