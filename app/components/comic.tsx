'use client';

import Image from 'next/image';
import styles from './comic.module.css';

interface ComicProps {
  id: number;
  dates: {
    type: string;
    date: string;
  }
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  }
}



const Comic: React.FC<ComicProps> = ({ id, dates, title, thumbnail }) => {
  const imageSrc = `${thumbnail.path}.${thumbnail.extension}`;
  const imageAlt = `${title} cover`;
  console.log(dates)
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
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.year}>Date</p>
    </div>
  );
};

export default Comic;
