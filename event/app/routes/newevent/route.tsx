import { useState } from "react";
import Layout from "../components/layout";
import Stepper from "./components/stepper";
import FormBuilder from "./subpage/formbuilder";
import GeneralInfo from "./subpage/generalinfo";
import { NewEventContext } from "./context";

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
        className="space-y-6"
      >
        <Stepper />
        {step == 1 && <GeneralInfo />}
        {step == 2 && <FormBuilder />}
      </Layout>
    </NewEventContext.Provider>
  );
}
