import { MdOutlineFileUpload } from "react-icons/md";
import { Toggle } from "./toggle";

export function Input({
  data,
  setData,
  label,
  placeholder,
  type,
  disabled,
  className,
}: {
  data?: string | File | boolean;
  setData: (data: string | File | boolean | null) => void;
  label?: string;
  placeholder?: string;
  type?:
    | "longtext"
    | "file"
    | "password"
    | "email"
    | "date"
    | "toggle"
    | "text";
  disabled?: boolean;
  className?: string;
}) {
  let inputElement: React.ReactNode;
  switch (type) {
    case "longtext":
      inputElement = (
        <textarea
          value={typeof data === "string" ? data : ""}
          onChange={(e) => setData(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl resize-none transition"
          placeholder={placeholder}
          rows={4}
          disabled={disabled || false}
        />
      );
      break;
    case "file":
      inputElement = (
        <label className="flex flex-col shadow-sm bg-white items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 gap-2">
          <MdOutlineFileUpload size={24} />
          <div className="text-gray-600 text-sm">Upload File</div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setData(e.target.files?.[0] || null)}
            disabled={disabled || false}
          />
        </label>
      );
      break;
    case "toggle":
      inputElement = (
        <Toggle onClick={(val) => setData(val)} enable={data as boolean} />
      );
      break;
    default:
      inputElement = (
        <input
          name={label}
          type={type || "text"}
          value={typeof data === "string" ? data : ""}
          onChange={(e) => setData(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl transition"
          placeholder={placeholder}
          disabled={disabled || false}
        />
      );
  }

  return (
    <div
      className={`flex ${
        !className?.includes("flex-row") && "flex-col"
      } w-full gap-2 ${className}`}
    >
      {label && <div className="font-semibold text-gray-700">{label}</div>}
      {inputElement}
    </div>
  );
}
