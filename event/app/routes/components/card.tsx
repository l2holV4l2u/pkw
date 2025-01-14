import { Link } from "@remix-run/react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  link?: string;
}

const CardContent = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
};

export default function Card({
  title,
  children,
  className,
  clickable,
  link,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border-2 border-gray-200 shadow-sm p-4 space-y-2 ${className} ${
        clickable ? "transform transition-transform hover:scale-[1.01]" : ""
      }`}
    >
      {clickable && link ? (
        <Link to={link}>
          <CardContent title={title} children={children} />
        </Link>
      ) : (
        <CardContent title={title} children={children} />
      )}
    </div>
  );
}
