import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaMicrophone, FaStop } from 'react-icons/fa'; // Add this import

interface MicrophoneButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isConnected?: boolean;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  onClick,
  className = '',
  children,
  disabled = false,
  variant = 'primary',
  size = 'md',
  isConnected = false,
}) => {
  const baseStyles = 'rounded-full';

  const variantStyles = {
    primary: `bg-primary text-background hover:bg-primary/90`,
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
  };

  const sizeStyles = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 24,
  };

  const pulseAnimation = 'animate-pulse';

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
        <span className={`text-current ${isConnected ? pulseAnimation : ''}`}>
          {isConnected ? (
            <FaStop size={iconSizes[size]} />
          ) : (
            <FaMicrophone size={iconSizes[size]} />
          )}
        </span>
      )}
    </button>
  );
};

export default MicrophoneButton;
