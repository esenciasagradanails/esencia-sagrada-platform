import React from 'react';
import styles from './CustomInput.module.scss';

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  'data-theme'?: 'light' | 'dark';
  error?: string;
  id: string;
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  'data-theme': dataTheme,
  className,
  error,
  id,
  label,
  ...rest
}) => {
  return (
    <div className={styles.wrapper} data-theme={dataTheme}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={[styles.input, error ? styles.inputError : '', className ?? '']
          .filter(Boolean)
          .join(' ')}
        id={id}
        {...rest}
      />
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
