import React from 'react';
import styles from '@modules/Home.module.scss';
import Booking from '@components/Booking';




const index = () => {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <div className={styles.avatar}><img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt="john smith"/></div>
        <p className={styles.text}>Book a meeting with John Smith</p>
      </div>
      <Booking/>
    </div>
  );
};

export default index;
