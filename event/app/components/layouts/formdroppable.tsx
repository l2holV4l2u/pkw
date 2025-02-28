import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Card } from "@components/ui";
import { EventContext } from "@contexts";
import { useContext } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import RenderFormComponent from "./renderformcomponent";

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
            {formData.map((item, index) => RenderFormComponent(item, index))}
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
