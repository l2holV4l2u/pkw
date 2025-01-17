import { useDraggable, useDroppable } from "@dnd-kit/core";
import Section from "./section";
import ShortAnswer from "./shortanswer";
import Card from "~/routes/components/card";
import LongAnswer from "./longanswer";
import MultipleChoice from "./multiplechoice";

export default function FormDroppable({
  formData,
  setFormData,
}: {
  formData: string[];
  setFormData: React.Dispatch<React.SetStateAction<string[]>>; // The type for setFormData
}) {
  const { setNodeRef, isOver } = useDroppable({ id: "FormElementDropArea" });
  const renderComponent = (type: string, index: number) => {
    switch (type) {
      case "Short Answer":
        return <ShortAnswer key={index} />;
      case "Long Answer":
        return <LongAnswer key={index} />;
      case "Multiple Choice":
        return <MultipleChoice key={index} />;
      case "Section":
        return <Section key={index} />;
      default:
        return null;
    }
  };

  // Handle the deletion of the component from formData
  const handleDelete = (index: number) => {
    setFormData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={setNodeRef}
      onDragOver={(e) => e.preventDefault()}
      className="col-span-7"
    >
      <Card className="p-4 h-full flex flex-col space-y-6">
        {formData.map((item, index) => {
          return <div key={index}>{renderComponent(item, index)}</div>;
        })}
        {isOver && (
          <div className="w-full h-16 bg-blue-100 border-blue-400 rounded-lg mt-4 border-2 border-dashed" />
        )}
      </Card>
    </div>
  );
}
