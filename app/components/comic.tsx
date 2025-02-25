'use client';

import Image from 'next/image';
import styles from './comic.module.css';

interface ComicProps {
  id: number;
  dates: [{
    date: string;
    type: string;
  }];
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  }
}

const Comic: React.FC<ComicProps> = ({ id, dates, title, thumbnail }) => {
  const imageSrc = `${thumbnail.path}.${thumbnail.extension}`;
  const imageAlt = `${title} cover`;
  const year = new Date(dates[0].date).getFullYear();
  return (
    <div key={id} className={styles.card}>
      <Image
        alt={imageAlt}
        className={styles.image}
        height={150}
        src={imageSrc}
        width={230}
        priority
      />
      <h3 className={styles.title} aria-label={`Comic title is ${title}`}>{title}</h3>
      <p className={styles.year} aria-label={`Released in ${year}`}>{year}</p>
    </div>
  );
};

export default Comic;
