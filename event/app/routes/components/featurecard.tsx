type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-4xl">{icon}</div>
      <h4 className="mt-4 text-xl font-bold">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
