import React from 'react';


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
        'cb-button',
        `cb-${variant}`,
        isLoading ? 'cb-loading' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-theme={dataTheme}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? (
        <span aria-label="Cargando…" className="cb-spinner" role="status" />
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
