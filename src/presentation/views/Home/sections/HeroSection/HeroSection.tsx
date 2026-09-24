import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../../../../core/utils/animations';


interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="hero" id="hero">
      <div className="hero__blob-left" />
      <div className="hero__blob-right" />

      <div className="core-container">
        <motion.div
          className="hero__content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1 variants={fadeUp} className="hero__title">
            Deja de perder clientas, tiempo y dinero por una mala técnica
          </motion.h1>

          <motion.p variants={fadeUp} className="hero__subtitle">
            Clase gratuita en vivo (Cupos limitados).
          </motion.p>

          <motion.button
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero__cta"
            onClick={onOpenModal}
            type="button"
          >
            ¡Reserva Tu Cupo Ahora!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
