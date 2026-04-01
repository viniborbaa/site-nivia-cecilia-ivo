import Image from 'next/image';
import Header from './components/Header';
import Hero from './components/Hero';
import Location from './components/Location';
import GiftList from './components/GiftList';
import RSVP from './components/RSVP';
import GuestGuide from './components/GuestGuide';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Seção Hero — nomes e data */}
        <Hero />

        {/* Localização e horário da cerimônia */}
        <section id="localizacao">
          <Location />
        </section>

        {/* Lista de presentes + Confirmação de presença — seção unificada */}
        <div className={styles.giftRsvpSection}>
          <section id="presentes">
            <GiftList />
          </section>
          <div className={styles.dogImageWrapper}>
            <Image src="/images/dogs.png" alt="dogs" fill style={{ objectFit: 'contain' }} />
          </div>
          <section id="confirmacao">
            <RSVP />
          </section>
        </div>

        {/* Manual do convidado */}
        <section id="manual">
          <GuestGuide />
        </section>
      </main>
    </>
  );
}
