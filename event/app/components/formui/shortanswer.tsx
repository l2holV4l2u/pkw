import { useEffect, useState } from "react";
import { FormInput } from "./forminput";
import { FormDataElement } from "../../types/formtype";

export function ShortAnswer({
  formData,
  setFormData,
  index,
}: {
  formData: FormDataElement[];
  setFormData: (data: FormDataElement[]) => void;
  index: number;
}) {
  const [question, setQuestion] = useState("");
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "Short Answer",
      question,
    };
    setFormData(updatedFormData);
  }, [question]);
  return (
    <div className="flex flex-col space-y-2">
      <FormInput
        placeholder="Question"
        className="text-xl font-semibold text-gray-700"
        type="text"
        data={question}
        setData={setQuestion}
      />
      <FormInput
        placeholder="Short Answer"
        className="text-sm font-normal text-gray-600"
        type="text"
        participant={true}
      />
    </div>
  );
}
