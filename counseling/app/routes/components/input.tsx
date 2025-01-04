import React from "react";

interface InputProps {
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  type: "text" | "password" | "email" | "number" | "date" | "url";
}

export default function Input({ field, setField, label, type }: InputProps) {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-sm font-semibold text-gray-600"
      >
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        name={label.toLowerCase().split(" ")[0]}
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="w-full p-2 border border-gray-300 bg-white text-gray-500 rounded-md focus:outline-none focus:ring-4 transition focus:ring-blue-200"
        required
      />
    </div>
  );
}
