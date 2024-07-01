import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
  disabled?: boolean;
  style?: string;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
  label?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  style,
  onClick,
  primary,
  secondary,
  disabled,
  label,
}) => {
  return (
    <button
      className={`${style} ${primary && "btn-primary"}  ${
        secondary && "btn-secondary"
      } flex items-center justify-center gap-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {label || children}
    </button>
  );
};

export default Button;
