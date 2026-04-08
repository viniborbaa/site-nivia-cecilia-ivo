import Image from 'next/image';
import styles from './Location.module.css';

/* Seção de localização e horário da cerimônia */
export default function Location() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.infoCard}>
          {/* Título da seção */}
          <h2 className={styles.title}>
            Querido convidado
          </h2>

          {/* Carta aos convidados */}
          <div className={styles.letter}>
            <p>
              Estamos muito felizes em convidar vocês para celebrar conosco um
              dos dias mais especiais de nossas vidas. Nossa história já soma 6
              anos de risadas, alguns choros (dos tristes e dos felizes), planos
              que saíram do controle e outros que ainda estão nele. Entre três
              cachorros, dois gatos e muitos momentos compartilhados, chegou o
              momento de celebrar, ao lado de quem faz parte da nossa vida, o
              começo de um novo capítulo juntos.
            </p>
            <p>
              Preparamos esse dia com muito carinho para que ele seja muito mais
              do que uma formalidade. Queremos que essa cerimônia seja um momento
              de celebração ao lado daqueles que, de alguma forma, fizeram parte
              da nossa história. Será um dia de fazer boas memórias, repleto de
              emoção, abraços apertados, música boa, comida gostosa e muita
              alegria.
            </p>
            <p>
              E a sua presença vai tornar essa ocasião ainda mais especial.
              Esperamos que aproveite, dance, brinde e comemore conosco esse novo
              capítulo em nossas vidas.
            </p>
          </div>

          <p className={styles.closing}>Com carinho,</p>

          <div className={styles.namesLogo}>
            <Image
              src="/images/nomes-v2.png"
              alt="Cecília & Ivo"
              width={300}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <Image
            src="/images/passaro.png"
            alt=""
            width={160}
            height={160}
            style={{ objectFit: 'contain', margin: '2.5rem 0' }}
          />

          <h2 className={styles.sectionTitle}><span>LOCALIZAÇÃO</span><span>E HORÁRIOS</span></h2>

          <Image
            src="/images/casa.png"
            alt="Nogueira Garden"
            width={560}
            height={360}
            style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
          />

          {/* Data e horário */}
          <div className={styles.dateTime}>
            <p className={styles.eventDate}>25 de julho de 2026</p>
            <p className={styles.eventTime}>às 15 horas</p>
          </div>

          {/* Informações do local */}
          <div className={styles.venueInfo}>
            <h3 className={styles.venueName}>Nogueira Garden</h3>
            <p className={styles.venueAddress}>Estrada de Aldeia Km.5</p>
            <p className={styles.venueCity}>Camaragibe — PE</p>
          </div>

          <div className={styles.mapWrapper}>
            <iframe
              src="https://maps.google.com/maps?q=Nogueira+Garden+Estrada+de+Aldeia+KM5+Camaragibe+PE&output=embed&z=15"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nogueira Garden"
            />
          </div>

          <div className={styles.cardDivider} />

          {/* Como chegar */}
          <div className={styles.directions}>
            <h4 className={styles.directionsTitle}>COMO CHEGAR</h4>
            <div className={styles.directionsContent}>
              <p>
              Você pode ir de carro próprio, o local conta com estacionamento. 
              Ou de carro de aplicativo, como Uber e 99.
              </p>
              <p>
                Obs.: como será em Aldeia, e num período chuvoso, recomendamos
                sair com certa antecedência pra evitar imprevistos que gerem atrasos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
