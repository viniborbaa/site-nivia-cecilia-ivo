import Image from 'next/image';
import heroTitle from '@/public/images/hero-title.png';
import styles from './Hero.module.css';

/* Seção hero — data */
export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <Image
          src={heroTitle}
          alt="Cecília & Ivo"
          className={styles.heroImage}
          priority
        />
        <p className={styles.date}>25.07.26</p>
      </div>
    </section>
  );
}
