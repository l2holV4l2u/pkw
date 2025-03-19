export function Card({
  children,
  className,
  clickable,
  minicard,
}: {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  minicard?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border-2 border-border shadow-sm space-y-2 relative 
        ${clickable && "transition hover:scale-[1.02]"} 
        ${minicard && "bg-gray-100"} ${className}
    `}
    >
      {children}
    </div>
  );
}
