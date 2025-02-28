import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import FuLayout from "./fulayout";
import { MultipleChoice } from "@types";

export function Checkbox({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as MultipleChoice;
  const [question, setQuestion] = useState(data.header);
  const [options, setOptions] = useState<string[]>(data.choices);
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      header: question,
      type: "Checkbox",
      choices: options,
    };
    setFormData(updatedFormData);
  }, [question, options]);

  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-4">
        <Input data={question} setData={setQuestion} disabled={!isEditing} />
        {options.map((option, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <MdOutlineCheckBoxOutlineBlank size={24} color="gray" />
            <Input
              placeholder={`Option ${idx + 1}`}
              className="text-sm font-normal text-gray-600"
              data={option}
              setData={setOptions}
              index={idx}
              disabled={!isEditing}
            />
          </div>
        ))}
        {isEditing && (
          <button
            className="flex text-gray-600 items-center gap-2 text-sm"
            onClick={() => setOptions([...options, ""])}
          >
            <GoPlus size={16} />
            Add more option
          </button>
        )}
      </div>
    </FuLayout>
  );
}
