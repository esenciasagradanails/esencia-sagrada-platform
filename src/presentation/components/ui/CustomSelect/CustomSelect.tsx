import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SelectOption {
 label: string;
 value: string;
}

export interface CustomSelectProps {
 'data-theme'?: 'light' | 'dark';
 error?: string;
 id: string;
 label: string;
 options: SelectOption[];
 onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
 onClick?: React.MouseEventHandler<HTMLButtonElement>;
 value?: string;
 name?: string;
 required?: boolean;
 className?: string;
 disabled?: boolean;
}

const dropdownVariants = {
 hidden: { opacity: 0, y: -10, scaleY: 0.95, transformOrigin: 'top' },
 visible: {
  opacity: 1,
  y: 0,
  scaleY: 1,
  transition: { duration: 0.2, ease: 'easeOut' as const },
 },
 exit: {
  opacity: 0,
  y: -10,
  scaleY: 0.95,
  transition: { duration: 0.15, ease: 'easeIn' as const },
 },
};

const CustomSelect: React.FC<CustomSelectProps> = ({
 'data-theme': dataTheme,
 className,
 error,
 id,
 label,
 options,
 onChange,
 onClick,
 value,
 name,
 disabled,
}) => {
 const [isOpen, setIsOpen] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
    setIsOpen(false);
   }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const handleSelect = (optValue: string) => {
  if (onChange) {
   // Mock the event object for form handlers
   const event = {
    target: { name, value: optValue },
    currentTarget: { name, value: optValue },
   } as unknown as React.ChangeEvent<HTMLSelectElement>;
   onChange(event);
  }
  setIsOpen(false);
 };

 const selectedOption = options.find((opt) => opt.value === value);

 return (
  <div className='cs-wrapper' data-theme={dataTheme} ref={containerRef}>
   <label className='cs-label' htmlFor={id}>
    {label}
   </label>
   <div className='cs-selectWrapper'>
    <button
     type='button'
     id={id}
     className={['cs-select', error ? 'cs-selectError' : '', className ?? ''].filter(Boolean).join(' ')}
     onClick={(e) => {
      setIsOpen(!isOpen);
      if (onClick) onClick(e);
     }}
     aria-haspopup='listbox'
     aria-expanded={isOpen}
     disabled={disabled}
    >
     <span className={!selectedOption ? 'cs-placeholder' : ''}>
      {selectedOption ? selectedOption.label : '— Selecciona una opción —'}
     </span>
     <motion.span className='cs-arrow' animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} aria-hidden='true'>
      ▾
     </motion.span>
    </button>

    <AnimatePresence>
     {isOpen && (
      <motion.ul
       className='cs-dropdown'
       variants={dropdownVariants}
       initial='hidden'
       animate='visible'
       exit='exit'
       role='listbox'
      >
       {options.map((opt) => (
        <li
         key={opt.value}
         className={`cs-dropdownItem ${value === opt.value ? 'cs-dropdownItemSelected' : ''}`}
         role='option'
         aria-selected={value === opt.value}
         onClick={() => handleSelect(opt.value)}
        >
         {opt.label}
        </li>
       ))}
      </motion.ul>
     )}
    </AnimatePresence>
   </div>
   {error && (
    <motion.span className='cs-errorMessage' initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} role='alert'>
     {error}
    </motion.span>
   )}
  </div>
 );
};

export default CustomSelect;
