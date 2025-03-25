import { useContext, useEffect, useState } from "react";
import { EventContext, NewEventContext } from "@/contexts";
import { GoDot, GoDotFill } from "react-icons/go";

export function Stepper() {
  const { form } = useContext(EventContext);
  const { step, generalInfo } = useContext(NewEventContext);
  const [inProgress, setInProgress] = useState(false);
  const steps = ["General Info", "Form Builder"];

  useEffect(() => {
    const hasGeneralInfo = Object.values(generalInfo).some((val) => {
      if (typeof val === "string") return val.trim() !== "";
      return val !== null;
    });
    setInProgress(
      (step === 1 && hasGeneralInfo) || (step === 2 && form.length > 0)
    );
  }, [step, generalInfo, form]);

  return (
    <div className="flex items-center justify-center text-gray-700">
      {steps.map((item, index) => (
        <div
          className="flex flex-col relative w-44 h-[52px] items-center"
          key={index}
        >
          {step > index + 1 ? (
            <GoDotFill size={32} color="#3369eb" />
          ) : step == index + 1 ? (
            <GoDot size={32} color="#3369eb" />
          ) : (
            <GoDot size={32} />
          )}
          <div className="absolute top-3.5 left-28">
            {index != steps.length - 1 &&
              (step > index + 1 ? (
                <div className="w-32 h-1 bg-primary-400 rounded-lg" />
              ) : inProgress && step == index + 1 ? (
                <div className="w-32 h-1 bg-gray-400 rounded-lg flex">
                  <div className="w-1/2 h-full bg-primary-400 rounded-lg" />
                  <div className="w-1/2 h-full bg-gray-400 rounded-r-lg" />
                </div>
              ) : (
                <div className="w-32 h-1 bg-gray-400 rounded-lg" />
              ))}
          </div>
          <div
            className={`text-sm ${
              step == index + 1 ? "font-bold" : "font-medium"
            }`}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
