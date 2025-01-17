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
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="2"
            stroke="#4b5563"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            ></path>
          </svg>
          <div className="text-gray-600 font-semibold text-lg">Previous</div>
        </button>
      )}
      <div className="flex-1" />
      {onClickNext && (
        <button onClick={onClickNext} className="flex items-center space-x-2">
          <div className="text-gray-600 font-semibold text-lg">Next</div>
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="2"
            stroke="#4b5563"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
