import React from 'react';
import { FaMicrophone, FaRegStopCircle } from 'react-icons/fa'; // Add this import

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isConnected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  isConnected = false,
}) => {
  const baseStyles =
    'flex items-center gap-2 rounded-sm font-medium transition-colors duration-fast';

  const variantStyles = {
    primary: `bg-primary text-background hover:bg-primary/90`,
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {isConnected !== undefined && (
        <span className="text-current">
          {isConnected ? <FaRegStopCircle size={16} /> : <FaMicrophone size={16} />}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
