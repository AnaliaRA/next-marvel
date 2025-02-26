import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header} aria-label='Main header' tabIndex={-1}>
      <div className={styles.container}>
        <Link href="/" aria-label="Link to home page" passHref>
          <Image
            alt="Marvel logo"
            className={styles.logo}
            height={52}
            priority
            src="/marvel-logo.svg"
            width={130}
          />
        </Link>
        <Link aria-label="Link to Favorites" className={styles.favoritesLink} href="" onClick={void 0} passHref>
          Favorites
        </Link>
      </div>
    </header>
  );
}
