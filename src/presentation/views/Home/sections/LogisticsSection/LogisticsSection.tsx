import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp } from '../../../../../core/utils/animations';
import { CalendarDays, Clock, MonitorPlay } from 'lucide-react';


const details = [
  { label: 'Fecha', value: '5 de septiembre', icon: CalendarDays },
  { label: 'Hora', value: '7:00 pm (Hora Colombia)', icon: Clock },
  { label: 'Modalidad', value: 'Virtual', icon: MonitorPlay }
];

const LogisticsSection: React.FC = () => {
  return (
    <section className="logistics" id="logistics">
      <div className="core-container">
        <motion.h2
          className="logistics__title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Detalles de la masterclass
        </motion.h2>

        <motion.div
          className="logistics__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {details.map((detail, idx) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                whileHover={{ scale: 1.04, y: -4 }}
                className="logistics__card"
              >
                <div className="logistics__card-icon">
                  <Icon size={32} />
                </div>
                <p className="logistics__card-label">{detail.label}</p>
                <p className="logistics__card-value">{detail.value}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LogisticsSection;
