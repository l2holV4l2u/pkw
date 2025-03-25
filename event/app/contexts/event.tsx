import ResTemp from "@components/layouts/restemp";
import { FormType, ResType } from "@types";
import { createContext, useState } from "react";

export const EventContext = createContext<{
  mode: number; // 0 - view, 1 - edit, 2 - response
  setMode?: (mode: number) => void;
  form: FormType[];
  setForm: (form: FormType[]) => void;
  res: ResType[];
  setRes: (res: ResType[]) => void;
  event: any;
}>({
  mode: 0,
  setMode: () => {},
  form: [],
  setForm: () => {},
  res: [],
  setRes: () => {},
  event: {},
});

export function EventProvider({
  children,
  mode,
  setMode,
  formInit,
  eventInit,
}: {
  children: React.ReactNode;
  mode: number;
  setMode?: (mode: number) => void;
  formInit?: FormType[];
  eventInit?: any;
}) {
  const [form, setForm] = useState<FormType[]>(formInit || []);
  const [res, setRes] = useState<ResType[]>(
    form.length != 0 ? form.map((val) => ResTemp(val.type)) : []
  );

  return (
    <EventContext.Provider
      value={{
        form,
        setForm,
        res,
        setRes,
        event: eventInit || {},
        mode,
        setMode: setMode || (() => {}),
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

type GeneralInfoType = {
  eventName: string;
  description: string;
  location: string;
  fromDate: string;
  toDate: string;
  pic: File | null;
};

const defaultGeneralInfo: GeneralInfoType = {
  eventName: "",
  description: "",
  location: "",
  fromDate: "",
  toDate: "",
  pic: null,
};

export const NewEventContext = createContext<{
  generalInfo: GeneralInfoType;
  setGeneralInfo: (generalInfo: GeneralInfoType) => void;
  step: number;
  setStep: (step: number) => void;
  focusIndex: number | null;
  setFocusIndex: (focusIndex: number | null) => void;
}>({
  generalInfo: defaultGeneralInfo,
  setGeneralInfo: () => {},
  step: 1,
  setStep: () => {},
  focusIndex: null,
  setFocusIndex: () => {},
});

export function NewEventProvider({ children }: { children: React.ReactNode }) {
  const [generalInfo, setGeneralInfo] =
    useState<GeneralInfoType>(defaultGeneralInfo);
  const [step, setStep] = useState<number>(1);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  return (
    <NewEventContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        step,
        setStep,
        focusIndex,
        setFocusIndex,
      }}
    >
      {children}
    </NewEventContext.Provider>
  );
}
