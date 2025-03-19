import { useContext } from "react";
import { EventContext, NewEventContext } from "@/contexts";
import { useFetcher } from "@remix-run/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export function Navigation() {
  const { step, setStep, eventName, description, location, fromDate, toDate } =
    useContext(NewEventContext);
  const { form } = useContext(EventContext);
  const fetcher = useFetcher();

  function handleSubmit() {
    const filteredFormData = form.map(
      ({ id, ...rest }: { id: number; [key: string]: any }) => rest
    );
    const data = {
      eventName,
      description,
      location,
      fromDate,
      toDate,
      formData: filteredFormData,
    };
    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  }

  return (
    <div
      className={`flex items-center w-1/2 text-gray-600 gap-1 font-semibold`}
    >
      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex gap-1 items-center"
        >
          <FaArrowLeft size={16} color="#4b5563" /> Previous
        </button>
      )}
      <div className="flex-1" />
      <button
        onClick={() => (step == 2 ? handleSubmit() : setStep(step + 1))}
        className="flex gap-1 items-center"
      >
        {step == 2 ? "Submit" : "Next"}
        <FaArrowRight size={16} color="#4b5563" />
      </button>
    </div>
  );
}
