import FuLayout from "./fulayout";
import { EventContext } from "@contexts";
import { useContext, useEffect, useState } from "react";
import { ResFileType } from "@types";
import { Input } from "@components/customui/input";
import { Card } from "@components/customui/card";

export function FileUpload({ index }: { index: number }) {
  const { res, setRes, mode } = useContext(EventContext);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (mode == 2) {
      const updatedRes = [...res];
      (updatedRes[index] as ResFileType).file = file;
      setRes(updatedRes);
    }
  }, [file]);
  return (
    <FuLayout index={index}>
      {file ? (
        <Card className="mt-4 p-4 border rounded-lg bg-gray-100 shadow">
          <div className="text-sm text-gray-700">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </div>
        </Card>
      ) : (
        <Input setData={(data) => setFile(data as File)} type="file" />
      )}
    </FuLayout>
  );
}
