import { useDroppable } from "@dnd-kit/core";

export default function FormDroppable() {
  const { setNodeRef } = useDroppable({ id: "formdroppable" });
  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="p-4 border-dashed border-2 rounded-lg border-gray-300 h-full col-span-7"
    >
      <h3 className="text-gray-800 font-semibold">Your Form</h3>
      {/* Render dropped form elements here */}
    </div>
  );
}
