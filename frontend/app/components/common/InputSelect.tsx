import { tokenOptions } from "@/plugins/utils";
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

const InputSelect: React.FC<InputProps> = ({
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
    <div className="w-100 flex flex-col">
      {label && (
        <label className="text-grey-500 text-md font-medium mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={`flex items-center ${className} p-0 w-100`}>
        <select
          name="token"
          id="token"
          className="p-3 py-3.5 m-0 border border-gray-300"
          style={{ border: "none", outline: "none" }}
        >
          {tokenOptions?.map((token) => (
            <option value={token.value} key={token.value}>{token.label}</option>
          ))}
        </select>
        <input
          //   className={className}
          name={name}
          value={value}
          type={type}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          style={{ border: "none", outline: "none" }}
        />
      </div>
    </div>
  );
};

export default InputSelect;
