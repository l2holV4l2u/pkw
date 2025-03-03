import { Link } from "@remix-run/react";

export function Card({
  title,
  children,
  className,
  clickable,
  link,
  minicard,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  link?: string;
  minicard?: boolean;
}) {
  const CardContent = () => {
    return (
      <div
        className={`rounded-xl border-2 border-border shadow-sm space-y-2 relative 
        ${clickable && "transform transition-transform hover:scale-[1.005]"} 
        ${minicard && "bg-gray-100"} ${className} ${title && "pt-2"}
    `}
      >
        {title && (
          <h3 className="text-xl text-gray-800 font-bold absolute top-[-24px] left-2 bg-white p-2">
            {title}
          </h3>
        )}
        {children}
      </div>
    );
  };
  return (
    <>
      {link ? (
        <Link to={link}>
          <CardContent />
        </Link>
      ) : (
        <CardContent />
      )}
    </>
  );
}
