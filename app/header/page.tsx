'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { useFavoriteStore } from '@/app/store/favorites';

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const countFavorites = useFavoriteStore((state) => state.favorites.length);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <header className={styles.header} aria-label='Main header'>
      <div className={styles.container}>
        <Link href="/" aria-label="Link to home page" passHref>
          <Image
            alt="Marvel logo"
            className={styles.logo}
            height={52}
            priority
            src="/marvel-logo.svg"
            width={130}
          />
        </Link>
        {isClient && (
          <Link aria-label="Link to Favorites" className={styles.favoritesLink} href="/favorites" passHref>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={styles.heartIcon}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className={styles.count}>{countFavorites}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
