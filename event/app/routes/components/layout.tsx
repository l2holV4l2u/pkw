export default function Layout({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`p-6 space-y-6 h-full bg-white rounded-3xl border-2 border-border`}
    >
      {/* Page Title */}
      <div className="mb-3 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
      </div>

      {/* Main Content */}
      <div className={`${className}`}>{children}</div>
    </div>
  );
}
