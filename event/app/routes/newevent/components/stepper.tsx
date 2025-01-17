import {
  CheckIcon,
  CreditCardIcon,
  FormIcon,
  InformationCircleIcon,
} from "./formicon";

export default function Stepper({
  step,
  inProgress,
}: {
  step: number;
  inProgress: boolean;
}) {
  const steps = [
    "General Information",
    "Make Your Own Form",
    "Integrate Payment",
  ];
  const stepIcons = [
    <InformationCircleIcon width="32px" height="32px" />,
    <FormIcon width="32px" height="32px" />,
    <CreditCardIcon width="32px" height="32px" />,
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-4 text-gray-700">
        {steps.map((item, index) => (
          <div className="flex flex-col space-y-2 items-start w-fit">
            <div className="flex space-x-4 items-center">
              {step > index + 1 ? <CheckIcon /> : stepIcons[index]}
              {index != steps.length - 1 &&
                (step > index + 1 ? (
                  <div className="w-48 h-2 bg-success rounded-lg" />
                ) : inProgress && step == index + 1 ? (
                  <div className="w-48 h-2 bg-gray-400 rounded-lg flex">
                    <div className="w-1/2 h-full bg-blue-500 rounded-lg" />
                    <div className="w-1/2 h-full bg-gray-400 rounded-r-lg" />
                  </div>
                ) : (
                  <div className="w-48 h-2 bg-gray-400 rounded-lg" />
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
