export function Toggle({
  enable,
  onClick,
}: {
  enable: boolean;
  onClick: (d: boolean) => void;
}) {
  return (
    <div
      onClick={() => onClick(!enable)}
      className={`w-12 h-6 flex items-center ${
        enable ? "bg-primary-400" : "bg-gray-300"
      } rounded-full p-1 cursor-pointer transition-colors duration-200`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-200 ${
          enable ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </div>
  );
}
