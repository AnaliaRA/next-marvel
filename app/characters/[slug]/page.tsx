'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useMarvelStore } from '@/app/store/store';
import styles from './page.module.css';
import sliderStyles from './slider.module.css';
import { useQuery } from '@tanstack/react-query';
import ComicCard from '@/app/components/comic';
import FavoriteButton from '@/app/components/favorite';
import Preloader from "@/app/components/preloader";

const fetchComics = async function ({ queryKey }: { queryKey: [string, number] }) {
  const [, id] = queryKey;
  const response = await fetch(`/api/characters/${id}/comics`);
  return await response.json();
}

export default function Character() {
  const { slug } = useParams();
  const { getCharacterById, setComicCollection } = useMarvelStore();
  const id = parseInt(slug as string);
  const character = getCharacterById(id);
  const comicCollection = character?.comicCollection;
  const memoizedComicCollection = useMemo(() => comicCollection, [comicCollection]);

  const { data, isLoading } = useQuery({
    queryKey: ['results', id],
    queryFn: fetchComics
  });

  useEffect(() => {
    if (data) {
      setComicCollection(id, data.data.results);
    }
  }, [id, data, setComicCollection]);

  if (!character) {
    return (
      <div className={styles.container}>
        Character not found
      </div>
    );
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className="main" aria-labelledby='title' tabIndex={-1}>
      <div className={styles.container}>
        <div className={styles.characterContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.imageContainer}>
              <Image
                alt={character.name}
                className={styles.image}
                height={300}
                width={300}
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                priority
              />
            </div>
            <div className={styles.textContainer}>
              <h1>{character.name}</h1>
              <FavoriteButton id={character.id} view='detail' />
              <p>{character.description}</p>
            </div>
          </div>
        </div>
        <div className={sliderStyles.sliderContainer}>
          <h2 className={sliderStyles.heading} aria-label={`List of comics of ${character.name}`}>Comics</h2>
          <div className={sliderStyles.slider}>
            {memoizedComicCollection?.map((comic) => {
              return (
                <ComicCard
                  id={comic.id}
                  dates={comic.dates}
                  key={comic.id}
                  title={comic.title}
                  thumbnail={comic.thumbnail}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}