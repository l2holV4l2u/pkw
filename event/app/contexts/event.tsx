import ResTemp from "@components/layout/restemp";
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
  setEvent: (event: any) => void;
  nav: number;
  setNav: (step: number) => void;
  focusIndex: number | null;
  setFocusIndex: (focusIndex: number | null) => void;
}>({
  mode: 0,
  setMode: () => {},
  form: [],
  setForm: () => {},
  res: [],
  setRes: () => {},
  event: {},
  setEvent: () => {},
  nav: 0,
  setNav: () => {},
  focusIndex: null,
  setFocusIndex: () => {},
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
  const [event, setEvent] = useState(eventInit || {});
  const [res, setRes] = useState<ResType[]>(
    form.length != 0 ? form.map((val) => ResTemp(val.type)) : []
  );
  const [nav, setNav] = useState<number>(1);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  return (
    <EventContext.Provider
      value={{
        form,
        setForm,
        res,
        setRes,
        event,
        setEvent,
        mode,
        setMode: setMode || (() => {}),
        nav,
        setNav,
        focusIndex,
        setFocusIndex,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
