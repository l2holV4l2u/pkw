import { LuSettings } from "react-icons/lu";
import { FaEye } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiCheckCircle } from "react-icons/hi";
import { useContext } from "react";
import { NewEventContext } from "../../contexts/newevent";

export function Stepper() {
  const { step, inProgress } = useContext(NewEventContext);
  const steps = ["General Information", "Make Your Own Form"];
  const stepIcons = [
    <IoInformationCircleOutline size={36} color="black" />,
    <FaRegFileAlt size={32} color="black" />,
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-4 text-gray-700">
        {steps.map((item, index) => (
          <div className="flex flex-col space-y-2 items-start w-fit">
            <div className="flex space-x-4 items-center h-[36px]">
              {step > index + 1 ? (
                <HiCheckCircle size={36} color="green" />
              ) : (
                stepIcons[index]
              )}
              {index != steps.length - 1 &&
                (step > index + 1 ? (
                  <div className="w-32 h-2 bg-success rounded-lg" />
                ) : inProgress && step == index + 1 ? (
                  <div className="w-32 h-2 bg-gray-400 rounded-lg flex">
                    <div className="w-1/2 h-full bg-blue-500 rounded-lg" />
                    <div className="w-1/2 h-full bg-gray-400 rounded-r-lg" />
                  </div>
                ) : (
                  <div className="w-32 h-2 bg-gray-400 rounded-lg" />
                ))}
            </div>
            <div className="text-sm">
              Step {index + 1}
              <div className="font-semibold">{item}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
