import React from "react";

interface ButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, disabled }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
