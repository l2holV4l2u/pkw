import { useContext, useState } from "react";
import { NewEventContext } from "@/contexts";
import { Input, SegmentedControl } from "@/components/ui";

export function GeneralInfo() {
  const { generalInfo, setGeneralInfo } = useContext(NewEventContext);
  const dateOptions = ["Range", "Single"];
  const [dateSelected, setDateSelected] = useState(0);
  return (
    <div className="flex flex-col gap-4 items-start w-[50%]">
      <Input
        data={generalInfo["eventName"]}
        setData={(data) =>
          setGeneralInfo({ ...generalInfo, eventName: data as string })
        }
        label="Name"
        placeholder="Type your event name"
      />
      <Input
        data={generalInfo["description"]}
        setData={(data) =>
          setGeneralInfo({ ...generalInfo, description: data as string })
        }
        label="Description"
        placeholder="How would you describe your event?"
        type="longtext"
      />
      <Input
        data={generalInfo["location"]}
        setData={(data) =>
          setGeneralInfo({ ...generalInfo, location: data as string })
        }
        label="Location"
        placeholder="Where is this taking place?"
      />
      <div className="space-y-2 w-full">
        <div className="font-semibold text-gray-700">Date</div>
        <SegmentedControl
          options={dateOptions}
          setOption={(data) => setDateSelected(data)}
          selected={dateSelected}
        />
        {dateSelected == 1 ? (
          <Input
            data={generalInfo["fromDate"]}
            setData={(data) =>
              setGeneralInfo({ ...generalInfo, fromDate: data as string })
            }
            type="date"
          />
        ) : (
          <div className="flex gap-4">
            <Input
              data={generalInfo["fromDate"]}
              setData={(data) =>
                setGeneralInfo({ ...generalInfo, fromDate: data as string })
              }
              label="From"
              type="date"
            />
            <Input
              data={generalInfo["toDate"]}
              setData={(data) =>
                setGeneralInfo({ ...generalInfo, toDate: data as string })
              }
              label="To"
              type="date"
            />
          </div>
        )}
      </div>
      <Input
        setData={(data) =>
          setGeneralInfo({ ...generalInfo, pic: data as File })
        }
        label="Event Picture"
        type="file"
      />
    </div>
  );
}
