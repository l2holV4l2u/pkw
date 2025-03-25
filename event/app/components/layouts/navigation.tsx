import { useContext } from "react";
import { EventContext, NewEventContext } from "@/contexts";
import { useFetcher } from "@remix-run/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "@components/ui";

export function Navigation() {
  const { step, setStep, generalInfo } = useContext(NewEventContext);
  const { form } = useContext(EventContext);
  const fetcher = useFetcher();

  function handleSubmit() {
    const data = {
      eventName: generalInfo.eventName,
      description: generalInfo.description,
      location: generalInfo.location,
      fromDate: generalInfo.fromDate,
      toDate: generalInfo.toDate,
      formData: form.map(
        ({ id, ...rest }: { id: number; [key: string]: any }) => rest
      ),
    };
    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  }

  return (
    <div className={`flex w-1/2 gap-4 font-semibold`}>
      {step > 1 && (
        <Button
          onClick={() => setStep(step - 1)}
          type="bordered"
          clickable={true}
          className="flex gap-1 justify-center text-gray-800 hover:opacity-90 items-center w-full transition-all duration-150"
        >
          <FaArrowLeft size={16} /> Previous
        </Button>
      )}
      <Button
        onClick={() => (step == 2 ? handleSubmit() : setStep(step + 1))}
        clickable={true}
        className="flex gap-1 justify-center text-white hover:opacity-90 items-center w-full bg-gradient-to-br from-primary-700 to-primary-500 transition-all duration-150"
      >
        {step == 2 ? "Submit" : "Next"}
        <FaArrowRight size={16} />
      </Button>
    </div>
  );
}
