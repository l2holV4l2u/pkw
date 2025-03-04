import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType, ResMCType } from "@types";

export function MultipleChoice({ index }: { index: number }) {
  const { form, setForm, setRes, mode } = useContext(EventContext);
  const data = form[index] as FormMCType;
  const [choices, setChoices] = useState<string[]>(
    data.choices ? data.choices : [""]
  );
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (mode == 1) {
      setForm((prev) => {
        const updatedForm = [...prev];
        (updatedForm[index] as FormMCType).choices = choices;
        return updatedForm;
      });
    } else if (mode == 2) {
      setRes((prev) => {
        const updatedRes = [...prev];
        (updatedRes[index] as ResMCType).choice = selected;
        return updatedRes;
      });
    }
  }, [choices]);

  return (
    <FuLayout index={index}>
      {choices.map((choice, subindex) => (
        <div className="flex items-center gap-2" key={index}>
          <div
            className={`w-4 h-4 border-2 rounded-full cursor-pointer border-gray-400 ${
              selected == subindex && "bg-gray-600 border-none"
            }`}
            onClick={() => setSelected(subindex == selected ? -1 : subindex)}
          />
          <Input
            placeholder={`Choice ${subindex + 1}`}
            className="text-sm font-normal text-gray-600"
            data={choice}
            setData={(value) => {
              const newChoices = choices.map((o, i) =>
                i === subindex ? value : o
              );
              setChoices(newChoices);
            }}
            disabled={mode != 1}
          />
        </div>
      ))}
      <button
        className="flex text-gray-600 items-center gap-2 text-sm"
        onClick={() => setChoices([...choices, ""])}
      >
        <GoPlus size={16} />
        Add more choice
      </button>
    </FuLayout>
  );
}
