import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoDotFill, GoPlus } from "react-icons/go";
import { NewEventContext } from "@contexts";

export function MultipleChoice({ index }: { index: number }) {
  const { formData, setFormData } = useContext(NewEventContext);
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<string[]>([]);

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "Multiple Choice",
      choices,
    };
    setFormData(updatedFormData);
  }, [question, choices]);

  return (
    <div className="flex flex-col space-y-4">
      <Input data={question} setData={setQuestion} />
      {choices.map((_, index) => (
        <div className="flex items-center gap-2" key={index}>
          <GoDotFill size={16} />
          <Input
            placeholder={`Choice ${index + 1}`}
            className="text-sm font-normal text-gray-600"
            data={choices}
            setData={setChoices}
            index={index}
          />
        </div>
      ))}
      <button
        className="flex text-gray-600 items-center gap-2 text-sm"
        onClick={() => setChoices([...choices, ""])}
      >
        <GoPlus size={16} />
        Add more choice
      </button>
    </div>
  );
}
