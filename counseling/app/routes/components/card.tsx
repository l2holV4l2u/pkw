type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      {/* Title Section */}
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      {/* Content Section */}
      <div className="p-6">{children}</div>
    </div>
  );
}
