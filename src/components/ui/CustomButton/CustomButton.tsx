import React from 'react';
import styles from './CustomButton.module.scss';

export type ButtonVariant = 'ghost' | 'primary' | 'secondary';

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'data-theme'?: 'light' | 'dark';
  isLoading?: boolean;
  variant?: ButtonVariant;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  'data-theme': dataTheme,
  children,
  className,
  disabled,
  isLoading = false,
  variant = 'primary',
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      aria-busy={isLoading}
      className={[
        styles.button,
        styles[variant],
        isLoading ? styles.loading : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-theme={dataTheme}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <span aria-label="Cargando…" className={styles.spinner} role="status" />
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
