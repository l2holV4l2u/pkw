import { EventContext } from "@contexts";
import { useContext, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FuLayout({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { isEditing, setFormData, formData } = useContext(EventContext);
  const [isHovered, setIsHovered] = useState(false);
  const handleDelete = () => {
    setFormData(formData.filter((_, i) => i !== index));
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: formData[index].id,
    });
  const adjustedTransform = {
    x: transform?.x ?? 0,
    y: transform?.y ?? 0,
    scaleX: transform?.scaleX ?? 1,
    scaleY: 1,
  };
  const style = {
    transform: CSS.Transform.toString(adjustedTransform),
    transition,
    transformOrigin: "0 0",
    willChange: "transform",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {isEditing ? (
        <div
          className="flex hover:bg-gray-100 relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="p-4 w-full">{children}</div>
          {isHovered && (
            <div className="flex flex-col gap-4 p-4">
              <FaRegTrashCan
                size={24}
                onClick={handleDelete}
                className="cursor-pointer"
              />
              <RxDragHandleDots2 size={24} {...listeners} {...attributes} />
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 w-full">{children}</div>
      )}
    </div>
  );
}
