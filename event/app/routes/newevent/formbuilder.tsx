import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import FormElement from "./components/formelement";
import FormDroppable from "./components/formdroppable";
import FormNavigation from "./components/formnavigation";
import { FormDataElement } from "./types/formtype";

export default function FormBuilder({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataElement[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const blank = {
      type: active.id as string,
    };
    if (over?.id == "FormElementDropArea") {
      let updatedFormData = formData;
      updatedFormData.push(blank);
      setFormData(updatedFormData);
      console.log(updatedFormData);
    }
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveID(event.active.id as string);
        setIsDragging(true);
      }}
      onDragEnd={(event) => {
        setIsDragging(false);
        setActiveID(null);
        handleDragEnd(event);
      }}
    >
      <div className="flex flex-col space-y-6 items-center w-full flex-grow">
        <div className="grid grid-cols-10 gap-4 w-full h-full">
          <FormDroppable formData={formData} setFormData={setFormData} />
          <FormElement isDragging={isDragging} activeID={activeID} />
        </div>
        <FormNavigation
          onClickPrev={() => {
            setStep(1);
          }}
          onClickNext={() => {
            setStep(2);
          }}
          className="w-full"
        />
      </div>
    </DndContext>
  );
}
