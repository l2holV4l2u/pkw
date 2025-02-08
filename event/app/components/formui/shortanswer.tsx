import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { NewEventContext } from "@contexts";

export function ShortAnswer({ index }: { index: number }) {
  const { formData, setFormData } = useContext(NewEventContext);
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
      <Input data={question} setData={setQuestion} />
      <Input
        placeholder="Short Answer"
        className="text-sm font-normal text-gray-600"
        participant={true}
      />
    </div>
  );
}
