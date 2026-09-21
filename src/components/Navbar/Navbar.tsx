import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { toggleTheme } from '../../store/themeSlice';
import { ASSETS } from '../../constants/assets';
import '../../styles/navbar.scss';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <motion.div whileHover={{ scale: 1.02 }}>
          <img
            src={ASSETS.LOGO_TRANSPARENT}
            alt="Logo de Esencia Sagrada Nails"
            className="navbar__logo"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(toggleTheme())}
          className="navbar__theme-btn"
          aria-label="Cambiar Tema"
        >
          {theme === 'light' ? <Moon size={28} /> : <Sun size={28} />}
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
