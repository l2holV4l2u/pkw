interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={`rounded-xl border-2 border-gray-200 shadow-sm p-4 space-y-2 ${className}`}
    >
      {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}
