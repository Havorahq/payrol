import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

type InputProps = {
  label?: string;
  name: string;
  value?: string;
  type: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  value,
  type,
  placeholder,
  onChange,
  required,
  onKeyUp,
  onKeyDown,
  className,
}) => {
  return (
    <>
      {label && (
        <label className="text-grey-500 text-md font-medium" htmlFor={id}>{label}</label>
      )}
      <input
        className={className}
        name={name}
        value={value}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default Input;
