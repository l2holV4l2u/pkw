import { JsonValue } from "@prisma/client/runtime/library";
import {
  FormDataElement,
  Base,
  Section,
  MultipleChoice,
  FileUpload,
  Date,
} from "../formtype";

export function jsonToFormDataElement(json: JsonValue): FormDataElement | null {
  if (typeof json !== "object" || json === null) {
    return null;
  }
  const base = json as Base;
  if (base.id && base.type && base.header) {
    switch (base.type) {
      case "section":
        return json as Section;
      case "multipleChoice":
        return json as MultipleChoice;
      case "fileUpload":
        return json as FileUpload;
      case "date":
        return json as Date;
      default:
        return base;
    }
  }
  return null;
}
