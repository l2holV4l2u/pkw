import { Link } from "@remix-run/react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  link?: string;
  minicard?: boolean;
}

const CardContent = ({
  title,
  children,
  className,
  clickable,
  minicard,
}: CardProps) => {
  return (
    <div
      className={`rounded-xl border-2 border-border shadow-sm space-y-2 ${className}  ${
        clickable ? "transform transition-transform hover:scale-[1.01]" : ""
      }
      ${minicard ? "bg-gray-100" : ""}
      `}
    >
      {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
};

export function Card({
  title,
  children,
  className,
  clickable,
  link,
  minicard,
}: CardProps) {
  return (
    <>
      {link ? (
        <Link to={link}>
          <CardContent
            title={title}
            children={children}
            className={className}
            clickable={clickable}
            minicard={minicard}
          />
        </Link>
      ) : (
        <CardContent
          title={title}
          children={children}
          className={className}
          clickable={clickable}
          minicard={minicard}
        />
      )}
    </>
  );
}
