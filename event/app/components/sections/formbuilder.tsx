import { useContext, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormElement } from "@components/layouts";
import { FormDroppable } from "@components/layouts";
import { NewEventContext } from "@contexts";

export function FormBuilder() {
  const { formData, setFormData } = useContext(NewEventContext);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const blank = {
      type: active.id as string,
    };
    if (over?.id == "FormElementDropArea") {
      let updatedFormData = formData;
      updatedFormData.push(blank);
      setFormData(updatedFormData);
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
      <div className="grid grid-cols-10 gap-4 h-[65vh]">
        <FormDroppable />
        <FormElement isDragging={isDragging} activeID={activeID} />
      </div>
    </DndContext>
  );
}
