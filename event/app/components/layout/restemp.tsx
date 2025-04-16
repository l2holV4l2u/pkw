import {
  ResBaseType,
  ResCBType,
  ResDateType,
  ResFileType,
  ResMCType,
  ResQAType,
} from "@types";
import { v4 as uuidv4 } from "uuid";

export default function ResTemp(type: string) {
  const base = {
    id: uuidv4(),
    type,
  } as ResBaseType;

  switch (type) {
    case "Short Answer":
    case "Long Answer":
      return { ...base, answer: "" } as ResQAType;
    case "Multiple Choice":
      return { ...base, choice: -1 } as ResMCType;
    case "Checkbox":
      return { ...base, selected: [] as boolean[] } as ResCBType;
    case "File Upload":
      return { ...base, file: null } as ResFileType;
    case "Date":
      return { ...base, date: "0-0-0" } as ResDateType;
    default:
      return base;
  }
}
