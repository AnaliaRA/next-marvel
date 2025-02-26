'use client'

import styles from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import { useMarvelStore } from '@/app/store/store';
import CharacterCard from '@/app/components/character';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from "next/navigation";

const fetchCharacters= async function () {
  const response = await fetch('/api/characters');
  return await response.json();
}

export default function Home() {

  const { characters, setCharacters } = useMarvelStore();
  const [searchTerm, setSearchTerm] = useState('');
  const memoizedCharacters = useMemo(() => characters, [characters]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

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

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const filteredCharacters = memoizedCharacters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <main className={styles.main} aria-labelledby='title' tabIndex={-1}>
      <h1 id="title" className="visuallyHidden">Marvel Characters</h1>
      <div className={styles.searchContainer}>
        <label htmlFor="search" className="visuallyHidden">Search by character name</label>
        <input
          type="text"
          aria-label="Search by character name"
          placeholder="SEARCH A CHARACTER..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput} />
        <legend className={styles.searchResults}>{filteredCharacters.length} results</legend>
      </div>
      <ul className={styles.charactersContainer}>
        {filteredCharacters.map((character) => {
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
