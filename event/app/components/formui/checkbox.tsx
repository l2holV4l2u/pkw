import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType, ResCBType } from "@types";
import { FaCheck } from "react-icons/fa";

export function Checkbox({ index }: { index: number }) {
  const { form, setForm, setRes, mode } = useContext(EventContext);
  const data = form[index] as FormMCType;
  const [options, setOptions] = useState<string[]>(
    data.choices ? data.choices : [""]
  );
  const [selected, setSelected] = useState<boolean[]>(
    data.choices ? Array(data.choices.length).fill(false) : [""]
  );

  useEffect(() => {
    if (mode == 1) {
      setForm((prev) => {
        const updatedForm = [...prev];
        (updatedForm[index] as FormMCType).choices = options;
        return updatedForm;
      });
    } else if (mode == 2) {
      setRes((prev) => {
        const updatedRes = [...prev];
        (updatedRes[index] as ResCBType).selected = selected;
        return updatedRes;
      });
    }
  }, [options, selected]);

  return (
    <FuLayout index={index}>
      {options.map((option, subindex) => (
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
          <Input
            placeholder={`Option ${subindex + 1}`}
            className="text-sm font-normal text-gray-600"
            data={option}
            setData={(value) => {
              const newOptions = options.map((o, i) =>
                i === subindex ? value : o
              );
              setOptions(newOptions);
            }}
            disabled={mode == 2}
          />
        </div>
      ))}
      {mode == 1 && (
        <button
          className="flex text-gray-600 items-center gap-2 text-sm"
          onClick={() => setOptions([...options, ""])}
        >
          <GoPlus size={16} />
          Add more option
        </button>
      )}
    </FuLayout>
  );
}
