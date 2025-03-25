import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType, ResMCType } from "@types";

export function MultipleChoice({ index }: { index: number }) {
  const { form, res, setRes, mode } = useContext(EventContext);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    if (mode == 2) {
      const updatedRes = [...res];
      (updatedRes[index] as ResMCType).choice = selected;
      setRes(updatedRes);
    }
  }, []);

  return (
    <FuLayout index={index}>
      {(form[index] as FormMCType).choices &&
        (form[index] as FormMCType).choices.map((choice, subindex) => (
          <div className="flex items-center gap-2" key={index}>
            <div
              className={`w-4 h-4 border-2 rounded-full cursor-pointer border-gray-400 ${
                selected == subindex && "bg-gray-600 border-none"
              }`}
              onClick={() => setSelected(subindex == selected ? -1 : subindex)}
            />
            <div className="text-sm font-normal text-gray-600">
              {choice || `Choice ${subindex + 1}`}
            </div>
          </div>
        ))}
    </FuLayout>
  );
}
