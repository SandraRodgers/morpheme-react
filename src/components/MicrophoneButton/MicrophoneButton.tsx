import React from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import './MicrophoneButtonStyles.css';

interface MicrophoneButtonProps {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Optional for additional scaling
  isConnected?: boolean;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  onClick,
  className = '',
  children,
  disabled = false,
  size = 'md',
  isConnected = false,
  style = {},
}) => {
  return (
    <button
      className={`microphone-button microphone-button-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span className={`${isConnected ? 'pulse-animation' : ''}`}>
        {isConnected ? <FaStop /> : <FaMicrophone />}
      </span>
      {children}
    </button>
  );
};

export default MicrophoneButton;
