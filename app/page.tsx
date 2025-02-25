'use client'

import styles from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { useMarvelStore } from '@/app/store/store';
import CharacterCard from '@/app/components/character';

import { useEffect, useMemo } from 'react';

const fetchCharacters= async function () {
  const response = await fetch('/api/characters');
  return await response.json();
}

export default function Home() {

  const { characters, setCharacters } = useMarvelStore();
  const memoizedCharacters = useMemo(() => characters, [characters]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['results'],
    queryFn: fetchCharacters,
    enabled: characters.length === 0,
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data, setCharacters]);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <main className={styles.main}>
      <ul className={styles.charactersContainer}>
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
