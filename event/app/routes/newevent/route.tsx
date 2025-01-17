import { useState } from "react";
import Layout from "../components/layout";
import GeneralInfo from "./components/generalinfo";
import Stepper from "./components/stepper";
import FormBuilder from "./formbuilder";

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [inProgress, setInProgress] = useState(true);

  return (
    <Layout title="New Event" className="space-y-6">
      <Stepper step={step} inProgress={inProgress} />
      {step == 1 && (
        <GeneralInfo
          eventName={eventName}
          setEventName={setEventName}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          setStep={setStep}
        />
      )}
      {step == 2 && <FormBuilder setStep={setStep} />}
    </Layout>
  );
}
