import { useContext, useState } from "react";
import { EventContext } from "@/contexts";
import { Input, SegmentedControl } from "@/components/ui";

export function GeneralInfo({ variant }: { variant: "grid" | "flex" }) {
  const { event, setEvent, mode } = useContext(EventContext);
  const dateOptions = ["Range", "Single"];
  const [dateSelected, setDateSelected] = useState(0);
  console.log(event);
  return (
    <div
      className={`flex flex-col gap-4 items-start ${
        variant == "grid" ? "w-full" : "w-1/2"
      }`}
    >
      <Input
        data={event["name"]}
        setData={(data) => setEvent({ ...event, name: data as string })}
        label="Name"
        placeholder="Type your event name"
        variant={variant}
        disabled={mode != 1}
      />
      <Input
        data={event["description"]}
        setData={(data) => setEvent({ ...event, description: data as string })}
        label="Description"
        placeholder="How would you describe your event?"
        type="longtext"
        variant={variant}
        disabled={mode != 1}
      />
      <Input
        data={event["location"]}
        setData={(data) => setEvent({ ...event, location: data as string })}
        label="Location"
        placeholder="Where is this taking place?"
        variant={variant}
        disabled={mode != 1}
      />
      <div
        className={`${
          variant == "grid" ? "grid grid-cols-2" : "flex flex-col"
        } w-full gap-2`}
      >
        <div className="font-semibold text-gray-700 row-span-2">Date</div>
        <SegmentedControl
          options={dateOptions}
          selected={dateSelected}
          setSelect={(data) => setDateSelected(data)}
        />
        {dateSelected == 1 ? (
          <Input
            data={event["startDate"] as Date}
            setData={(data) =>
              setEvent({ ...event, startDate: data as string })
            }
            type="date"
            disabled={mode != 1}
          />
        ) : (
          <div className="flex gap-4">
            <Input
              data={event["startDate"] as Date}
              setData={(data) =>
                setEvent({ ...event, startDate: data as string })
              }
              label="Start"
              type="date"
              disabled={mode != 1}
            />
            <Input
              data={event["endDate"] as Date}
              setData={(data) =>
                setEvent({ ...event, endDate: data as string })
              }
              label="End"
              type="date"
              disabled={mode != 1}
            />
          </div>
        )}
      </div>
      <Input
        data={event["regist"]}
        setData={(data) => setEvent({ ...event, registDL: data as string })}
        label="Registration Deadline"
        type="date"
        variant={variant}
        disabled={mode != 1}
      />
      <Input
        setData={(data) => setEvent({ ...event, pic: data as string })}
        label="Event Picture"
        type="file"
        variant={variant}
        disabled={mode != 1}
      />
    </div>
  );
}
