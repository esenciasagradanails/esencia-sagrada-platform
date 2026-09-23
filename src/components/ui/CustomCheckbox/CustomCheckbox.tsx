import React from 'react';
import styles from './CustomCheckbox.module.scss';

export interface CustomCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  'data-theme'?: 'light' | 'dark';
  error?: string;
  id: string;
  label: React.ReactNode;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  'data-theme': dataTheme,
  className,
  error,
  id,
  label,
  ...rest
}) => {
  return (
    <div className={styles.wrapper} data-theme={dataTheme}>
      <label
        className={[styles.label, className ?? ''].filter(Boolean).join(' ')}
        htmlFor={id}
      >
        <input
          className={styles.input}
          id={id}
          type="checkbox"
          {...rest}
        />
        <span className={styles.checkmark} aria-hidden="true" />
        <span className={styles.labelText}>{label}</span>
      </label>
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomCheckbox;
