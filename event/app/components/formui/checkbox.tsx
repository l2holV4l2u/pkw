import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { GoPlus } from "react-icons/go";
import { EventContext } from "@contexts";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import FuLayout from "./fulayout";
import { FormMCType } from "@types";

export function Checkbox({ index }: { index: number }) {
  const { formData, setFormData, isEditing } = useContext(EventContext);
  const data = formData[index] as FormMCType;
  const [options, setOptions] = useState<string[]>(
    data.choices ? data.choices : [""]
  );

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      choices: options,
    };
    setFormData(updatedFormData);
  }, [options]);

  return (
    <FuLayout index={index}>
      {options.map((option, subindex) => (
        <div className="flex items-center gap-2" key={subindex}>
          <MdOutlineCheckBoxOutlineBlank size={24} color="gray" />
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
            disabled={!isEditing}
          />
        </div>
      ))}
      {isEditing && (
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
