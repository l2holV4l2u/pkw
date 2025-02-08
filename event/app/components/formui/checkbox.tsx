import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { NewEventContext } from "@contexts";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export function Checkbox({ index }: { index: number }) {
  const { formData, setFormData } = useContext(NewEventContext);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "Checkbox",
      choices: options,
    };
    setFormData(updatedFormData);
  }, [question, options]);

  return (
    <div className="flex flex-col space-y-4">
      <Input data={question} setData={setQuestion} />
      {options.map((_, idx) => (
        <div className="flex items-center gap-2" key={idx}>
          <MdOutlineCheckBoxOutlineBlank size={24} color="gray" />
          <Input
            placeholder={`Option ${idx + 1}`}
            className="text-sm font-normal text-gray-600"
            data={options}
            setData={setOptions}
            index={idx}
          />
        </div>
      ))}
      <button
        className="flex text-gray-600 items-center gap-2 text-sm"
        onClick={() => setOptions([...options, ""])}
      >
        <GoPlus size={16} />
        Add more option
      </button>
    </div>
  );
}
