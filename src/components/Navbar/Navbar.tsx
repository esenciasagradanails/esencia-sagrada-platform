import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { BookOpen, Users, Star, Heart, Calendar, HelpCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleTheme } from '../../store/themeSlice';
import { ASSETS } from '../../constants/assets';
import '../../styles/navbar.scss';

const Navbar: React.FC = () => {
 const dispatch = useAppDispatch();
 const theme = useAppSelector((state) => state.theme.theme);

 return (
  <header className='navbar'>
   <div className='navbar__inner'>
    <motion.div whileHover={{ scale: 1.02 }}>
     <a href='#hero'>
      <img src={ASSETS.LOGO_PNG} alt='Logo de Esencia Sagrada Nails' className='navbar__logo' />
     </a>
    </motion.div>

    <nav className='navbar__nav'>
     <a href='#learn' className='navbar__link'>
      <BookOpen size={16} /> Programa
     </a>
     <a href='#audience' className='navbar__link'>
      <Users size={16} /> Audiencia
     </a>
     <a href='#authority' className='navbar__link'>
      <Star size={16} /> Instructora
     </a>
     <a href='#social' className='navbar__link'>
      <Heart size={16} /> Comunidad
     </a>
     <a href='#logistics' className='navbar__link'>
      <Calendar size={16} /> Detalles
     </a>
     <a href='#faq' className='navbar__link'>
      <HelpCircle size={16} /> Preguntas Frecuentes
     </a>
    </nav>

    <div className='navbar__actions'>
     <motion.button
      type='button'
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleTheme())}
      className='navbar__theme-btn'
      aria-label='Cambiar Tema'
     >
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
     </motion.button>
    </div>
   </div>
  </header>
 );
};

export default Navbar;
