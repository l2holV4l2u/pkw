import { useDraggable, useDroppable } from "@dnd-kit/core";
import Section from "./section";
import ShortAnswer from "./shortanswer";
import Card from "~/routes/components/card";
import LongAnswer from "./longanswer";
import MultipleChoice from "./multiplechoice";
import { FormDataElement } from "../types/formtype";

export default function FormDroppable({
  formData,
  setFormData,
}: {
  formData: FormDataElement[];
  setFormData: React.Dispatch<React.SetStateAction<FormDataElement[]>>; // The type for setFormData
}) {
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
      className="col-span-7  flex flex-col"
    >
      <Card className="p-4 flex-1 overflow-auto space-y-6 border rounded-md">
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
