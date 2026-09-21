import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleTheme } from '../../store/themeSlice';
import { ASSETS } from '../../constants/assets';
import '../../styles/navbar.scss';

const Navbar: React.FC = () => {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const dispatch = useAppDispatch();
 const theme = useAppSelector((state) => state.theme.theme);

 const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
 const closeMobileMenu = () => setIsMobileMenuOpen(false);

 return (
  <header className='navbar'>
   <div className='navbar__inner'>
    <motion.div whileHover={{ scale: 1.02 }}>
     <a href='#hero'>
      <img src={ASSETS.LOGO_SVG} alt='Logo de Esencia Sagrada Nails' className='navbar__logo' />
     </a>
    </motion.div>

    <nav className='navbar__nav'>
     <a href='#learn' className='navbar__link'>
      Lo que aprenderás
     </a>
     <a href='#audience' className='navbar__link'>
      Para quién es
     </a>
     <a href='#authority' className='navbar__link'>
      Con quién aprenderás
     </a>
     <a href='#social' className='navbar__link'>
      Comunidad
     </a>
     <a href='#logistics' className='navbar__link'>
      Detalles
     </a>
     <a href='#faq' className='navbar__link'>
      Preguntas frecuentes
     </a>
    </nav>

    <div className='navbar__actions'>
     <motion.button
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleTheme())}
      className='navbar__theme-btn'
      aria-label='Cambiar Tema'
     >
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
     </motion.button>

     <button className='navbar__mobile-toggle' onClick={toggleMobileMenu} aria-label='Menú'>
      {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
     </button>
    </div>
   </div>

   <AnimatePresence>
    {isMobileMenuOpen && (
     <motion.div
      className='navbar__mobile-menu'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
     >
      <nav className='navbar__mobile-nav'>
       <a href='#learn' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Programa
       </a>
       <a href='#audience' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Audiencia
       </a>
       <a href='#authority' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Instructora
       </a>
       <a href='#social' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Comunidad
       </a>
       <a href='#logistics' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Detalles
       </a>
       <a href='#faq' className='navbar__mobile-link' onClick={closeMobileMenu}>
        Preguntas Frecuentes
       </a>
      </nav>
     </motion.div>
    )}
   </AnimatePresence>
  </header>
 );
};

export default Navbar;
