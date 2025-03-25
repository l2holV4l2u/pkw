import { EventContext, NewEventContext } from "@contexts";
import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormType } from "@types";
import { RiDraggable } from "react-icons/ri";
import { FaXmark } from "react-icons/fa6";

export default function FuLayout({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { mode, form, setForm } = useContext(EventContext);
  const { focusIndex, setFocusIndex } = useContext(NewEventContext);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: form[index].id,
    });

  return (
    <div
      className="flex hover:bg-slate-100 relative w-full items-center justify-center cursor-pointer"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString({
          x: transform?.x ?? 0,
          y: transform?.y ?? 0,
          scaleX: transform?.scaleX ?? 1,
          scaleY: 1,
        }),
        transition,
      }}
    >
      {mode == 1 && (
        <RiDraggable
          size={28}
          {...listeners}
          {...attributes}
          color="#374151"
          className="focus:outline-none cursor-move m-2 mr-0"
        />
      )}
      <div
        className="p-4 w-full flex flex-col gap-4"
        onClick={() => setFocusIndex(index)}
      >
        <div className="text-xl font-semibold text-gray-700">
          {(form[index] as FormType).header || "Question"}
        </div>
        {children}
      </div>
      {mode == 1 && (
        <FaXmark
          size={20}
          onClick={() => {
            setForm(form.filter((_, i) => i !== index));
            setFocusIndex(focusIndex == index ? null : focusIndex);
          }}
          className="cursor-pointer m-2 ml-0"
          color="#374151"
        />
      )}
    </div>
  );
}
