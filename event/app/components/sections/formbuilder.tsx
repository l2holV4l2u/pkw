import { useContext, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { FormSidebar } from "@components/layouts";
import { EventContext } from "@contexts";
import { v4 as uuidv4 } from "uuid";
import { FaArrowRight } from "react-icons/fa6";
import { FormViewer } from "./formviewer";

export function FormBuilder() {
  const { form, event, res, mode } = useContext(EventContext);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over?.id == "FormElementDropArea") {
      form.push({
        id: Math.floor(Math.random() * 1_000_000_000),
        type: active.id as string,
        header: "",
      });
    }
  }

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
      <div
        className={`grid grid-cols-10 gap-4 h-[65vh] ${mode == 1 && "h-fit"}`}
      >
        <FormViewer />
        <FormSidebar isDragging={isDragging} activeID={activeID} />
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
      </div>
    </DndContext>
  );
}
