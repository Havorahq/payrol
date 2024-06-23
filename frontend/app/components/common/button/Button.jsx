import React from 'react'

const Button = ({ label, style, onClick, disabled, fit, secondary }) => {
  return (
    <button
      className={`${style || "btn-primary"} ${fit && "w-fit"} ${
        secondary && "btn-secondary"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label || "Submit"}
    </button>
  );
};

export default Button