import { Link, useLocation } from "@remix-run/react";

export function Button({
  link,
  content,
  onClick,
  className,
  disabled,
}: {
  link?: string;
  content: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  const location = useLocation();
  return (
    <Link to={disabled ? "#" : link || location.pathname}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${className} px-4 py-2 bg-gray-800 text-sm text-white font-semibold rounded-lg shadow-md transition ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
      >
        {content}
      </button>
    </Link>
  );
}
