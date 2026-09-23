import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomInput from '../ui/CustomInput/CustomInput';
import CustomSelect from '../ui/CustomSelect/CustomSelect';
import CustomCheckbox from '../ui/CustomCheckbox/CustomCheckbox';
import CustomButton from '../ui/CustomButton/CustomButton';
import { useLeadCapture } from '../../hooks/useLeadCapture';
import styles from './RegistrationModal.module.scss';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPERIENCE_OPTIONS = [
  { label: 'Sin experiencia', value: 'sin_experiencia' },
  { label: 'Principiante (menos de 1 año)', value: 'principiante' },
  { label: 'Intermedio (1–3 años)', value: 'intermedio' },
  { label: 'Avanzado (más de 3 años)', value: 'avanzado' },
];

const EXPERIENCE_TIME_OPTIONS = [
  { label: 'Menos de 6 meses', value: 'menos_6_meses' },
  { label: '6 meses – 1 año', value: '6_meses_1_anio' },
  { label: '1–3 años', value: '1_3_anios' },
  { label: 'Más de 3 años', value: 'mas_3_anios' },
];

const MODALITY_OPTIONS = [
  { label: 'A domicilio', value: 'domicilio' },
  { label: 'En salón propio', value: 'salon_propio' },
  { label: 'En salón rentado', value: 'salon_rentado' },
  { label: 'Aún no ejerzo', value: 'sin_ejercer' },
];

const OBJECTIVE_OPTIONS = [
  { label: 'Aprender desde cero', value: 'aprender_cero' },
  { label: 'Mejorar mi técnica', value: 'mejorar_tecnica' },
  { label: 'Aumentar mis ingresos', value: 'aumentar_ingresos' },
  { label: 'Certificarme profesionalmente', value: 'certificacion' },
];

const TOPIC_OPTIONS = [
  { label: 'Nail art y diseños', value: 'nail_art' },
  { label: 'Acrílico y gel', value: 'acrilico_gel' },
  { label: 'Manicura rusa', value: 'manicura_rusa' },
  { label: 'Negocio y marketing', value: 'negocio_marketing' },
];

const INVEST_OPTIONS = [
  { label: 'Sí, estoy lista para invertir', value: 'si' },
  { label: 'Depende del precio', value: 'depende' },
  { label: 'Por ahora no', value: 'no' },
];

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const { errors, formState, handleChange, handleSubmit, isLoading, isSuccess } =
    useLeadCapture(onClose);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label="Modal de registro"
          aria-modal="true"
          className={styles.backdrop}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          transition={{ duration: 0.25 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={styles.modal}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerText}>
                <span className={styles.badge}>✦ Registro Exclusivo</span>
                <h2 className={styles.title}>Reserva tu lugar en la Masterclass</h2>
                <p className={styles.subtitle}>
                  Completa el formulario y te contactamos personalmente por WhatsApp.
                </p>
              </div>
              <button
                aria-label="Cerrar modal"
                className={styles.closeButton}
                onClick={onClose}
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <div className={styles.row}>
                <CustomInput
                  autoComplete="name"
                  error={errors.full_name}
                  id="lead-full-name"
                  label="Nombre completo"
                  name="full_name"
                  onChange={handleChange}
                  placeholder="Ej. María González"
                  required
                  type="text"
                  value={formState.full_name}
                />
                <CustomInput
                  autoComplete="tel"
                  error={errors.whatsapp_number}
                  id="lead-whatsapp"
                  label="Número de WhatsApp"
                  name="whatsapp_number"
                  onChange={handleChange}
                  placeholder="Ej. +52 55 1234 5678"
                  required
                  type="tel"
                  value={formState.whatsapp_number}
                />
              </div>

              <div className={styles.row}>
                <CustomSelect
                  error={errors.current_experience}
                  id="lead-experience"
                  label="Experiencia actual"
                  name="current_experience"
                  onChange={handleChange}
                  options={EXPERIENCE_OPTIONS}
                  required
                  value={formState.current_experience}
                />
                <CustomSelect
                  error={errors.experience_time}
                  id="lead-experience-time"
                  label="Tiempo de experiencia"
                  name="experience_time"
                  onChange={handleChange}
                  options={EXPERIENCE_TIME_OPTIONS}
                  required
                  value={formState.experience_time}
                />
              </div>

              <div className={styles.row}>
                <CustomSelect
                  error={errors.work_modality}
                  id="lead-modality"
                  label="Modalidad de trabajo"
                  name="work_modality"
                  onChange={handleChange}
                  options={MODALITY_OPTIONS}
                  required
                  value={formState.work_modality}
                />
                <CustomSelect
                  error={errors.main_objective}
                  id="lead-objective"
                  label="Objetivo principal"
                  name="main_objective"
                  onChange={handleChange}
                  options={OBJECTIVE_OPTIONS}
                  required
                  value={formState.main_objective}
                />
              </div>

              <div className={styles.row}>
                <CustomSelect
                  error={errors.topic_of_interest}
                  id="lead-topic"
                  label="Tema de interés"
                  name="topic_of_interest"
                  onChange={handleChange}
                  options={TOPIC_OPTIONS}
                  required
                  value={formState.topic_of_interest}
                />
                <CustomSelect
                  error={errors.willing_to_invest}
                  id="lead-invest"
                  label="¿Dispuesta a invertir?"
                  name="willing_to_invest"
                  onChange={handleChange}
                  options={INVEST_OPTIONS}
                  required
                  value={formState.willing_to_invest}
                />
              </div>

              <CustomCheckbox
                checked={formState.wpp_group_joined}
                id="lead-wpp-group"
                label={
                  <>
                    <strong>Quiero unirme al grupo exclusivo de WhatsApp</strong>{' '}
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>
                      (recibirás el enlace al registrarte)
                    </span>
                  </>
                }
                name="wpp_group_joined"
                onChange={handleChange}
              />

              {isSuccess && (
                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: -8 }}
                >
                  ✅ ¡Registro exitoso! Te contactaremos pronto.
                </motion.p>
              )}

              <CustomButton
                id="lead-submit-button"
                isLoading={isLoading}
                type="submit"
                variant="primary"
              >
                Reservar mi lugar ahora ✦
              </CustomButton>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
