import { Link } from "@remix-run/react";

export default function Button({ link }: { link: string }) {
  return (
    <Link to={link}>
      <button className="px-4 py-2 bg-blue-600 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
        + New Event
      </button>
    </Link>
  );
}
