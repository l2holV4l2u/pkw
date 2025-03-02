import { useContext, useEffect, useState } from "react";
import { EventContext } from "@contexts";
import { MdOutlineFileUpload } from "react-icons/md";
import FuLayout from "./fulayout";

export function FileUpload({ index }: { index: number }) {
  return (
    <FuLayout index={index}>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 gap-2">
        <MdOutlineFileUpload size={24} />
        <span className="text-gray-600 text-sm">Upload File</span>
        <input type="file" className="hidden" disabled={true} />
      </label>
    </FuLayout>
  );
}
