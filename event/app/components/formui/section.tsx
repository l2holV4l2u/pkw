import { useState, useEffect, useContext } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormSectionType } from "@types";

export function Section({ index }: { index: number }) {
  const { form, setForm, mode } = useContext(EventContext);
  const data = form[index] as FormSectionType;
  const [description, setDescription] = useState(
    data.description ? data.description : ""
  );

  useEffect(() => {
    if (mode == 1) {
      setForm((prev) => {
        const updatedForm = [...prev];
        (updatedForm[index] as FormSectionType).description = description;
        return updatedForm;
      });
    }
  }, [description]);

  return (
    <FuLayout index={index}>
      <Input
        placeholder="Section description"
        className="text-sm text-gray-600"
        data={description}
        setData={setDescription}
        disabled={mode != 1}
      />
    </FuLayout>
  );
}
