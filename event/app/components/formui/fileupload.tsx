import { MdOutlineFileUpload } from "react-icons/md";
import FuLayout from "./fulayout";
import { EventContext } from "@contexts";
import { useContext, useEffect, useState } from "react";
import { ResFileType } from "@types";
import { Card } from "@components/ui";

export function FileUpload({ index }: { index: number }) {
  const { setRes, mode } = useContext(EventContext);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (mode == 2) {
      setRes((prev) => {
        const updatedRes = [...prev];
        (updatedRes[index] as ResFileType).file = file;
        return updatedRes;
      });
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
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 gap-2">
          <MdOutlineFileUpload size={24} />
          <div className="text-gray-600 text-sm">Upload File</div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={mode != 2}
          />
        </label>
      )}
    </FuLayout>
  );
}
