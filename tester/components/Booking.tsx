import React, { useMemo, useState } from "react";
import styles from "@modules/Booking.module.scss";
import BookingForm from "@components/BookingForm";

export const bookingSlots = [
  "10 h to 10:30 h",
  "11 h to 11:30 h",
  "14 h to 14:30 h",
  "15 h to 15:30 h",
  "16 h to 16:30 h",
];

type BookingProps = {
  book?: (bookingData: BookingData) => void;
  bookings?: BookingData[];
};

export type BookingData = {
  subject: string;
  date: string;
  slot: number;
};

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
const Booking = (props: BookingProps) => {
  const { book, bookings = [] } = props;
  const [currentDate, setCurrentDate] = useState(tomorrow);

  const bookingDataInitialState = {
    subject: "",
    date: "",
    slot: undefined,
  };
  const [bookingData, setBookingData] = useState<BookingData>(
    bookingDataInitialState
  );

  const handleChange = (e) => setCurrentDate(new Date(e.target.value));
  const changeBooking = (slot) =>
    setBookingData((v) => ({
      ...v,
      slot,
      date: currentDate.toJSON().slice(0, 10),
    }));

  const usedSlotsSet = useMemo(() => {
    return new Set(bookings.map((b) => `${b.date}-${b.slot}`));
  }, [bookings]);
  const handleSubjectChange = (subject) =>
    setBookingData((v) => ({ ...v, subject }));
  const onBookingSubmit = () => {
    book(bookingData);
    setBookingData(bookingDataInitialState);
  };
  const availableSlots = bookingSlots.filter((slot, index) => {
    return !usedSlotsSet.has(`${currentDate.toJSON()?.slice(0, 10)}-${index}`);
  });
  return (
    <div className={styles.booking}>
      {bookingData.slot === undefined && (
        <>
          <label className={styles.date}>
            <span className={styles.text}>choose a date</span>
            <input
              className={styles.input}
              type="date"
              value={currentDate.toJSON()?.slice(0, 10)}
              onChange={handleChange}
              min={tomorrow.toJSON()?.slice(0, 10)}
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
      {bookingData.slot !== undefined && (
        <BookingForm
          handleSubjectChange={handleSubjectChange}
          onSubmit={onBookingSubmit}
          cancel={() => changeBooking(undefined)}
          data={bookingData}
        />
      )}
    </div>
  );
};

export default Booking;
