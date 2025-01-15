import { useState } from "react";
import Input from "../components/input";
import Layout from "../components/layout";
import Button from "../components/button";
import FormNavigation from "../components/formnavigation";

export default function GeneralInfo() {
  // State to store the form fields
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [step, setStep] = useState(1);

  return (
    <Layout title="New Event">
      <div className="flex flex-col space-y-6 items-center w-full">
        <h2 className="text-gray-700 font-semibold text-xl">
          Step 1 - General Information
        </h2>
        <div className="flex flex-col space-y-4 items-start w-[50%]">
          <Input
            field={eventName}
            setField={setEventName}
            label="Event Name"
            type="text"
            placeholder="Type your event name"
          />
          <Input
            field={description}
            setField={setDescription}
            label="Description"
            type="text"
            longtext={true}
            placeholder="How would you describe your event?"
          />
          <Input
            field={location}
            setField={setLocation}
            label="Location"
            type="text"
            placeholder="Where is this taking place?"
          />
          <div className="flex space-x-4 w-full">
            <Input
              field={fromDate}
              setField={setFromDate}
              label="From"
              type="date"
            />
            <Input field={toDate} setField={setToDate} label="To" type="date" />
          </div>
        </div>
        <FormNavigation
          onClickNext={() => {
            setStep(2);
          }}
          className="w-[50%]"
        />
      </div>
    </Layout>
  );
}
