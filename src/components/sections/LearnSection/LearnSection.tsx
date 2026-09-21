import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../../lib/animations';
import { CheckCircle2 } from 'lucide-react';
import '../../../styles/learn.scss';

const topics = [
  { title: 'Técnica que dura', desc: 'La técnica adecuada para que tu servicio dure intacto hasta 3 semanas.' },
  { title: 'Errores comunes', desc: 'Los 3 errores comunes que hacen que un servicio no dure.' },
  { title: 'Servicio rentable', desc: 'Realizar un servicio de salón eficaz que te permita generar tus propios ingresos.' }
];

const LearnSection: React.FC = () => {
  return (
    <section className="learn" id="learn">
      <div className="core-container">
        <motion.h2
          className="learn__title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Lo que aprenderás
        </motion.h2>

        <motion.div
          className="learn__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -4 }}
              className="learn__card"
            >
              <CheckCircle2 className="learn__card-icon" size={36} />
              <div className="learn__card-body">
                <h3 className="learn__card-title">{topic.title}</h3>
                <p className="learn__card-desc">{topic.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LearnSection;
