import { Link, useLocation } from "@remix-run/react";

export function Button({
  link,
  content,
  onClick,
  className,
}: {
  link?: string;
  content: string;
  onClick?: () => void;
  className?: string;
}) {
  const location = useLocation();
  return (
    <Link to={link || location.pathname}>
      <button
        onClick={onClick}
        className={`${className} px-4 py-2 bg-gray-800 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition`}
      >
        {content}
      </button>
    </Link>
  );
}
