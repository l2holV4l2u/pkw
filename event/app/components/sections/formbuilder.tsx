import { useContext, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormSidebar } from "@components/layouts";
import { FormDroppable } from "@components/layouts";
import { EventContext } from "@contexts";
import { v4 as uuidv4 } from "uuid";

export function FormBuilder() {
  const { formData, setFormData } = useContext(EventContext);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const blank = {
      id: uuidv4(),
      type: active.id as string,
      header: "",
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
        <FormSidebar isDragging={isDragging} activeID={activeID} />
      </div>
    </DndContext>
  );
}
