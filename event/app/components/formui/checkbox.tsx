import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType, ResCBType } from "@types";
import { FaCheck } from "react-icons/fa";

export function Checkbox({ index }: { index: number }) {
  const { form, res, setRes, mode } = useContext(EventContext);
  const data = form[index] as FormMCType;
  const [selected, setSelected] = useState<boolean[]>(
    data.choices ? Array(data.choices.length).fill(false) : [""]
  );

  useEffect(() => {
    if (mode == 2) {
      const updatedRes = [...res];
      (updatedRes[index] as ResCBType).selected = selected;
      setRes(updatedRes);
    }
  }, [selected]);

  return (
    <FuLayout index={index}>
      {(form[index] as FormMCType).choices.map((option, subindex) => (
        <div className="flex items-center gap-2" key={subindex}>
          <div
            className="w-5 h-5 border-2 rounded-md cursor-pointer border-gray-400 flex items-center justify-center"
            onClick={() =>
              setSelected((prev) => {
                const updatedSelected = [...prev];
                updatedSelected[subindex] = !updatedSelected[subindex];
                return updatedSelected;
              })
            }
          >
            {selected[subindex] && <FaCheck size={12} color="#4b5563" />}
          </div>
          <div className="text-sm font-normal text-gray-600">
            {option || `Option ${subindex + 1}`}
          </div>
        </div>
      ))}
    </FuLayout>
  );
}
