import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { NewEventContext } from "@contexts";

export function LongAnswer({ index }: { index: number }) {
  const { formData, setFormData } = useContext(NewEventContext);
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
      <Input data={question} setData={setQuestion} />
      <Input
        placeholder="Long Answer"
        className="text-sm font-normal text-gray-600"
        type="longtext"
        participant={true}
      />
    </div>
  );
}
