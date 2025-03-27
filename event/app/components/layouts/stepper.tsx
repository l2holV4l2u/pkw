import { useContext, useEffect, useState } from "react";
import { EventContext } from "@/contexts";
import { GoDot, GoDotFill } from "react-icons/go";

export function Stepper() {
  const { form, nav, event } = useContext(EventContext);
  const [inProgress, setInProgress] = useState(false);
  const steps = ["General Info", "Form Builder"];

  return (
    <div className="flex items-center justify-center text-gray-700">
      {steps.map((item, index) => (
        <div
          className="flex flex-col relative w-44 h-[52px] items-center"
          key={index}
        >
          {nav > index + 1 ? (
            <GoDotFill size={32} color="#3369eb" />
          ) : nav == index + 1 ? (
            <GoDot size={32} color="#3369eb" />
          ) : (
            <GoDot size={32} />
          )}
          <div className="absolute top-3.5 left-28">
            {index != steps.length - 1 &&
              (nav > index + 1 ? (
                <div className="w-32 h-1 bg-primary-400 rounded-lg" />
              ) : inProgress && nav == index + 1 ? (
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
              nav == index + 1 ? "font-bold" : "font-medium"
            }`}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
}
