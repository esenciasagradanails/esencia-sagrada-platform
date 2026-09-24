import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { BookOpen, Users, Star, Heart, Calendar, HelpCircle } from 'lucide-react';
import { socialLinks } from '../../../../core/constants/socialLinks';
import { ASSETS } from '../../../../core/constants/assets';


const Footer: React.FC = () => {
 return (
  <footer className='footer'>
   <div className='footer__inner'>
    <motion.div
     className='footer__brand'
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: false, amount: 0.5 }}
    >
     <img src={ASSETS.LOGO_SVG} alt='Esencia Sagrada Nails' className='footer__logo' />
     <p className='footer__tagline'>
      Empoderando a mujeres a través de la educación y el arte profesional de las uñas en toda Colombia y el mundo.
     </p>
    </motion.div>

    <motion.div
     className='footer__nav'
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: false, amount: 0.3 }}
    >
     <h4 className='footer__social-heading'>Enlaces Rápidos</h4>
     <nav className='footer__nav-links'>
      <a href='#learn' className='footer__nav-link'>
       <BookOpen size={16} /> Programa
      </a>
      <a href='#audience' className='footer__nav-link'>
       <Users size={16} /> Audiencia
      </a>
      <a href='#authority' className='footer__nav-link'>
       <Star size={16} /> Instructora
      </a>
      <a href='#social' className='footer__nav-link'>
       <Heart size={16} /> Comunidad
      </a>
      <a href='#logistics' className='footer__nav-link'>
       <Calendar size={16} /> Detalles
      </a>
      <a href='#faq' className='footer__nav-link'>
       <HelpCircle size={16} /> Preguntas Frecuentes
      </a>
     </nav>
    </motion.div>

    <motion.div
     className='footer__social'
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: false, amount: 0.3 }}
    >
     <h4 className='footer__social-heading'>Síguenos</h4>
     <div className='footer__icons'>
      <motion.a
       whileHover={{ scale: 1.15, y: -5 }}
       href={socialLinks.instagram}
       target='_blank'
       rel='noopener noreferrer'
       className='footer__icon-link'
       aria-label='Instagram'
      >
       <FaInstagram />
      </motion.a>
      <motion.a
       whileHover={{ scale: 1.15, y: -5 }}
       href={socialLinks.facebook}
       target='_blank'
       rel='noopener noreferrer'
       className='footer__icon-link'
       aria-label='Facebook'
      >
       <FaFacebookF />
      </motion.a>
      <motion.a
       whileHover={{ scale: 1.15, y: -5 }}
       href={socialLinks.tiktok}
       target='_blank'
       rel='noopener noreferrer'
       className='footer__icon-link'
       aria-label='TikTok'
      >
       <FaTiktok />
      </motion.a>
      <motion.a
       whileHover={{ scale: 1.15, y: -5 }}
       href={socialLinks.skool}
       target='_blank'
       rel='noopener noreferrer'
       className='footer__skool-link'
       aria-label='Comunidad Skool'
      >
       Skool
      </motion.a>
     </div>
    </motion.div>
   </div>

   <p className='footer__copyright'>&copy; {new Date().getFullYear()} Esencia Sagrada Nails. Todos los derechos reservados.</p>
  </footer>
 );
};

export default Footer;
