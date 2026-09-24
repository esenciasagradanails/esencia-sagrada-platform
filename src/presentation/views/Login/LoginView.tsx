import React from 'react';
import { motion } from 'framer-motion';
import { useLoginForm } from '../../../core/hooks/useLoginForm';
import CustomButton from '../../components/ui/CustomButton/CustomButton';
import CustomInput from '../../components/ui/CustomInput/CustomInput';

const LoginView: React.FC = () => {
  const { email, error, isLoading, password, setEmail, setPassword, submit } =
    useLoginForm();

  return (
    <motion.div 
      className="lv-page"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Decorative background orbs */}
      <span aria-hidden="true" className="lv-orb1" />
      <span aria-hidden="true" className="lv-orb2" />

      <main className="lv-card">
        <div className="lv-logoArea">
          <span className="lv-logoMark">✦</span>
          <h1 className="lv-brandName">Esencia Sagrada</h1>
          <p className="lv-brandTagline">Panel de Administración</p>
        </div>

        <form
          className="lv-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <CustomInput
            autoComplete="email"
            id="login-email"
            label="Correo electrónico"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@esenciasagrada.com"
            required
            type="email"
            value={email}
          />
          <CustomInput
            autoComplete="current-password"
            id="login-password"
            label="Contraseña"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            type="password"
            value={password}
          />

          {error && (
            <p className="lv-errorBanner" role="alert">
              {error}
            </p>
          )}

          <CustomButton
            id="login-submit-button"
            isLoading={isLoading}
            type="submit"
            variant="primary"
          >
            Iniciar sesión
          </CustomButton>
        </form>
      </main>
    </motion.div>
  );
};

export default LoginView;
