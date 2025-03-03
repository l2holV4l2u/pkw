import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType } from "@types";

export function Checkbox({ index }: { index: number }) {
  const { form, mode } = useContext(EventContext);
  const data = form[index] as FormMCType;
  const [options, setOptions] = useState<string[]>(
    data.choices ? data.choices : []
  );
  const [selected, setSelected] = useState<boolean[]>(
    data.choices ? Array(data.choices.length).fill(false) : []
  );

  useEffect(() => {
    if (mode == 1) {
      (form[index] as FormMCType).choices = options;
    }
  }, [options, selected]);

  return (
    <FuLayout index={index}>
      {options.map((option, subindex) => (
        <div className="flex items-center gap-2" key={subindex}>
          <input type="checkbox" value={option} />
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
            disabled={mode != 1}
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
