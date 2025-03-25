import { useContext, useEffect, useState } from "react";
import FuLayout from "./fulayout";
import { EventContext } from "@contexts";
import { ResDateType } from "@types";
import { Input } from "@components/ui";

export function Date({ index }: { index: number }) {
  const { res, setRes, mode } = useContext(EventContext);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (mode == 2) {
      const updatedRes = [...res];
      (updatedRes[index] as ResDateType).date = date;
      setRes(updatedRes);
    }
  }, [date]);

  return (
    <FuLayout index={index}>
      <Input
        data={date}
        setData={() => setDate}
        disabled={mode != 2}
        type="date"
      />
    </FuLayout>
  );
}
