import FuLayout from "./fulayout";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import { ResQAType } from "@types";
import { Input } from "@components/customui/input";

export function QA({ index, type }: { index: number; type: string }) {
  const { mode, res, setRes } = useContext(EventContext);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (mode == 2) {
      const updatedRes = [...res];
      (updatedRes[index] as ResQAType).answer = answer;
      setRes(updatedRes);
    }
  }, [answer]);

  return (
    <FuLayout index={index}>
      <Input
        data={answer}
        setData={() => setAnswer}
        placeholder={type}
        disabled={mode != 2}
        type={type == "Long Answer" ? "longtext" : "text"}
      />
    </FuLayout>
  );
}
