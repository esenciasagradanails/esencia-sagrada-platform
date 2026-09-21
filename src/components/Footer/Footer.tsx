import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import { socialLinks } from '../../constants/socialLinks';
import '../../styles/footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <motion.div
          className="footer__brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="/assets/logo-transparent.png"
            alt="Esencia Sagrada Nails"
            className="footer__logo"
          />
          <p className="footer__tagline">
            Empoderando a mujeres a través de la educación y el arte profesional de las uñas en toda Colombia y el mundo.
          </p>
        </motion.div>

        <motion.div
          className="footer__social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="footer__social-heading">Síguenos</h4>
          <div className="footer__icons">
            <motion.a
              whileHover={{ scale: 1.15, y: -5 }}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
              aria-label="Instagram"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, y: -5 }}
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, y: -5 }}
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
              aria-label="TikTok"
            >
              <FaTiktok />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, y: -5 }}
              href={socialLinks.skool}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__skool-link"
              aria-label="Comunidad Skool"
            >
              Skool
            </motion.a>
          </div>
        </motion.div>

      </div>

      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Esencia Sagrada Nails. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
