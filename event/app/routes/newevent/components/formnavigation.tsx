import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface FormNavProps {
  onClickPrev?: () => void;
  onClickNext?: () => void;
  className?: string;
}

export default function FormNavigation({
  onClickPrev,
  onClickNext,
  className,
}: FormNavProps) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      {onClickPrev && (
        <button onClick={onClickPrev} className="flex items-center space-x-2">
          <GoArrowLeft size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
          <div className="text-gray-600 font-semibold text-lg">Previous</div>
        </button>
      )}
      <div className="flex-1" />
      {onClickNext && (
        <button onClick={onClickNext} className="flex items-center space-x-2">
          <div className="text-gray-600 font-semibold text-lg">Next</div>
          <GoArrowRight size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
        </button>
      )}
    </div>
  );
}
