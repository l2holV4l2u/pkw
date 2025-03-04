import { useContext, useEffect, useState } from "react";
import FuLayout from "./fulayout";
import { EventContext } from "@contexts";
import { ResQAType } from "@types";

export function LongAnswer({ index }: { index: number }) {
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
      <div className="flex flex-col space-y-2">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full text-sm placeholder:text-gray-600 bg-gray-100 p-3 rounded-lg focus:ring-0 focus:outline-none"
          placeholder="Long Answer"
          rows={4}
          disabled={mode != 2}
        />
      </div>
    </FuLayout>
  );
}
