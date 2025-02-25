import { create } from 'zustand';

interface Comic {
  id: number;
  dates: [
    {
      date: string;
      type: string;
    }
  ]
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  }
  year: string;
}

interface Character {
  comics: {
    available: number;
    collectionURI: string;
    description: string;
    items: {
      resourceURI: string;
      name: string;
    }
  }
  description: string;
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  comicCollection?: Comic[];
}

type StoreState = {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  getCharacterById: (id: number) => Character | undefined;
  setComicCollection: (id: number, comics: Comic[]) => void;
};

export const useMarvelStore = create<StoreState>((set, get) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
  getCharacterById: (id) => get().characters.find((character) => character.id === id),
  setComicCollection: (id, comics) => {
    set((state) => ({
      characters: state.characters.map((char) =>
        char.id === id ? { ...char, comicCollection: comics } : char
      ),
    }));
  },
}));
