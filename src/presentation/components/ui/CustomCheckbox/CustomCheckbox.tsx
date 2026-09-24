import React from 'react';


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
    <div className="cc-wrapper" data-theme={dataTheme}>
      <label
        className={['cc-label', className ?? ''].filter(Boolean).join(' ')}
        htmlFor={id}
      >
        <input
          className="cc-input"
          id={id}
          type="checkbox"
          {...rest}
        />
        <span className="cc-checkmark" aria-hidden="true" />
        <span className="cc-labelText">{label}</span>
      </label>
      {error && (
        <span className="cc-errorMessage" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomCheckbox;
