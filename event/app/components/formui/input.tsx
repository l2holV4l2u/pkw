import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";

export function Input({
  placeholder,
  className,
  participant,
  type,
  data,
  index,
  setData,
}: {
  placeholder?: string;
  className?: string;
  participant?: boolean;
  type?: "longtext" | "choice";
  data?: string | string[];
  index?: number;
  setData?:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<string[]>>;
}) {
  const [temp, setTemp] = useState("");
  const handleUpdateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTemp(e.target.value);
    if (!setData) return;
    if (typeof data === "string") {
      (setData as Dispatch<SetStateAction<string>>)(e.target.value);
    } else if (Array.isArray(data) && index != undefined) {
      const updatedData = [...data];
      updatedData[index] = e.target.value;
      (setData as Dispatch<SetStateAction<string[]>>)(updatedData);
    }
  };
  return (
    <div
      className={`relative w-full ${
        className ? className : "text-xl font-semibold text-gray-700"
      } ${
        participant ? "border-2 border-border bg-gray-100 p-3 rounded-lg" : ""
      }`}
    >
      {type === "longtext" ? (
        <textarea
          value={typeof data === "string" ? data : ""}
          onChange={handleUpdateData}
          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          placeholder={placeholder}
          rows={4}
          disabled={participant ? true : false}
        />
      ) : (
        <input
          type="text"
          value={temp}
          onChange={handleUpdateData}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
          disabled={participant ? true : false}
        />
      )}
      {!temp && (
        <label
          className={`absolute left-0 top-0 transition-all duration-200 pointer-events-none ${
            participant ? "p-3" : "text-gray-400"
          }`}
        >
          {placeholder ? placeholder : "Question"}
        </label>
      )}
    </div>
  );
}
