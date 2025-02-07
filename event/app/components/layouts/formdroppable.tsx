import { useDroppable } from "@dnd-kit/core";
import { Section } from "../formui/section";
import { ShortAnswer } from "../formui/shortanswer";
import { Card } from "@components/ui";
import { LongAnswer } from "../formui/longanswer";
import { MultipleChoice } from "../formui/multiplechoice";
import { FormDataElement } from "../../types/formtype";
import { useContext } from "react";
import { NewEventContext } from "@contexts";

export function FormDroppable() {
  const { formData, setFormData } = useContext(NewEventContext);
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });
  const renderComponent = (type: FormDataElement, index: number) => {
    switch (type.type) {
      case "Section":
        return (
          <Section
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "Short Answer":
        return (
          <ShortAnswer
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "Long Answer":
        return (
          <LongAnswer
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "Multiple Choice":
        return (
          <MultipleChoice
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "Checkbox":
        return (
          <MultipleChoice
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "File Upload":
        return (
          <MultipleChoice
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
      case "Date":
        return (
          <MultipleChoice
            key={index}
            formData={formData}
            setFormData={setFormData}
            index={index}
          />
        );
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
          <div className="w-full h-16 bg-blue-100 border-blue-400 rounded-lg mt-4 border-2 border-dashed" />
        )}
      </Card>
    </div>
  );
}
