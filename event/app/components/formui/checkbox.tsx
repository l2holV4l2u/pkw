import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import FuLayout from "./fulayout";

export function Checkbox({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Checkbox",
      choices: options,
    };
    setFormData(updatedFormData);
  }, [question, options]);

  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-4">
        {isEditing ? (
          <Input data={question} setData={setQuestion} />
        ) : (
          <p className="text-lg font-medium">{question}</p>
        )}

        {options.map((option, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <MdOutlineCheckBoxOutlineBlank size={24} color="gray" />
            {isEditing ? (
              <Input
                placeholder={`Option ${idx + 1}`}
                className="text-sm font-normal text-gray-600"
                data={options}
                setData={setOptions}
                index={idx}
              />
            ) : (
              <span className="text-sm text-gray-600">{option}</span>
            )}
          </div>
        ))}

        {isEditing ? (
          <button
            className="flex text-gray-600 items-center gap-2 text-sm"
            onClick={() => setOptions([...options, ""])}
          >
            <GoPlus size={16} />
            Add more option
          </button>
        ) : null}
      </div>
    </FuLayout>
  );
}
