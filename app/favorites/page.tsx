'use client'

import { useMarvelStore } from '@/app/store/store';
import { useFavoriteStore } from '@/app/store/favorites';
import CharacterCard from '@/app/components/character';
import SearchBar from '@/app/components/search';
import { useEffect, useMemo, useState } from "react";
import { Character } from '@/app/store/store';
import Preloader from "@/app/components/preloader";
import { useSearchStore } from '@/app/store/search';
import styles from './page.module.css';
import _ from 'lodash';

export default function Favorites() {
  const { getFavorites } = useFavoriteStore();
  const { getCharacterById, setCharacters, characters } = useMarvelStore();
  const { search, setValue } = useSearchStore();
  const [loading, setLoading] = useState(true);

  const favoriteIds = getFavorites();
  const favoriteCharacters = useMemo(() =>
      favoriteIds.map(id => getCharacterById(id)).filter((character): character is Character => character !== undefined),
    [favoriteIds, getCharacterById]
  );


  useEffect(() => {
    if (search !== '') {
      setValue('');
    }
    if (!_.isEqual(characters, favoriteCharacters)) {
      setCharacters(favoriteCharacters);
    }
    setLoading(false);
  }, [favoriteCharacters, setCharacters, characters]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={`main ${styles.main}`} aria-labelledby="title" tabIndex={-1}>
      <h1 className={styles.title} id="title" aria-label="Favorite Marvel Characters">Favorites</h1>
      <SearchBar />
      <ul className={styles.characterListContainer}>
        {favoriteCharacters.map((character) => {
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
