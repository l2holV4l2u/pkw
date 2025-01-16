export default function ProgressBar({ step }: { step: number }) {
  const steps = ["General Information", "Make Your Own Form", "Payment"];

  return (
    <div className="flex items-center gap-4 justify-center">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Step Circle */}
          <div
            className={`flex justify-center items-center w-8 h-8 rounded-full font-bold ${
              index + 1 === step
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </div>

          {/* Step Label */}
          <span
            className={`${
              index + 1 === step
                ? "text-green-500 font-medium"
                : "text-gray-700"
            }`}
          >
            {label}
          </span>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 flex-1 ${
                index + 1 < step ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
