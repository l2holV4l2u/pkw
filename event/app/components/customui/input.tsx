import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa6";
import { Toggle } from "./toggle";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { convertDate } from "@utils/functions/misc";

export function Input({
  data,
  setData,
  label,
  placeholder,
  type,
  disabled,
  className,
  variant,
  mode,
}: {
  data?: string | File | boolean | Date;
  setData: (data: string | File | boolean | null | Date) => void;
  label?: string;
  placeholder?: string;
  type?:
    | "longtext"
    | "file"
    | "password"
    | "email"
    | "date"
    | "toggle"
    | "text";
  disabled?: boolean;
  className?: string;
  variant?: "flex" | "grid";
  mode?: string;
}) {
  let inputElement: React.ReactNode;

  switch (type) {
    case "longtext":
      inputElement = (
        <textarea
          value={typeof data === "string" ? data : ""}
          onChange={(e) => setData(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl resize-none transition"
          placeholder={placeholder}
          rows={4}
          disabled={disabled || false}
        />
      );
      break;

    case "file":
      inputElement = (
        <label className="flex flex-col shadow-sm bg-white items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 gap-2">
          <MdOutlineFileUpload size={24} />
          <div className="text-gray-600 text-sm">Upload File</div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setData(e.target.files?.[0] || null)}
            disabled={disabled || false}
          />
        </label>
      );
      break;

    case "toggle":
      inputElement = (
        <Toggle onClick={(val) => setData(val)} enable={data as boolean} />
      );
      break;

    case "date":
      inputElement = (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-between text-left font-normal",
                !data && "text-muted-foreground"
              )}
            >
              {data ? convertDate(data as Date) : placeholder || "Pick a date"}
              <FaRegCalendar size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={data instanceof Date ? data : undefined}
              onSelect={(date) => setData(date || new Date())}
              disabled={disabled || false}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
      break;

    default:
      inputElement = (
        <input
          name={label}
          type={type || "text"}
          value={data as string}
          onChange={(e) => setData(e.target.value)}
          className="w-full text-sm p-2 border-2 shadow-sm border-gray-300 bg-white text-gray-600 rounded-xl transition"
          placeholder={placeholder}
          disabled={disabled || false}
        />
      );
  }

  return (
    <div
      className={`${variant === "grid" ? "grid grid-cols-2" : "flex"} ${
        className?.includes("flex-row") ? "" : "flex-col"
      } w-full gap-2 ${className || ""}`}
    >
      {label && <div className="font-semibold text-gray-700">{label}</div>}
      {mode === "show" ? (
        <div>{data instanceof Date ? convertDate(data) : (data as string)}</div>
      ) : (
        inputElement
      )}
    </div>
  );
}
