import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import CustomButton from '../../components/ui/CustomButton/CustomButton';
import CustomInput from '../../components/ui/CustomInput/CustomInput';
import styles from './LoginView.module.scss';

const LoginView: React.FC = () => {
  const { error, isLoading, signIn } = useAuth();
  const navigate = useNavigate();

  // Local state only for uncontrolled form fields — these are NOT derived from auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
    // Navigate only if no error — the useAuth hook will update session state
    // and ProtectedRoute will redirect; but we also push proactively here
    if (!error) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      {/* Decorative background orbs */}
      <span aria-hidden="true" className={styles.orb1} />
      <span aria-hidden="true" className={styles.orb2} />

      <main className={styles.card}>
        <div className={styles.logoArea}>
          <span className={styles.logoMark}>✦</span>
          <h1 className={styles.brandName}>Esencia Sagrada</h1>
          <p className={styles.brandTagline}>Panel de Administración</p>
        </div>

        <form className={styles.form} noValidate onSubmit={handleSubmit}>
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
            <p className={styles.errorBanner} role="alert">
              {error.includes('Invalid login credentials')
                ? 'Credenciales incorrectas. Verifica tu correo y contraseña.'
                : error}
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
    </div>
  );
};

export default LoginView;
