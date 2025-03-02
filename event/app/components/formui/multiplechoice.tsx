import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoDotFill, GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";
import { FormMCType } from "@types";

export function MultipleChoice({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as FormMCType;
  const [choices, setChoices] = useState<string[]>(
    data.choices ? data.choices : [""]
  );

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      choices,
    };
    setFormData(updatedFormData);
  }, [choices]);

  return (
    <FuLayout index={index}>
      {choices.map((choice, subindex) => (
        <div className="flex items-center gap-2" key={index}>
          <GoDotFill size={16} />
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
            disabled={!isEditing}
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
