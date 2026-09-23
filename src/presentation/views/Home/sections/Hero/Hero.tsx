import React from 'react';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Domina el Arte Profesional de las Uñas y Construye tu Imperio
        </h1>
        <p className={styles.subtitle}>
          Únete a la masterclass exclusiva de Dayana para elevar tus técnicas, atraer clientes premium y escalar tu negocio de uñas hoy mismo.
        </p>
        <button className={styles.ctaButton}>
          Reserva Tu Lugar Ahora
        </button>
      </div>
    </section>
  );
};

export default Hero;
