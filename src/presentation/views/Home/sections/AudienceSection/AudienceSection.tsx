import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../../../../core/utils/animations';
import { HeartHandshake, Rocket, Sparkles } from 'lucide-react';


const audiences = [
  { title: 'Principiantes', desc: 'Apasionadas por el mundo de las uñas que quieren comenzar desde cero con la técnica correcta.', icon: Sparkles },
  { title: 'Manicuristas con experiencia', desc: 'Profesionales que desean perfeccionar su técnica para ofrecer servicios de mayor calidad y duración.', icon: Rocket },
  { title: 'Dueñas de negocio', desc: 'Emprendedoras que desean fidelizar clientas y escalar los resultados de su salón o servicio a domicilio.', icon: HeartHandshake }
];

const AudienceSection: React.FC = () => {
  return (
    <section className="audience" id="audience">
      <div className="core-container">
        <motion.div
          className="audience__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="audience__title">¿Para quién es esta masterclass?</h2>
          <p className="audience__subtitle">
            Hemos diseñado esta experiencia sin importar en qué nivel te encuentres actualmente.
          </p>
        </motion.div>

        <motion.div
          className="audience__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                whileHover={{ scale: 1.04, y: -6 }}
                className="audience__card"
              >
                <div className="audience__card-icon">
                  <Icon size={36} />
                </div>
                <h3 className="audience__card-title">{aud.title}</h3>
                <p className="audience__card-desc">{aud.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AudienceSection;
