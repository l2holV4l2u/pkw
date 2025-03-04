import ResTemp from "@components/layouts/restemp";
import { FormType, ResType } from "@types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const EventContext = createContext<{
  form: FormType[];
  setForm: Dispatch<SetStateAction<FormType[]>>;
  res: ResType[];
  setRes: Dispatch<SetStateAction<ResType[]>>;
  mode: number; // 0 - view, 1 - edit, 2 - response
}>({
  form: [],
  setForm: () => {},
  res: [],
  setRes: () => {},
  mode: 0,
});

export function EventProvider({
  children,
  mode,
  iniForm,
}: {
  children: ReactNode;
  mode: number;
  iniForm?: FormType[];
}) {
  const [form, setForm] = useState<FormType[]>(iniForm || []);
  const [res, setRes] = useState<ResType[]>(
    form.length != 0 ? form.map((val) => ResTemp(val.type)) : []
  );

  return (
    <EventContext.Provider value={{ form, setForm, res, setRes, mode }}>
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
