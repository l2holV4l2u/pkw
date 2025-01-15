import { DndContext, DragEndEvent } from "@dnd-kit/core";
import FormElement from "./components/formelements";
import FormDroppable from "./components/formdroppable";
import FormNavigation from "../components/formnavigation";
import { useState } from "react";

export default function FormBuilder({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveID(event.active.id as string);
        setIsDragging(true);
        console.log(event.active.id);
      }}
      onDragEnd={(event) => {
        setIsDragging(false);
        setActiveID(null);
        handleDragEnd(event);
      }}
    >
      <div className="flex flex-col space-y-6 items-center w-full flex-grow">
        <h2 className="text-gray-800 font-semibold text-xl">
          Step 2 - Build Your Own Form
        </h2>
        <div className="grid grid-cols-10 gap-4 w-full h-full">
          <FormElement isDragging={isDragging} activeID={activeID} />
          <FormDroppable />
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
