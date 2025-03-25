import { useContext } from "react";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormSectionType } from "@types";

export function Section({ index }: { index: number }) {
  const { form } = useContext(EventContext);

  return (
    <FuLayout index={index}>
      <div className="text-sm text-gray-600">
        {(form[index] as FormSectionType).description || "Section Description"}
      </div>
    </FuLayout>
  );
}
