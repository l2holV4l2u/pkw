import { useState, useEffect, useContext } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { Section } from "@types";

export function Section({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as Section;
  const [title, setTitle] = useState(data.header);
  const [description, setDescription] = useState(data.description);
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Section",
      header: title,
      description,
    };
    setFormData(updatedFormData);
  }, [title, description]);
  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-2">
        <Input
          placeholder="Section title"
          data={title}
          setData={setTitle}
          disabled={!isEditing}
        />
        <Input
          placeholder="Section description"
          className="text-sm text-gray-600"
          data={description}
          setData={setDescription}
          disabled={!isEditing}
        />
      </div>
    </FuLayout>
  );
}
