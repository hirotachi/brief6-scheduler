import React, { createContext, useMemo, useState } from "react";
import styles from "@modules/Home.module.scss";
import Booking, { bookingSlots, tomorrow } from "@components/Booking";
import MyHistory from "@components/MyHistory";
import { useRouter } from "next/router";
import BookingForm from "@components/BookingForm";
import { formatDate } from "@utils/helpers";

type HomeContextValue = {
  handleSubmitForm: () => void;
  changeFormData: (
    update: BookingData | ((data: BookingData) => BookingData)
  ) => void;
  formData: BookingData;
  removeBooking: (id: number) => void;
  bookings: BookingData[];
  resetFormData: () => void;
  availableSlots: string[];
  availableSlotsSet: Set<string>;
};

export const HomeContext = createContext<HomeContextValue>(null);

export type BookingData = {
  id?: number;
  subject: string;
  date: Date;
  slot: number;
};

let currentId = 1;
const index = () => {
  const router = useRouter();
  const currentRoute = router.query?.slug?.[0] ?? "booking";

  const formDataInitialState: BookingData = {
    subject: "",
    date: tomorrow,
    slot: undefined,
  };

  const [formData, setFormData] = useState<BookingData>(formDataInitialState);

  const [bookings, setBookings] = useState<BookingData[]>([
    {
      slot: 0,
      subject: "something",
      date: new Date(),
      id: currentId,
    },
  ]);

  const removeBooking = (id: number) => {
    setBookings((v) => v.filter((b) => b.id !== id));
  };

  const handleSubmitForm = () => {
    if (!formData.subject) return;

    const data = formData;
    const isUpdate = !!data.id;
    setBookings((list) => {
      return isUpdate
        ? list.map((booking) =>
            booking.id === data.id ? { ...booking, ...data } : booking
          )
        : [
            ...list,
            {
              ...data,
              id: ++currentId,
            },
          ];
    });
    resetFormData();
    if (currentRoute === "edit") {
      router.replace("/history");
    }
  };

  const resetFormData = () => {
    setFormData(formDataInitialState);
  };

  const { availableSlots, availableSlotsSet } = useMemo(() => {
    const usedSlotsSet = new Set(
      bookings.map((b) => `${formatDate(b.date)}-${b.slot}`)
    );
    const availableSlots = bookingSlots.filter((slot, index) => {
      return !usedSlotsSet.has(`${formatDate(formData.date)}-${index}`);
    });
    return {
      availableSlots,
      availableSlotsSet: new Set(availableSlots),
    };
  }, [bookings, formData.date]);

  const contextValue: HomeContextValue = {
    resetFormData,
    formData,
    changeFormData: setFormData,
    handleSubmitForm,
    removeBooking,
    bookings,
    availableSlots,
    availableSlotsSet,
  };

  return (
    <HomeContext.Provider value={contextValue}>
      <div className={styles.home}>
        {currentRoute === "booking" && <Booking />}
        {currentRoute === "history" && <MyHistory />}
        {currentRoute === "edit" && formData.id && <BookingForm />}
      </div>
    </HomeContext.Provider>
  );
};

export default index;
