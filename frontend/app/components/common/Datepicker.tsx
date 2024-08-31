// components/CustomDatePicker.tsx
import React from "react";
// import { DatePicker } from "rsuite";
import DatePicker from "react-datepicker";
// import "rsuite/dist/rsuite.min.css";

interface CustomDatePickerProps {
  label?: string;
  value?: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  // style?: React.CSSProperties;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder,
  minDate,
  // style
}) => {
  return (
    <div style={{ marginBottom: "16px" }} className="overflow-forced z-50">
      {label && (
        <p className="text-grey-500 text-medium text-md mb-1">{label}</p>
      )}
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date ? new Date(date) : null)}
        minDate={minDate}
        placeholderText={placeholder}
        className="w-full border border-gray-300 rounded p-2"
        // style={style}
      />
    </div>
  );
};

export default CustomDatePicker;
