import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoDotFill, GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { MultipleChoice } from "@types";

export function MultipleChoice({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as MultipleChoice;
  const [question, setQuestion] = useState(data.header);
  const [choices, setChoices] = useState<string[]>(data.choices);

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Multiple Choice",
      choices,
    };
    setFormData(updatedFormData);
  }, [question, choices]);

  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-4">
        <Input data={question} setData={setQuestion} disabled={!isEditing} />
        {choices.map((_, index) => (
          <div className="flex items-center gap-2" key={index}>
            <GoDotFill size={16} />
            <Input
              placeholder={`Choice ${index + 1}`}
              className="text-sm font-normal text-gray-600"
              data={choices}
              setData={setChoices}
              index={index}
              disabled={!isEditing}
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
    </FuLayout>
  );
}
