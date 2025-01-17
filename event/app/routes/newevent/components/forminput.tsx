import { useState } from "react";

export default function FormInput({
  placeholder,
  className,
  longtext,
  participant,
  type,
}: {
  placeholder: string;
  className?: string;
  longtext?: boolean;
  participant?: boolean;
  type: "text" | "password" | "email" | "number" | "date" | "url";
}) {
  const [data, setData] = useState("");
  return (
    <div
      className={`relative w-full  ${className} ${
        participant ? "border-2 border-border bg-gray-100 p-3 rounded-lg" : ""
      }`}
    >
      {longtext ? (
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
        />
      )}
      {data ? null : (
        <label
          className={`absolute left-0 top-0 transition-all duration-200 pointer-events-none ${
            participant ? "p-3" : "text-gray-400"
          }`}
        >
          {placeholder}
        </label>
      )}
    </div>
  );
}
