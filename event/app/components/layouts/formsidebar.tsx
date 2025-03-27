import { Card, Input, SegmentedControl } from "@/components/ui";
import { FormElementIcon } from "../formui/icon";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  useDraggable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { FormMCType } from "@types";
import { RiDraggable } from "react-icons/ri";

function DraggableItem({ childTitle }: { childTitle: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: childTitle,
  });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} key={childTitle}>
      <Card className="flex flex-col items-center bg-white border-gray-300 gap-2 p-2 h-full text-sm text-gray-600">
        <FormElementIcon
          choice={childTitle.toLowerCase().replace(/\s+/g, "")}
        />
        {childTitle}
      </Card>
    </div>
  );
}

// beware type error
function UpdateData(field: string, index: number) {
  const { form, setForm } = useContext(EventContext);
  return (d: any) => {
    const updatedForm = [...form];
    (updatedForm[index] as any)[field] = d;
    setForm(updatedForm);
  };
}

function InputProp(field: string, index: number) {
  const { form } = useContext(EventContext);
  return {
    data: (form[index] as any)[field],
    setData: UpdateData(field, index),
  };
}

function PropertiesWrapper({
  children,
  label,
  index,
}: {
  children?: React.ReactNode;
  label: string;
  index: number;
}) {
  return (
    <>
      <Input
        {...InputProp("require", index)}
        label={"Require"}
        type="toggle"
        className="flex-row justify-between"
      />
      <Input
        {...InputProp("header", index)}
        label={label}
        placeholder={label}
      />
      {children}
    </>
  );
}

function Properties({ index }: { index: number }) {
  const { form, setForm } = useContext(EventContext);
  switch (form[index].type) {
    case "Section":
      return (
        <PropertiesWrapper label="Header" index={index}>
          <Input
            {...InputProp("description", index)}
            label="Description"
            placeholder="Description"
          />
        </PropertiesWrapper>
      );
    default:
      const checkMC =
        form[index].type == "Multiple Choice" || form[index].type == "Checkbox";
      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
          id: form[index].id,
        });
      function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
          const updatedForm = [...form];
          const choices = (updatedForm[index] as FormMCType).choices;

          const oldIndex = choices.findIndex(
            (_, i) => `choice-${i}` === active.id
          );
          const newIndex = choices.findIndex(
            (_, i) => `choice-${i}` === over.id
          );

          if (oldIndex !== -1 && newIndex !== -1) {
            (updatedForm[index] as FormMCType).choices = arrayMove(
              choices,
              oldIndex,
              newIndex
            );
            setForm(updatedForm);
          }
        }
      }
      switch (checkMC) {
        case true:
          return (
            <PropertiesWrapper label="Question" index={index}>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">
                  {form[index].type == "Multiple Choice"
                    ? "Choices"
                    : "Options"}
                </div>
                <FaPlus
                  className="cursor-pointer"
                  size={14}
                  onClick={() => {
                    const updatedForm = [...form];
                    (updatedForm[index] as any).choices = [
                      ...(updatedForm[index] as any).choices,
                      "",
                    ];
                    setForm(updatedForm);
                  }}
                />
              </div>
              <DndContext
                onDragOver={handleDragOver}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext items={(form[index] as any).choices}>
                  {(form[index] as FormMCType).choices.map(
                    (choice, subindex) => (
                      <div
                        className="flex items-center w-full gap-2"
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
                        <RiDraggable
                          size={28}
                          {...listeners}
                          {...attributes}
                          className="focus:outline-none cursor-move"
                        />
                        <Input
                          data={choice}
                          setData={(d: any) => {
                            const updatedForm = [...form];
                            (updatedForm[index] as any).choices[subindex] = d;
                            setForm(updatedForm);
                          }}
                          placeholder={
                            `${
                              form[index].type == "Multiple Choice"
                                ? "Choice"
                                : "Option"
                            } ` +
                            (subindex + 1)
                          }
                        />
                        <FaXmark
                          size={14}
                          onClick={() => {
                            const updatedForm = [...form];
                            (updatedForm[index] as any).choices = (
                              form[index] as any
                            ).choices.filter(
                              (_: any, i: number) => i !== index
                            );
                            setForm(updatedForm);
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    )
                  )}
                </SortableContext>
              </DndContext>
            </PropertiesWrapper>
          );
        default:
          return <PropertiesWrapper label="Question" index={index} />;
      }
  }
}

export function FormSidebar({
  isDragging,
  activeID,
}: {
  isDragging: boolean;
  activeID: string | null;
}) {
  const [sideMode, setSideMode] = useState(0);
  const { focusIndex } = useContext(EventContext);
  useEffect(() => {
    setSideMode(focusIndex == null ? 0 : 1);
  }, [focusIndex]);
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
    <Card className="w-full h-full col-span-3 p-4 space-y-4 overflow-auto">
      <SegmentedControl
        options={["Elements", "Properties"]}
        selected={sideMode}
        setSelect={setSideMode}
      />
      {sideMode == 1 ? (
        <div className="flex flex-col gap-3">
          {focusIndex != null && <Properties index={focusIndex} />}
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-2 col-span-2 gap-3 ">
            {children.map((childTitle) => (
              <DraggableItem key={childTitle} childTitle={childTitle} />
            ))}
          </div>
          <DragOverlay>
            {isDragging && activeID && (
              <DraggableItem key={activeID} childTitle={activeID} />
            )}
          </DragOverlay>
        </>
      )}
    </Card>
  );
}
