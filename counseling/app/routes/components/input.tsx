import React from "react";

interface InputProps {
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  type: "text" | "password" | "email" | "number" | "date" | "url";
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function Input({
  field,
  setField,
  label,
  type,
  onKeyDown,
  placeholder,
  icon,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-semibold text-gray-600"
      >
        {label}
      </label>
      <div className="relative w-full  p-2 border-2 border-gray-200 shadow-sm text-gray-500 rounded-md focus:outline-none focus:ring-4 transition focus:ring-slate-200">
        <input
          type={type}
          id={label.toLowerCase()}
          name={label.toLowerCase().split(" ")[0]}
          value={field}
          onChange={(e) => setField(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-fit truncate bg-white focus:outline-none"
          required
        />
        {icon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
