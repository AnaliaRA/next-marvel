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
  getFavorites: () => number[];
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
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
      getFavorites: () => get().favorites.map(fav => fav.id),
    }),
    {
      name: 'marvel-favorites',
    }
  )
);
