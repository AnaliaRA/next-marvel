'use client'

import styles from './search.module.css';
import { useQuery } from '@tanstack/react-query';
import { useMarvelStore } from '@/app/store/store';
import { useSearchStore } from '@/app/store/search';
import { useState, useEffect } from 'react';

const fetchCharactersByName = async function ({ queryKey }: { queryKey: [string, string] }) {
  const [, searchName] = queryKey;
  const response = await fetch(`/api/search?name=${searchName}`);
  return await response.json();
}

export default function SearchBar() {
  const { characters, setCharacters } = useMarvelStore();
  const { search, setValue } = useSearchStore();
  const [debouncedValue, setDebouncedValue] = useState(search);

  const { data } = useQuery({
    queryKey: ['results', debouncedValue],
    queryFn: fetchCharactersByName,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data, setCharacters]);

  const handleSearch = (value: string) => {
    setValue(value);
  }

  const resultCount = characters.length;
  return (
      <div className={styles.searchContainer}>
        <form name="searchForm" className={styles.searchForm}>
          <input
            name="searchInput"
            type="search"
            aria-label="Search by character name"
            placeholder="SEARCH A CHARACTER..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput} />
          <legend className={styles.searchResults}>{resultCount} results</legend>
        </form>
      </div>
  );
}
