import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Card } from "@components/ui";
import { EventContext } from "@contexts";
import { FormDataElement } from "@types";
import { useContext, useState } from "react";
import {
  FileUpload,
  LongAnswer,
  MultipleChoice,
  Section,
  ShortAnswer,
  Checkbox,
  Date,
} from "@components/formui";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

function RenderComponent(type: FormDataElement, index: number) {
  switch (type.type) {
    case "Section":
      return <Section key={index} index={index} />;
    case "Short Answer":
      return <ShortAnswer key={index} index={index} />;
    case "Long Answer":
      return <LongAnswer key={index} index={index} />;
    case "Multiple Choice":
      return <MultipleChoice key={index} index={index} />;
    case "Checkbox":
      return <Checkbox key={index} index={index} />;
    case "File Upload":
      return <FileUpload key={index} index={index} />;
    case "Date":
      return <Date key={index} index={index} />;
    default:
      return null;
  }
}

export function FormDroppable() {
  const { formData, setFormData } = useContext(EventContext);
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFormData((prev) => {
        const oldindex = formData.findIndex((item) => item.id === active.id);
        const newindex = formData.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldindex, newindex);
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="col-span-7 flex flex-col"
    >
      <Card className="flex-1 space-y-0 border rounded-md overflow-auto max-h-[65vh]">
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={formData.map((item) => item.id)}>
            {formData.map((item, index) => RenderComponent(item, index))}
            {isOver && (
              <div className="p-4">
                <div className="w-full h-16 bg-blue-100 border-blue-400 rounded-lg border-2 border-dashed" />
              </div>
            )}
          </SortableContext>
        </DndContext>
      </Card>
    </div>
  );
}
