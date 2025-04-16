import { FormComponent } from "@components/layout/formcomponent";
import { EventContext } from "@contexts";
import { DndContext, DragOverEvent, useDroppable } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Card } from "@components/customui/card";

export function FormViewer() {
  const { form, setForm, event, res, mode } = useContext(EventContext);
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });

  async function handleSubmit() {
    const data = { responseField: res, event };
    await fetch(window.location.pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setForm(
        arrayMove(
          [...form],
          form.findIndex((item) => item.id === active.id),
          form.findIndex((item) => item.id === over.id)
        )
      );
    }
  }

  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="col-span-7 w-full h-full max-h-[60vh]"
    >
      <Card className={`overflow-auto h-full ${mode != 1 && "h-fit"}`}>
        <DndContext
          onDragOver={handleDragOver}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={form.map((item) => item.id)}>
            <div className="flex justify-center">
              <div className="flex flex-col w-full">
                {form.map((val, index) => {
                  return (
                    <>
                      {mode == 1 && index != 0 && (
                        <div className="w-full border-dashed border-2 px-4" />
                      )}
                      <FormComponent type={val.type} index={index} />
                    </>
                  );
                })}
              </div>
            </div>
            {mode == 2 && (
              <div className="w-full p-4 pt-0 text-gray-600 font-semibold flex items-end justify-end">
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center gap-2"
                >
                  Submit <FaArrowRight size={16} color="#4b5563" />
                </button>
              </div>
            )}
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
