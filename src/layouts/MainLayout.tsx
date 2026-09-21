import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { toggleTheme } from '../store/themeSlice';
import { socialLinks } from '../constants/socialLinks';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';

import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src="/assets/logo-esencia-sagrada.webp" alt="Logo de Esencia Sagrada Nails" className={styles.logo} />
        </div>
        <button onClick={() => dispatch(toggleTheme())} className={styles.themeToggle} aria-label="Cambiar Tema">
          {theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
      </header>
      
      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>&copy; {new Date().getFullYear()} Esencia Sagrada Nails. Todos los derechos reservados.</p>
          <div className={styles.socialIcons}>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href={socialLinks.skool} target="_blank" rel="noopener noreferrer" aria-label="Comunidad Skool">
              <span>Skool</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
