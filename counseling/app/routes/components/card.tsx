interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={`bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm ${className}`}
    >
      {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}
