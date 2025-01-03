interface CardProps {
  title: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}
