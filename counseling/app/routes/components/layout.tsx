export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="m-2 p-6 space-y-6 bg-white min-h-screen rounded-lg">
      {/* Page Title */}
      <div className="mb-3 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">{title}</h1>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
}
