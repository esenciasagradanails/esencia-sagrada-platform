import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../../../../core/utils/animations';


interface FinalCtaSectionProps {
  onOpenModal: () => void;
}

const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="final-cta">
      <div className="final-cta__blob" />

      <div className="core-container">
        <motion.div
          className="final-cta__content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={fadeUp} className="final-cta__title">
            El momento es ahora
          </motion.h2>

          <motion.p variants={fadeUp} className="final-cta__subtitle">
            Deja de postergar tus sueños. Únete a la masterclass y descubre cómo rentabilizar tu talento en la industria de las uñas.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <span className="final-cta__badge">¡CUPOS ESTRICTAMENTE LIMITADOS!</span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="final-cta__btn"
              onClick={onOpenModal}
              type="button"
            >
              Asegurar Mi Cupo Gratis
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
