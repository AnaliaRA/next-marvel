'use client'

import styles from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { useMarvelStore } from '@/app/store/store';
import CharacterCard from '@/app/components/character';
import SearchBar from '@/app/components/search';

import { useEffect, useMemo } from "react";
import Preloader from "@/app/components/preloader";

const fetchCharacters = async function () {
  const response = await fetch('/api/characters');
  return await response.json();
}

export default function Home() {
  const { characters, setCharacters } = useMarvelStore();
  const memoizedCharacters = useMemo(() => characters, [characters]);

  const { data, isLoading } = useQuery({
    queryKey: ['results'],
    queryFn: fetchCharacters,
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data, setCharacters]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="main" aria-labelledby='title' tabIndex={-1}>
      <h1 id="title" className="visuallyHidden">Marvel Characters</h1>
      <SearchBar />
      <ul className={styles.characterListContainer}>
        {memoizedCharacters.map((character) => {
          return (
            <CharacterCard
              id={character.id}
              key={character.id}
              name={character.name}
              thumbnail={character.thumbnail}
            />
          );
        })}
      </ul>
    </main>
  );
}
