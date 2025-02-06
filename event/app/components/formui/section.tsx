import { useState, useEffect } from "react";
import { FormDataElement } from "../../types/formtype";
import { FormInput } from "./forminput";

export function Section({
  formData,
  setFormData,
  index,
}: {
  formData: FormDataElement[];
  setFormData: (data: FormDataElement[]) => void;
  index: number;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "Section",
      title,
      description,
    };
    setFormData(updatedFormData);
  }, [title, description]);
  return (
    <div className="flex flex-col space-y-2">
      <FormInput
        placeholder="Section title"
        className="text-xl font-semibold text-gray-700"
        type="text"
        data={title}
        setData={setTitle}
      />
      <FormInput
        placeholder="Section description"
        className="text-sm text-gray-600"
        type="text"
        data={description}
        setData={setDescription}
      />
    </div>
  );
}
