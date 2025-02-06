import { useEffect, useState } from "react";
import { FormInput } from "./forminput";
import { FormDataElement } from "@/types";

export function LongAnswer({
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
      type: "Long Answer",
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
        placeholder="Long Answer"
        className="text-sm font-normal text-gray-600"
        type="longtext"
        participant={true}
      />
    </div>
  );
}
