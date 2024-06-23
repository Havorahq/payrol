import React from "react";
import styles from "./input.module.scss";

const Input = ({
  label,
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  onKeyUp,
  onKeyDown,
  className,
  disabled,
  height,
  id
}) => {
  return (
    <div className={styles.section}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        style={{ height }}
        className={`formcontrol ${className}`}
        id={id}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
