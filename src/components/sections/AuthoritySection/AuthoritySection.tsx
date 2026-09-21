import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight } from '../../../lib/animations';
import { Award, Star } from 'lucide-react';
import { ASSETS } from '../../../constants/assets';
import '../../../styles/authority.scss';

const AuthoritySection: React.FC = () => {
 return (
  <section className='authority'>
   <div className='authority__inner'>
    <motion.div
     className='authority__image-col'
     initial='hidden'
     whileInView='visible'
     viewport={{ once: true, amount: 0.3 }}
     variants={fadeRight}
    >
     <img src={ASSETS.DAYANA_WEBP} alt='Dayana - Instructora de Esencia Sagrada' className='authority__image' />
    </motion.div>

    <motion.div
     className='authority__text-col'
     initial='hidden'
     whileInView='visible'
     viewport={{ once: true, amount: 0.3 }}
     variants={fadeLeft}
    >
     <motion.div variants={fadeUp} className='authority__stars'>
      {[1, 2, 3, 4, 5].map((i) => (
       <Star key={i} fill='currentColor' size={26} />
      ))}
     </motion.div>

     <motion.h2 variants={fadeUp} className='authority__heading'>
      Aprende con Dayana
     </motion.h2>

     <motion.p variants={fadeUp} className='authority__body'>
      Soy Dayana, artista del mundo de las uñas con + de 6 años de trayectoria y experiencia en los cuales he adquirido un gran conocimiento y dominio de diferentes técnicas lo cual me ha permitido crear mi propio negocio y vivir de mi pasión por este arte.
     </motion.p>

     <motion.a
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href='https://www.skool.com/esencia-sagrada'
      target='_blank'
      rel='noopener noreferrer'
      className='authority__cta'
     >
      <Award size={22} />
      Únete a Nuestra Comunidad
     </motion.a>
    </motion.div>
   </div>
  </section>
 );
};

export default AuthoritySection;
