import FormNavigation from "./components/formnavigation";
import Input from "./components/input";

interface GeneralInfoProps {
  eventName: string;
  setEventName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  fromDate: string;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  toDate: string;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function GeneralInfo({
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
  setStep,
}: GeneralInfoProps) {
  // State to store the form fields
  return (
    <div className="flex flex-col space-y-6 items-center w-full">
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
  );
}
