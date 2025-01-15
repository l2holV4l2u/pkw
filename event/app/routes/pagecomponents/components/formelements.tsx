import Card from "~/routes/components/card";
import { FormIcon } from "./formicon";
import { DragOverlay, useDraggable } from "@dnd-kit/core";

const BuilderElement = ({
  children,
  title,
  isDragging,
  activeID,
}: {
  title: string;
  children: string[];
  isDragging: boolean;
  activeID: string | null;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-base text-gray-700">{title}</div>
      <div className="grid grid-cols-2 col-span-2 gap-2 text-sm text-gray-600">
        {children.map((childTitle) => {
          const choice = childTitle.toLowerCase().replace(/\s+/g, "");
          const { attributes, listeners, setNodeRef } = useDraggable({
            id: childTitle,
          });
          return (
            <div ref={setNodeRef} {...listeners} {...attributes}>
              <Card
                minicard={true}
                className="flex items-center gap-2 p-2 h-12"
                key={childTitle}
              >
                <FormIcon choice={choice} />
                {childTitle}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function FormElement({
  isDragging,
  activeID,
}: {
  isDragging: boolean;
  activeID: string | null;
}) {
  return (
    <Card className="w-full h-full col-span-3 p-4">
      <div className="space-y-4">
        <BuilderElement
          title="Layout Elements"
          children={["Section", "Table"]}
          isDragging={isDragging}
          activeID={activeID}
        />
        <BuilderElement
          title="Text Elements"
          children={["Short Answer", "Long Answer"]}
          isDragging={isDragging}
          activeID={activeID}
        />
        <BuilderElement
          title="Multi Elements"
          children={["Multiple Choice", "Checkbox", "Dropdown"]}
          isDragging={isDragging}
          activeID={activeID}
        />
        <BuilderElement
          title="Media Elements"
          children={["File Upload"]}
          isDragging={isDragging}
          activeID={activeID}
        />
        <BuilderElement
          title="Date Elements"
          children={["Date", "Time"]}
          isDragging={isDragging}
          activeID={activeID}
        />
      </div>
      <DragOverlay>
        {isDragging && activeID ? (
          <Card
            minicard={true}
            className="flex items-center gap-2 p-2 h-12 text-gray-600 text-sm"
            key={activeID}
          >
            <FormIcon choice={activeID.toLowerCase().replace(/\s+/g, "")} />
            {activeID}
          </Card>
        ) : null}
      </DragOverlay>
    </Card>
  );
}
