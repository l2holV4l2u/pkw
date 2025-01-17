import { useDroppable } from "@dnd-kit/core";
import FormInput from "./forminput";

export default function FormDroppable() {
  const { setNodeRef } = useDroppable({ id: "formdroppable" });
  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="p-4 border-dashed border-2 rounded-lg border-gray-300 h-full col-span-7"
    >
      <FormInput placeholder="Form Title" />
      {/* Render dropped form elements here */}
    </div>
  );
}
