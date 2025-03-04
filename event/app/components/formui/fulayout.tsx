import { EventContext } from "@contexts";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "./input";
import { FormType } from "@types";

function Body({
  children,
  header,
  setHeader,
  mode,
}: {
  children: React.ReactNode;
  header: string;
  setHeader: Dispatch<SetStateAction<string>>;
  mode: number;
}) {
  return (
    <div className="p-4 w-full flex flex-col space-y-4">
      <Input data={header} setData={setHeader} disabled={mode != 1} />
      {children}
    </div>
  );
}

export default function FuLayout({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { mode, form, setForm } = useContext(EventContext);
  const [isHovered, setIsHovered] = useState(false);
  const data = form[index] as FormType;
  const [header, setHeader] = useState(data.header ? data.header : "");
  const handleDelete = () => {
    setForm(form.filter((_, i) => i !== index));
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: form[index].id,
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
  };

  useEffect(() => {
    if (mode == 1) {
      setForm((prev) => {
        const updatedForm = [...prev];
        updatedForm[index].header = header;
        return updatedForm;
      });
    }
  }, [header, mode]);

  return (
    <>
      {mode == 1 ? (
        <div
          className="flex hover:bg-gray-50 relative w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={setNodeRef}
          style={style}
        >
          {isHovered && (
            <div className="flex flex-col justify-center p-2 pr-0">
              <RxDragHandleDots2 size={24} {...listeners} {...attributes} />
            </div>
          )}
          <Body
            children={children}
            header={header}
            setHeader={setHeader}
            mode={mode}
          />
          {isHovered && (
            <div className="flex flex-col justify-center p-2 pl-0">
              <FaRegTrashCan
                size={24}
                onClick={handleDelete}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      ) : (
        <Body
          children={children}
          header={header}
          setHeader={setHeader}
          mode={mode}
        />
      )}
    </>
  );
}
