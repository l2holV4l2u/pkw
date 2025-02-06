import { useState } from "react";
import { NewEventContext } from "../contexts/newevent";
import { Layout, Stepper } from "@/components/layouts";
import { FormBuilder, GeneralInfo, Preview } from "@components/sections";
import { FormNavigation } from "@/components/formui";

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
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
      <Layout
        label={["Hosted Event", "New Event"]}
        link={["hosted", "newevent"]}
        className="space-y-6 items-center"
      >
        <Stepper />
        {step == 1 && <GeneralInfo />}
        {step == 2 && <FormBuilder />}
        {step == 3 && <Preview />}
        <FormNavigation enable={[step != 1, step != 4]} className="w-[50%]" />
      </Layout>
    </NewEventContext.Provider>
  );
}
