import { useState, useEffect, useContext } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";

export function Section({ index }: { index: number }) {
  const { formData, setFormData } = useContext(EventContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Section",
      title,
      description,
    };
    setFormData(updatedFormData);
  }, [title, description]);
  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-2">
        <Input placeholder="Section title" data={title} setData={setTitle} />
        <Input
          placeholder="Section description"
          className="text-sm text-gray-600"
          data={description}
          setData={setDescription}
        />
      </div>
    </FuLayout>
  );
}
