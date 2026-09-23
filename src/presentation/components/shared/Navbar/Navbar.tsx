import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, LayoutDashboard, Home, LogOut, Menu, X } from 'lucide-react';
import { BookOpen, Users, Star, Heart, Calendar, HelpCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/storeHooks';
import { toggleTheme } from '../../../../core/store/themeSlice';
import { useAuth } from '../../../../core/hooks/useAuth';
import { useScrollSpy } from '../../../../core/hooks/useScrollSpy';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ASSETS } from '../../../../core/constants/assets';

const Navbar: React.FC = () => {
 const dispatch = useAppDispatch();
 const theme = useAppSelector((state) => state.theme.theme);
 const { session, signOut } = useAuth();
 const navigate = useNavigate();
 const location = useLocation();
 const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const avatarRef = useRef<HTMLDivElement>(null);

 // ScrollSpy for public landing sections
 const activeSection = useScrollSpy(['learn', 'audience', 'authority', 'social', 'logistics', 'faq'], 150);

 // Close menus when clicking outside
 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
   if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
    setAvatarMenuOpen(false);
   }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
 }, []);

 // Prevent background scrolling when mobile menu is open
 useEffect(() => {
  if (mobileMenuOpen) {
   document.body.style.overflow = 'hidden';
  } else {
   document.body.style.overflow = '';
  }
  return () => {
   document.body.style.overflow = '';
  };
 }, [mobileMenuOpen]);

 const handleSignOut = async () => {
  setAvatarMenuOpen(false);
  setMobileMenuOpen(false);
  await signOut();
  navigate('/login', { replace: true });
 };

 return (
  <header className='navbar'>
   <div className='navbar__inner'>

    {/* Logo — always visible */}
    <motion.div whileHover={{ scale: 1.02 }} className='navbar__logoWrap'>
     {session ? (
      <Link to='/'>
       <img src={ASSETS.LOGO_PNG} alt='Logo de Esencia Sagrada Nails' className='navbar__logo' />
      </Link>
     ) : (
      <a href='#hero'>
       <img src={ASSETS.LOGO_PNG} alt='Logo de Esencia Sagrada Nails' className='navbar__logo' />
      </a>
     )}
    </motion.div>

    {/* Nav links */}
    {!session ? (
     <nav className='navbar__nav'>
      <Link to='/#learn' className={`navbar__link ${activeSection === 'learn' ? 'navbar__link--active' : ''}`}><BookOpen size={15} /> Programa</Link>
      <Link to='/#audience' className={`navbar__link ${activeSection === 'audience' ? 'navbar__link--active' : ''}`}><Users size={15} /> Audiencia</Link>
      <Link to='/#authority' className={`navbar__link ${activeSection === 'authority' ? 'navbar__link--active' : ''}`}><Star size={15} /> Instructora</Link>
      <Link to='/#social' className={`navbar__link ${activeSection === 'social' ? 'navbar__link--active' : ''}`}><Heart size={15} /> Comunidad</Link>
      <Link to='/#logistics' className={`navbar__link ${activeSection === 'logistics' ? 'navbar__link--active' : ''}`}><Calendar size={15} /> Detalles</Link>
      <Link to='/#faq' className={`navbar__link ${activeSection === 'faq' ? 'navbar__link--active' : ''}`}><HelpCircle size={15} /> FAQ</Link>
     </nav>
    ) : (
     <nav className='navbar__nav'>
      <Link to='/' className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}><Home size={15} /> Home</Link>
      <Link to='/dashboard' className={`navbar__link ${location.pathname === '/dashboard' ? 'navbar__link--active' : ''}`}><LayoutDashboard size={15} /> Dashboard</Link>
     </nav>
    )}

    {/* Actions */}
    <div className='navbar__actions'>
     {/* Theme toggle — always visible when NOT logged in */}
     {!session && (
      <motion.button
       type='button'
       whileHover={{ scale: 1.1, rotate: 15 }}
       whileTap={{ scale: 0.9 }}
       onClick={() => dispatch(toggleTheme())}
       className='navbar__theme-btn'
       aria-label='Cambiar Tema'
      >
       {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.button>
     )}

     {/* Avatar dropdown — only when logged in */}
     {session && (
      <div className='navbar__avatarWrap' ref={avatarRef}>
       <button
        type='button'
        className='navbar__avatarBtn'
        onClick={(e) => {
          e.stopPropagation();
          setAvatarMenuOpen((prev) => !prev);
        }}
        aria-label='Menú de usuario'
        aria-expanded={avatarMenuOpen}
       >
        <img
         src={ASSETS.DAYANA_WEBP}
         alt='Dayana'
         className='navbar__avatar'
        />
       </button>

       <AnimatePresence>
        {avatarMenuOpen && (
         <motion.div
          className='navbar__avatarMenu'
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.18, ease: 'easeOut' as const }}
         >
          <button
           type='button'
           className='navbar__avatarMenuItem'
           onClick={() => { dispatch(toggleTheme()); setAvatarMenuOpen(false); }}
          >
           {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
           <span>{theme === 'light' ? 'Modo oscuro' : 'Modo claro'}</span>
          </button>
          <div className='navbar__avatarMenuDivider' />
          <button
           type='button'
           className='navbar__avatarMenuItem navbar__avatarMenuItemDanger'
           onClick={handleSignOut}
          >
           <LogOut size={16} />
           <span>Cerrar sesión</span>
          </button>
         </motion.div>
        )}
       </AnimatePresence>
      </div>
     )}
    </div>
    
    {/* Mobile Hamburger Button */}
    <button 
     className='navbar__hamburger' 
     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
     aria-label="Abrir menú móvil"
    >
     {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
   </div>

   {/* Mobile Menu Overlay */}
   <AnimatePresence>
    {mobileMenuOpen && (
     <motion.div 
      className='navbar__mobileMenu'
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
     >
      {!session ? (
       <nav className='navbar__mobileNav'>
        <Link to='/#learn' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'learn' ? 'navbar__link--active' : ''}`}><BookOpen size={16} /> Programa</Link>
        <Link to='/#audience' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'audience' ? 'navbar__link--active' : ''}`}><Users size={16} /> Audiencia</Link>
        <Link to='/#authority' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'authority' ? 'navbar__link--active' : ''}`}><Star size={16} /> Instructora</Link>
        <Link to='/#social' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'social' ? 'navbar__link--active' : ''}`}><Heart size={16} /> Comunidad</Link>
        <Link to='/#logistics' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'logistics' ? 'navbar__link--active' : ''}`}><Calendar size={16} /> Detalles</Link>
        <Link to='/#faq' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${activeSection === 'faq' ? 'navbar__link--active' : ''}`}><HelpCircle size={16} /> FAQ</Link>
       </nav>
      ) : (
       <nav className='navbar__mobileNav'>
        <Link to='/' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}><Home size={16} /> Home</Link>
        <Link to='/dashboard' onClick={() => setMobileMenuOpen(false)} className={`navbar__link ${location.pathname === '/dashboard' ? 'navbar__link--active' : ''}`}><LayoutDashboard size={16} /> Dashboard</Link>
       </nav>
      )}

      {/* Mobile Theme / Auth Actions */}
      <div className='navbar__mobileActions'>
       {!session && (
        <button
         type='button'
         onClick={() => { dispatch(toggleTheme()); setMobileMenuOpen(false); }}
         className='navbar__mobileActionBtn'
        >
         {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
         {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        </button>
       )}
       {session && (
        <>
         <button
          type='button'
          onClick={() => { dispatch(toggleTheme()); setMobileMenuOpen(false); }}
          className='navbar__mobileActionBtn'
         >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
         </button>
         <button
          type='button'
          onClick={handleSignOut}
          className='navbar__mobileActionBtn navbar__avatarMenuItemDanger'
         >
          <LogOut size={18} />
          Cerrar sesión
         </button>
        </>
       )}
      </div>
     </motion.div>
    )}
   </AnimatePresence>

  </header>
 );
};

export default Navbar;
