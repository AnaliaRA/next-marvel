'use client';
import { useFavoriteStore } from '@/app/store/favorites';

export default function ClearButton() {
  const { clearFavorites } = useFavoriteStore();

  return (
    <button
      onClick={clearFavorites}
      className="p-2 bg-red-500 text-white rounded"
    >
      Clear Cache
    </button>
  );
}
