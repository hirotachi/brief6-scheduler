import React, { createContext, useEffect, useState } from "react";
import styles from "@modules/Home.module.scss";
import Booking from "@components/Booking";
import MyHistory from "@components/MyHistory";
import { useRouter } from "next/router";

type HomeContextValue = {
  handleSubmitForm: () => void;
  changeFormData: (
    update: BookingData | ((data: BookingData) => BookingData)
  ) => void;
  formData: BookingData;
  removeBooking: (id: number) => void;
  bookings: BookingData[];
  resetFormData: () => void;
};

export const HomeContext = createContext<HomeContextValue>(null);

export type BookingData = {
  id?: number;
  subject: string;
  date: Date;
  slot: number;
};

const index = () => {
  const router = useRouter();
  const currentRoute = router.query?.slug?.[0] ?? "booking";

  const formDataInitialState: BookingData = {
    subject: "",
    date: null,
    slot: undefined,
  };

  const [formData, setFormData] = useState<BookingData>(formDataInitialState);

  const [bookings, setBookings] = useState<BookingData[]>([
    {
      slot: 0,
      subject: "something",
      date: new Date(),
      id: 1,
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
              id: list.length,
            },
          ];
    });
    resetFormData();
  };

  const resetFormData = () => {
    setFormData(formDataInitialState);
  };

  const contextValue: HomeContextValue = {
    resetFormData,
    formData,
    changeFormData: setFormData,
    handleSubmitForm,
    removeBooking,
    bookings,
  };

  useEffect(() => {
    if (currentRoute !== "booking" && formData.slot !== undefined) {
      resetFormData();
    }
  }, [currentRoute, formData]);

  return (
    <HomeContext.Provider value={contextValue}>
      <div className={styles.home}>
        {currentRoute === "booking" && <Booking />}
        {currentRoute === "history" && <MyHistory />}
      </div>
    </HomeContext.Provider>
  );
};

export default index;
