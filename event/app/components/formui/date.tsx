import { useContext, useEffect, useState } from "react";
import { Input } from "./input";
import { EventContext } from "@contexts";
import FuLayout from "./fulayout";

export function Date({ index }: { index: number }) {
  const { formData, setFormData } = useContext(EventContext);
  const [question, setQuestion] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      type: "Date",
      date,
    };
    setFormData(updatedFormData);
  }, [question, date]);

  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-4 ">
        <Input
          data={question}
          setData={setQuestion}
          placeholder="Enter question"
        />
        <input
          type="date"
          className="text-sm font-normal border-none appearance-none focus:outline-none border-2 border-border bg-gray-100 p-3 rounded-lg"
          value={date}
          disabled={true}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </FuLayout>
  );
}
