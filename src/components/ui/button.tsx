import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg transition-colors';
  
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50',
    destructive: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
    outline: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 disabled:opacity-50'
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};