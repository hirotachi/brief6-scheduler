import React, { createContext, useEffect, useMemo, useState } from "react";
import styles from "@modules/Home.module.scss";
import Booking, { bookingSlots, tomorrow } from "@components/Booking";
import MyHistory from "@components/MyHistory";
import { useRouter } from "next/router";
import BookingForm from "@components/BookingForm";
import { formatDate, getAuthToken, getHeaders } from "@utils/helpers";
import Link from "next/link";

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
export const apiLink = "http://localhost:8000";

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
    // @ts-ignore
    const { id = "", ["user_id"]: userId, ...data } = formData;
    const handleSuccess = (booking) => {
      setBookings((list) => {
        return id
          ? list.map((b) => (b.id === id ? { ...b, ...formData } : b))
          : [...list, { ...booking, date: new Date(booking.date) }];
      });
      resetFormData();
      if (currentRoute === "edit") {
        router.replace("/history");
      }
    };
    fetch(`${apiLink}/appointments/${id}`, {
      method: id ? "PUT" : "POST",
      headers: getHeaders(),
      body: JSON.stringify({ ...data, date: formatDate(data.date) }),
    })
      .then((res) => res.json())
      .then(handleSuccess);
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

  useEffect(() => {
    const authToken = getAuthToken();
    if (!authToken) {
      router.replace("/login");
      return;
    }
    fetch(apiLink + "/appointments", {
      headers: getHeaders(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          return;
        }
        setBookings(data.map((v) => ({ ...v, date: new Date(v.date) })));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const isHome = currentRoute === "booking";
  const isHistory = currentRoute === "history";
  return (
    <HomeContext.Provider value={contextValue}>
      {loading ? (
        <p className={styles.loading}>loading</p>
      ) : (
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
          <div className={styles.controls}>
            {!isHome && (
              <Link href={"/"}>
                <a className={styles.booking}>new appointment</a>
              </Link>
            )}
            {!isHistory && (
              <Link href={"/history"}>
                <a className={styles.history}>My history</a>
              </Link>
            )}
          </div>
          {isHome && <Booking />}
          {isHistory && <MyHistory />}
          {currentRoute === "edit" && formData.id && <BookingForm />}
        </div>
      )}
    </HomeContext.Provider>
  );
};

export default index;
