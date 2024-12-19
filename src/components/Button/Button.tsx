import React from 'react';
import './ButtonStyles.css';
import { FaMicrophone, FaRegStopCircle } from 'react-icons/fa';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  isConnected?: boolean;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  children,
  disabled = false,
  isConnected = false,
  size = 'md',
  style,
}) => {
  return (
    <button
      className={`default-button default-button-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {isConnected !== undefined && (
        <span className={`default-button-icon default-button-icon-${size}`}>
          {isConnected ? <FaRegStopCircle /> : <FaMicrophone />}
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
