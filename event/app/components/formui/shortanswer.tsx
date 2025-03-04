import { Input } from "./input";
import FuLayout from "./fulayout";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import { ResQAType } from "@types";

export function ShortAnswer({ index }: { index: number }) {
  const { mode, setRes } = useContext(EventContext);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (mode == 2) {
      setRes((prev) => {
        const updatedRes = [...prev];
        (updatedRes[index] as ResQAType).answer = answer;
        return updatedRes;
      });
    }
  }, [answer]);

  return (
    <FuLayout index={index}>
      <Input
        data={answer}
        setData={setAnswer}
        placeholder="Short Answer"
        className="text-sm font-normal text-gray-600 bg-gray-100 p-3 rounded-lg"
        disabled={mode != 2}
      />
    </FuLayout>
  );
}
