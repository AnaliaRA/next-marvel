import React from 'react';
import styles from './preloader.module.css';

export default function Preloader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner}></div>
    </div>
  );
}