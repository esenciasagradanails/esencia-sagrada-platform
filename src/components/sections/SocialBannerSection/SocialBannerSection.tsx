import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem } from '../../../lib/animations';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { socialLinks } from '../../../constants/socialLinks';
import '../../../styles/social-banner.scss';

const SocialBannerSection: React.FC = () => {
  return (
    <section className="social-banner" id="social">
      <motion.div
        className="social-banner__inner"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 variants={fadeUp} className="social-banner__heading">
          Síguenos en nuestras redes sociales
        </motion.h2>
        
        <motion.p variants={fadeUp} className="social-banner__subtitle">
          No te pierdas ninguna novedad, tips exclusivos y contenido diario para llevar tus técnicas al siguiente nivel.
        </motion.p>

        <motion.div variants={staggerContainer} className="social-banner__links">
          <motion.a
            variants={staggerItem}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-banner__link"
            aria-label="Instagram"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            variants={staggerItem}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="social-banner__link"
            aria-label="TikTok"
          >
            <FaTiktok />
          </motion.a>
          <motion.a
            variants={staggerItem}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="social-banner__link"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </motion.a>
          <motion.a
            variants={staggerItem}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.skool.com/@dayana-yotagri-jimenez-8967?utm_source=gemini"
            target="_blank"
            rel="noopener noreferrer"
            className="social-banner__link social-banner__link--skool"
            aria-label="Comunidad Skool"
          >
            Skool
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialBannerSection;
