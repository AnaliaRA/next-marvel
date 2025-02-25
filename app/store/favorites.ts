import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Favorite = {
  id: number;
};

type FavoriteStore = {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  clearFavorites: () => void;
  removeFavorite: (id: number) => void;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [...state.favorites, favorite],
        })),
      clearFavorites: () => set({ favorites: [] }),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        })),
    }),
    {
      name: 'marvel-favorites',
    }
  )
);
