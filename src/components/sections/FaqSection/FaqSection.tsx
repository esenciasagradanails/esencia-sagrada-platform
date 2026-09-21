import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../../lib/animations';
import { ChevronDown } from 'lucide-react';
import '../../../styles/faq.scss';

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Necesito experiencia?',
      a: '¡No! Esta clase es apta para personas con y sin experiencia previa en el mundo de las uñas.'
    },
    {
      q: '¿Es realmente gratis?',
      a: '¡Sí! Queremos ayudarte a resolver los problemas más comunes al momento de realizar esta técnica para que puedas avanzar y dominar la técnica.'
    },
    {
      q: '¿Qué necesito para participar?',
      a: 'Si deseas realizar la práctica en el momento de la clase necesitarás los implementos básicos para realizar el servicio (puedes pedirnos el listado antes de la clase para que tengas todo preparado). Si tu interés es solo adquirir la información de la clase sin ejecutarla en el momento no es necesario nada más que tu disposición e interés de recibirla.'
    },
    {
      q: '¿Queda grabado?',
      a: '¡No! Esta edición especial será una única experiencia exclusivamente para quienes asistan a ella.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="core-container">
        <motion.h2
          className="faq__title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Preguntas Frecuentes
        </motion.h2>

        <motion.div
          className="faq__list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                className="faq__item"
              >
                <button
                  className="faq__question"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <motion.span
                    className="faq__icon"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={22} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="faq__answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
