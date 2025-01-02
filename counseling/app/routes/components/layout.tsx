export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="p-8 space-y-6 w-full">
      {/* Page Title */}
      <div className="mb-3 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
}
