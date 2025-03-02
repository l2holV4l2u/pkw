import { JsonValue } from "@prisma/client/runtime/library";
import {
  FormType,
  FormSectionType,
  FormMCType,
  BaseFormType,
} from "./formtype";

export function jsonToFormDataElement(json: JsonValue): FormType | null {
  if (typeof json !== "object" || json === null) {
    return null;
  }
  return json as FormType;
}
