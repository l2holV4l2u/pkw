import { Card } from "@/components/ui";
import { FormElementIcon } from "../formui/icon";
import { DragOverlay, useDraggable } from "@dnd-kit/core";

function DraggableItem({ childTitle }: { childTitle: string }) {
  const choice = childTitle.toLowerCase().replace(/\s+/g, "");
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: childTitle,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} key={childTitle}>
      <Card
        minicard={true}
        className="flex flex-col items-center gap-2 p-2 h-full text-sm text-gray-600"
      >
        <FormElementIcon choice={choice} />
        {childTitle}
      </Card>
    </div>
  );
}

export function FormSidebar({
  isDragging,
  activeID,
}: {
  isDragging: boolean;
  activeID: string | null;
}) {
  const children = [
    "Section",
    "Short Answer",
    "Long Answer",
    "Multiple Choice",
    "Checkbox",
    "File Upload",
    "Date",
  ];
  return (
    <Card className="w-full h-full col-span-3 p-4">
      <div className="grid grid-cols-2 col-span-2 gap-4 ">
        {children.map((childTitle) => (
          <DraggableItem key={childTitle} childTitle={childTitle} />
        ))}
      </div>
      <DragOverlay>
        {isDragging && activeID ? (
          <Card
            minicard={true}
            className="flex flex-col h-full items-center gap-2 p-2 text-gray-600 text-sm"
            key={activeID}
          >
            <FormElementIcon
              choice={activeID.toLowerCase().replace(/\s+/g, "")}
            />
            {activeID}
          </Card>
        ) : null}
      </DragOverlay>
    </Card>
  );
}
