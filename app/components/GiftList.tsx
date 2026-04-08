import styles from './GiftList.module.css';

const giftOptions = [
  {
    id: 'camicado',
    line1: 'LISTA DA',
    line2: 'CAMICADO',
    href: 'https://lista.camicado.com.br/casamentoceciliaeivo',
  },
  {
    id: 'lojas-2001',
    line1: 'LOJAS',
    line2: '2001',
    href: 'https://wa.me/message/WSWSETENV657O1',
  },
  {
    id: 'lista-virtual',
    line1: 'LISTA',
    line2: 'VIRTUAL',
    href: 'https://noivos.casar.com/cecilia-e-ivo',
  },
];

export default function GiftList() {
  return (
    <div className={styles.section}>
        {/* Cabeçalho com linhas laterais full-width */}
        <header className={styles.header}>
          <span className={styles.headerLine} />
          <h2 className={styles.title}>
            LISTA DE<br />PRESENTES
          </h2>
          <span className={styles.headerLine} />
        </header>

      <div className={styles.container}>
        {/* Cards */}
        <div className={styles.cards}>
          {giftOptions.map((option) => (
            <a
              key={option.id}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={`Abrir ${option.line1} ${option.line2}`}
            >
              <h3 className={styles.cardTitle}>
                {option.line1}<br />{option.line2}
              </h3>
              <span className={styles.cardCta}>CLIQUE AQUI</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
