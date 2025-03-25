import React from "react";

function typeHandler(type: string | undefined) {
  switch (type) {
    case "bordered":
      return "border-2 border-gray-300 shadow-sm";
    default:
      return "";
  }
}

export function Button({
  children,
  onClick,
  className,
  disabled,
  type,
  clickable,
}: {
  link?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "bordered";
  clickable?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} px-4 py-2 rounded-lg shadow-md transition ${
        disabled && "opacity-50 cursor-not-allowed"
      }
      ${clickable && "hover:scale-[1.02] transition-all duration-100"}
      ${typeHandler(type)}
      `}
    >
      {children}
    </button>
  );
}
