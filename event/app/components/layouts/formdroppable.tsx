import { useDroppable } from "@dnd-kit/core";
import { Card } from "@components/ui";
import { NewEventContext } from "@contexts";
import { FormDataElement } from "@types";
import { useContext } from "react";
import {
  FileUpload,
  LongAnswer,
  MultipleChoice,
  Section,
  ShortAnswer,
  Checkbox,
  Date,
} from "@components/formui";

export function FormDroppable() {
  const { formData } = useContext(NewEventContext);
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });
  const renderComponent = (type: FormDataElement, index: number) => {
    switch (type.type) {
      case "Section":
        return <Section key={index} index={index} />;
      case "Short Answer":
        return <ShortAnswer key={index} index={index} />;
      case "Long Answer":
        return <LongAnswer key={index} index={index} />;
      case "Multiple Choice":
        return <MultipleChoice key={index} index={index} />;
      case "Checkbox":
        return <Checkbox key={index} index={index} />;
      case "File Upload":
        return <FileUpload key={index} index={index} />;
      case "Date":
        return <Date key={index} index={index} />;
      default:
        return null;
    }
  };
  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="col-span-7 flex flex-col"
    >
      <Card className="p-4 flex-1 space-y-6 border rounded-md overflow-auto max-h-[65vh]">
        {formData.map((item, index) => (
          <div key={index}>{renderComponent(item, index)}</div>
        ))}
        {isOver && (
          <div className="w-full h-16 bg-blue-100 border-blue-400 rounded-lg border-2 border-dashed" />
        )}
      </Card>
    </div>
  );
}
