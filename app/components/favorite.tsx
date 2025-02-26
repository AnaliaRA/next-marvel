'use client';

import { useFavoriteStore } from '@/app/store/favorites';
import React, { useState, useEffect } from 'react';
import detailStyles from '@/app/characters/[slug]/page.module.css';
import cardStyles from '@/app/components/character.module.css';

type FavoriteButtonProps = {
  id: number;
  view: string;
};

export default function FavoriteButton({ id, view }: FavoriteButtonProps) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, [favorites, id]);

  const toggleFavorite = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent page refresh if using `<a>`
    if (isFavorite) {
      removeFavorite(id); // Remove character
    } else {
      addFavorite({ id }); // Add character
    }
  };

  const styles = view === 'card' ? cardStyles : detailStyles;

  return (
    <a
      className={`${styles.favorites} ${isFavorite ? styles.removeFav : styles.addFav}`}
      href=""
      onClick={toggleFavorite}
      aria-label={`${isFavorite ? 'Remove from favorites' : 'Add to favorites'}`}
    >
      {isFavorite ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={styles.heartIcon}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.heartIcon}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )}
    </a>
  );
}
