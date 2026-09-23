import React from 'react';


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
    <div className="ci-wrapper" data-theme={dataTheme}>
      <label className="ci-label" htmlFor={id}>
        {label}
      </label>
      <input
        className={['ci-input', error ? 'ci-inputError' : '', className ?? '']
          .filter(Boolean)
          .join(' ')}
        id={id}
        {...rest}
      />
      {error && (
        <span className="ci-errorMessage" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
