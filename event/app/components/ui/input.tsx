import React from "react";

interface InputProps {
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "number" | "date" | "url";
}

export function Input({
  field,
  setField,
  label,
  placeholder,
  type,
}: InputProps) {
  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={label.toLowerCase()}
        className="font-semibold text-gray-700"
      >
        {label}
      </label>
      <input
        name={label.toLowerCase().split(" ")[0]}
        type={type}
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl transition"
        placeholder={placeholder}
      />
    </div>
  );
}
