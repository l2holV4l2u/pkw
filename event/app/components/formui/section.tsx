import { useState, useEffect, useContext } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormSectionType } from "@types";

export function Section({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as FormSectionType;
  const [description, setDescription] = useState(
    data.description ? data.description : ""
  );
  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      description,
    };
    setFormData(updatedFormData);
  }, [description]);
  return (
    <FuLayout index={index}>
      <Input
        placeholder="Section description"
        className="text-sm text-gray-600"
        data={description}
        setData={setDescription}
        disabled={!isEditing}
      />
    </FuLayout>
  );
}
