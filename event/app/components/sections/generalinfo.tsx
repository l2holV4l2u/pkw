import { useContext } from "react";
import { NewEventContext } from "@/contexts";
import { Input } from "@/components/ui";

export function GeneralInfo() {
  const {
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
  } = useContext(NewEventContext);
  return (
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
  );
}
