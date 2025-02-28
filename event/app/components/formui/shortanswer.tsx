import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";

export function ShortAnswer({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const [question, setQuestion] = useState(formData[index].header);
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Short Answer",
      header: question,
    };
    setFormData(updatedFormData);
  }, [question]);
  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-2">
        <Input data={question} setData={setQuestion} disabled={!isEditing} />
        <Input
          placeholder="Short Answer"
          className="text-sm font-normal text-gray-600"
          participant={true}
        />
      </div>
    </FuLayout>
  );
}
