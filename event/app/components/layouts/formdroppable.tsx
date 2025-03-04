import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { Card } from "@components/ui";
import { EventContext } from "@contexts";
import { useContext, useState } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import RenderFormComponent from "./renderformcomponent";

export function FormDroppable() {
  const { form } = useContext(EventContext);
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });
  const [force, setForce] = useState(true);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = form.findIndex((item) => item.id === active.id);
      const newIndex = form.findIndex((item) => item.id === over.id);
      const newForm = arrayMove([...form], oldIndex, newIndex);
      form.length = 0;
      form.push(...newForm);
      setForce(!force);
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
          <SortableContext items={form.map((item) => item.id)}>
            {form.map((item, index) => RenderFormComponent(item, index))}
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
