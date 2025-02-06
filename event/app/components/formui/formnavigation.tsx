import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { NewEventContext } from "@/contexts";

export function FormNavigation({
  enable,
  className,
}: {
  enable: boolean[];
  className: string;
}) {
  const { step, setStep } = useContext(NewEventContext);
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {enable[0] && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center space-x-2"
        >
          <GoArrowLeft size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
          <div className="text-gray-600 font-semibold text-lg">Previous</div>
        </button>
      )}
      <div className="flex-1" />
      {enable[1] && (
        <button
          onClick={() => setStep(step + 1)}
          className="flex items-center space-x-2"
        >
          <div className="text-gray-600 font-semibold text-lg">Next</div>
          <GoArrowRight size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
        </button>
      )}
    </div>
  );
}
