import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            alt="Marvel logo"
            className={styles.logo}
            height={52}
            priority
            src="/marvel-logo.svg"
            width={130}
          />
        </Link>
        <Link className={styles.favoritesLink} href="" onClick={void(0)}>Favorites</Link>
      </div>
    </header>
  );
}
