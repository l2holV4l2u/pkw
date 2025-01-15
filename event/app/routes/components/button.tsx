import { Link } from "@remix-run/react";

interface ButtonProps {
  link?: string;
  content: string;
}

export default function Button({ link, content }: ButtonProps) {
  return (
    <>
      {link ? (
        <Link to={link}>
          <button className="px-4 py-2 bg-gray-800 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition">
            {content}
          </button>
        </Link>
      ) : (
        <button className="px-4 py-2 bg-gray-800 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition">
          {content}
        </button>
      )}
    </>
  );
}
