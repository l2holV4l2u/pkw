import { useContext } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { NewEventContext } from "@/contexts";
import { useFetcher } from "@remix-run/react";

export function Navigation() {
  const {
    step,
    setStep,
    formData,
    eventName,
    description,
    location,
    fromDate,
    toDate,
  } = useContext(NewEventContext);

  const fetcher = useFetcher();

  function handleSubmit() {
    const data = {
      eventName,
      description,
      location,
      fromDate,
      toDate,
      formData,
    };

    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  }

  return (
    <div className={`flex justify-between items-center w-[50%] text-lg`}>
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center space-x-2"
        >
          <GoArrowLeft size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
          <div className="text-gray-600 font-semibold text-lg">Previous</div>
        </button>
      )}
      <div className="flex-1" />
      {step == 2 ? (
        <button
          onClick={() => handleSubmit()}
          className="text-gray-600 font-semibold "
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => setStep(step + 1)}
          className="text-gray-600 font-semibold flex gap-2 items-center"
        >
          Next
        </button>
      )}
      <GoArrowRight size={24} color="#4b5563" style={{ strokeWidth: 1 }} />
    </div>
  );
}
