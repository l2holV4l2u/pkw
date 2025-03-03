import { FormType, ResType } from "@types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const EventContext = createContext<{
  form: FormType[];
  res: ResType[];
  mode: number; // 0 - view, 1 - edit, 2 - response
}>({
  form: [],
  res: [],
  mode: 0,
});

export function EventProvider({
  children,
  mode,
}: {
  children: ReactNode;
  mode: number;
}) {
  const form: FormType[] = [],
    res: ResType[] = [];
  return (
    <EventContext.Provider value={{ form, res, mode }}>
      {children}
    </EventContext.Provider>
  );
}

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
});

export function NewEventProvider({
  children,
  step,
  setStep,
}: {
  children: ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [inProgress, setInProgress] = useState(true);
  return (
    <NewEventContext.Provider
      value={{
        eventName,
        setEventName,
        description,
        setDescription,
        location,
        setLocation,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        step,
        setStep,
        inProgress,
        setInProgress,
      }}
    >
      {children}
    </NewEventContext.Provider>
  );
}
