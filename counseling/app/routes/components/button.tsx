export default function Button({
  onClick,
  children = "Click Me",
}: {
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-gray-800 border-gray-900 border-2 shadow-md hover:bg-gray-200 rounded-lg transition duration-200"
    >
      {children}
    </button>
  );
}
