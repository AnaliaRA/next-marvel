import { create } from 'zustand';

type StoreState = {
  search: string;
  setValue: (search: string) => void;
};

export const useSearchStore = create<StoreState>((set) => ({
  search: '',
  setValue: (value) => set({ search: value })
}));
