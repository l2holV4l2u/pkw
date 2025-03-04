import { useContext, useEffect, useState } from "react";
import FuLayout from "./fulayout";
import { EventContext } from "@contexts";
import { ResDateType } from "@types";

export function Date({ index }: { index: number }) {
  const { setRes, mode } = useContext(EventContext);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (mode == 2) {
      setRes((prev) => {
        const updatedRes = [...prev];
        (updatedRes[index] as ResDateType).date = date;
        return updatedRes;
      });
    }
  }, [date]);

  return (
    <FuLayout index={index}>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="text-sm font-normal border-none appearance-none focus:outline-none border-2 border-border bg-gray-100 p-3 rounded-lg"
        disabled={mode != 1}
      />
    </FuLayout>
  );
}
