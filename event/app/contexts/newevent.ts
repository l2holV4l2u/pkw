import { FormDataElement } from "@types";
import { createContext, Dispatch, SetStateAction } from "react";

export const NewEventContext = createContext<{
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  fromDate: string;
  setFromDate: Dispatch<SetStateAction<string>>;
  toDate: string;
  setToDate: Dispatch<SetStateAction<string>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  inProgress: boolean;
  setInProgress: Dispatch<SetStateAction<boolean>>;
  formData: FormDataElement[];
  setFormData: Dispatch<SetStateAction<FormDataElement[]>>;
}>({
  eventName: "",
  setEventName: () => {},
  description: "",
  setDescription: () => {},
  location: "",
  setLocation: () => {},
  fromDate: "",
  setFromDate: () => {},
  toDate: "",
  setToDate: () => {},
  step: 0,
  setStep: () => {},
  inProgress: false,
  setInProgress: () => {},
  formData: [],
  setFormData: () => {},
});
