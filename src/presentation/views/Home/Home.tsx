import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../../components/shared/Footer/Footer';
import HeroSection from './sections/HeroSection/HeroSection';
import LearnSection from './sections/LearnSection/LearnSection';
import AudienceSection from './sections/AudienceSection/AudienceSection';
import AuthoritySection from './sections/AuthoritySection/AuthoritySection';
import SocialBannerSection from './sections/SocialBannerSection/SocialBannerSection';
import LogisticsSection from './sections/LogisticsSection/LogisticsSection';
import FaqSection from './sections/FaqSection/FaqSection';
import FinalCtaSection from './sections/FinalCtaSection/FinalCtaSection';
import RegistrationModal from '../../components/RegistrationModal/RegistrationModal';


const Home: React.FC = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
 const location = useLocation();

 // Ensure scrolling to hash on cross-page navigation
 useEffect(() => {
  if (location.hash) {
   const element = document.getElementById(location.hash.substring(1));
   if (element) {
    // Add a slight delay to allow page transition to start before scrolling
    setTimeout(() => {
     element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
   }
  }
 }, [location]);

 const openModal = () => setIsModalOpen(true);
 const closeModal = () => setIsModalOpen(false);

 return (
  <motion.div 
    className='page-wrapper'
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
   <main className='page-main'>
    <HeroSection onOpenModal={openModal} />
    <LearnSection />
    <AudienceSection />
    <AuthoritySection />
    <SocialBannerSection />
    <LogisticsSection />
    <FaqSection />
    <FinalCtaSection onOpenModal={openModal} />
   </main>
   <Footer />

   {/* Single modal instance — mounted once, controlled from Home */}
   <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
  </motion.div>
 );
};

export default Home;
