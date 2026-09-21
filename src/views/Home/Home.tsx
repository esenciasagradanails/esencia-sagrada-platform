import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import LearnSection from '../../components/sections/LearnSection/LearnSection';
import AudienceSection from '../../components/sections/AudienceSection/AudienceSection';
import AuthoritySection from '../../components/sections/AuthoritySection/AuthoritySection';
import LogisticsSection from '../../components/sections/LogisticsSection/LogisticsSection';
import FaqSection from '../../components/sections/FaqSection/FaqSection';
import FinalCtaSection from '../../components/sections/FinalCtaSection/FinalCtaSection';
import '../../styles/home.scss';

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="page-main">
        <HeroSection />
        <LearnSection />
        <AudienceSection />
        <AuthoritySection />
        <LogisticsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
