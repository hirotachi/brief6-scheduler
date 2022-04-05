import React, { useEffect, useMemo, useState } from "react";
import styles from "@modules/calendar/Calendar.module.scss";
import { daysInMonth } from "@utils/helpers";
import clsx from "clsx";
import { calendarDaysNames, daysNames, monthsNames } from "@utils/constants";
import WithNoSSR from "@lib/WithNoSSR";

type CalendarProps = {
  currentDate?: Date;
  onMonthChange?: (Date) => void;
  onDayClick?: (Date) => void;
};

const today = new Date();
const index = (props: CalendarProps) => {
  const { onMonthChange, onDayClick } = props;

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { current, previous } = daysInMonth(currentMonth);
  const firstDayNameIndex = currentMonth.getDay() || daysNames.length;

  const paginateDateByMonth = (direction: number = 1) => {
    setCurrentMonth(
      (v) => new Date(new Date(v).setMonth(v.getMonth() + direction))
    );
  };

  useEffect(() => {
    onMonthChange?.(currentMonth);
  }, [currentMonth]);

  console.log(firstDayNameIndex);
  const { month, year } = useMemo(() => {
    return {
      month: monthsNames[currentMonth.getMonth()],
      year: currentMonth.getFullYear(),
    };
  }, [currentMonth]);
  return (
    <div className={styles.calendar}>
      <div className={styles.controls}>
        <span className={styles.btn} onClick={() => paginateDateByMonth(1)}>
          next
        </span>
        <p>
          {month} {year}
        </p>
        <span className={styles.btn} onClick={() => paginateDateByMonth(-1)}>
          previous
        </span>
      </div>
      <div className={styles.names}>
        {calendarDaysNames.map((name) => {
          return <span key={name}>{name.slice(0, 3)}</span>;
        })}
      </div>
      <div className={styles.days}>
        {Array(5 * 7)
          .fill("")
          .map((_, i) => {
            let currentDay = i + 4 - firstDayNameIndex;
            const isCurrentMonthsDay = currentDay > 0 && currentDay <= current;
            const dayDate = new Date(
              new Date(currentMonth).setDate(currentDay)
            );
            const isToday = today.toString() === dayDate.toString();
            if (currentDay <= 0) {
              currentDay += previous;
            } else if (currentDay > current) {
              currentDay -= current;
            }
            return (
              <span
                onClick={() => isCurrentMonthsDay && onDayClick?.(dayDate)}
                key={i}
                className={clsx([
                  styles.day,
                  isCurrentMonthsDay && styles.dayActive,
                  isToday && styles.dayCurrent,
                ])}
              >
                {currentDay}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default WithNoSSR(index);
