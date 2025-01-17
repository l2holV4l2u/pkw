import React from "react";

interface InputProps {
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  placeholder?: string;
  longtext?: boolean;
  type: "text" | "password" | "email" | "number" | "date" | "url";
}

export default function Input({
  field,
  setField,
  label,
  placeholder,
  longtext,
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
      {longtext ? (
        <textarea
          id={label.toLowerCase()}
          name={label.toLowerCase().split(" ")[0]}
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl resize-none transition"
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={label.toLowerCase()}
          name={label.toLowerCase().split(" ")[0]}
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl transition"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
