import { Link } from "@remix-run/react";

export default function Breadcrumb({
  link,
  label,
}: {
  link: string[];
  label: string[];
}) {
  return (
    <nav className="flex items-start space-x-2 text-gray-800 font-semibold w-full">
      {label.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-600">/</span>}
          <Link
            to={"/" + link[index]}
            className="hover:underline cursor-pointer"
          >
            {item}
          </Link>
        </div>
      ))}
    </nav>
  );
}
