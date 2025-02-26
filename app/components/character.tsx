'use client';

import Image from 'next/image';
import styles from './character.module.css';
import Link from 'next/link';
import FavoriteButton from '@/app/components/favorite';

interface CharacterProps {
  id: number;
  name: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

const Character: React.FC<CharacterProps> = ({ id, name, thumbnail }) => {
  const imageSrc = `${thumbnail.path}.${thumbnail.extension}`;
  return (
    <li key={id} className={styles.card} aria-label={`Character card for ${name}`}>
      <div className={styles.innerCard}>
        <Image
          alt={name}
          height={190}
          src={imageSrc}
          width={188}
          priority
        />
        <div className={styles.actions}>
          <Link className={styles.name} href={`/characters/${id}`} aria-label={`Link to ${name} details`} passHref>
            {name}
          </Link>
          <FavoriteButton id={id} />
        </div>
      </div>
    </li>
  );
};

export default Character;
