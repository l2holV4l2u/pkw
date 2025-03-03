import { useState, useEffect, useContext } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormSectionType } from "@types";

export function Section({ index }: { index: number }) {
  const { form, mode } = useContext(EventContext);
  const data = form[index] as FormSectionType;
  const [description, setDescription] = useState(
    data.description ? data.description : ""
  );

  useEffect(() => {
    if (mode == 1) {
      (form[index] as FormSectionType).description = description;
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
