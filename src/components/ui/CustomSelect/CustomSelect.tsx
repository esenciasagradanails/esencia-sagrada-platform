import React from 'react';
import styles from './CustomSelect.module.scss';

export interface SelectOption {
  label: string;
  value: string;
}

export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  'data-theme'?: 'light' | 'dark';
  error?: string;
  id: string;
  label: string;
  options: SelectOption[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  'data-theme': dataTheme,
  className,
  error,
  id,
  label,
  options,
  ...rest
}) => {
  return (
    <div className={styles.wrapper} data-theme={dataTheme}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          className={[styles.select, error ? styles.selectError : '', className ?? '']
            .filter(Boolean)
            .join(' ')}
          id={id}
          {...rest}
        >
          <option disabled value="">
            — Selecciona una opción —
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className={styles.arrow}>
          ▾
        </span>
      </div>
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
