import { useEffect, useState } from "react";
import { FormDataElement } from "../types/formtype";
import FormInput from "./forminput";
import { GoPlus } from "react-icons/go";

export default function MultipleChoice({
  formData,
  setFormData,
  index,
}: {
  formData: FormDataElement[];
  setFormData: (data: FormDataElement[]) => void;
  index: number;
}) {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "Multiple Choice",
      choices,
    };
    setFormData(updatedFormData);
  }, [question]);
  return (
    <div className="flex flex-col space-y-4">
      <FormInput
        placeholder="Question"
        className="text-xl font-semibold text-gray-700"
        type="text"
        data={question}
        setData={setQuestion}
      />
      {choices.map((_, index) => (
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18" cy="18" r="9" fill="gray" />
          </svg>
          <FormInput
            placeholder={`Choice ${index + 1}`}
            className="text-sm font-normal text-gray-600"
            type="text"
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
