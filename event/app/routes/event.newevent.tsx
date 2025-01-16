import { useState } from "react";
import GeneralInfo from "./pagecomponents/generalinfo";
import FormBuilder from "./pagecomponents/formbuilder";
import Layout from "./components/layout";
import ProgressBar from "./pagecomponents/components/progressbar";

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  return (
    <Layout title="New Event" className="space-y-6">
      <ProgressBar step={step} />
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
