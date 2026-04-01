import Image from 'next/image';
import styles from './GuestGuide.module.css';

/* Manual do convidado — dress code e informações gerais */
export default function GuestGuide() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.infoCard}>
          {/* Cabeçalho */}
          <header className={styles.header}>
            <h2 className={styles.title}>Manual do<br />Convidado</h2>
          </header>

          {/* Subseção de traje */}
          <section className={styles.dressCode}>
            <h3 className={styles.dressCodeTitle}>TRAJE SOCIAL</h3>

            <div className={styles.dressCodeContent}>
              {/* Texto do dress code */}
              <div className={styles.dressCodeText}>
                <p>
                  Para as mulheres, o espaço é todo calçado então não
                  precisa se preocupar do salto &ldquo;afundar&rdquo; na grama, também
                  pedimos que evite a cor branca, nude e tons claros
                </p>
              </div>
            </div>
          </section>

          {/* Monograma com data */}
          <div className={styles.monogramRow}>
            <span className={`${styles.monogramDate} ${styles.monogramDateSide}`}>25.07</span>
            <div className={styles.monogramCenter}>
              <Image
                src="/images/monograma-logo.png"
                alt="C & I"
                width={125}
                height={125}
                style={{ objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(28%) sepia(20%) saturate(600%) hue-rotate(10deg) brightness(85%)' }}
              />
              <span className={`${styles.monogramDate} ${styles.monogramDateBelow}`}>25.07.2026</span>
            </div>
            <span className={`${styles.monogramDate} ${styles.monogramDateSide}`}>2026</span>
          </div>

        </div>
        <p className={styles.credit}>
          criado por{' '}
          <a
            href="https://www.instagram.com/ilustraniviswedding"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            @ilustraniviswedding
          </a>
        </p>
      </div>
    </div>
  );
}
