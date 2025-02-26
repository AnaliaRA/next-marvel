'use client'

import styles from './search.module.css';
import { useQuery } from '@tanstack/react-query';
import { useMarvelStore } from '@/app/store/store';
import { useState, useEffect } from 'react';

const fetchCharactersByName = async function ({ queryKey }: { queryKey: [string, string] }) {
  const [, searchName] = queryKey;
  const response = await fetch(`/api/search?name=${searchName}`);
  return await response.json();
}

export default function SearchBar() {

  const { characters, setCharacters } = useMarvelStore();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  const { data } = useQuery({
    queryKey: ['results', debouncedValue],
    queryFn: fetchCharactersByName,
    enabled: debouncedValue !== '',
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (data) {
      setCharacters(data.data.results);
    }
  }, [data, setCharacters]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  const resultCount = characters.length;
  return (
      <div className={styles.searchContainer}>
        <label htmlFor="search" className="visuallyHidden">Search by character name</label>
        <input
          type="text"
          aria-label="Search by character name"
          placeholder="SEARCH A CHARACTER..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.searchInput} />
        <legend className={styles.searchResults}>{resultCount} results</legend>
      </div>
  );
}
