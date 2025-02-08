import { useContext, useEffect, useState } from "react";
import { NewEventContext } from "@contexts";
import { MdOutlineFileUpload } from "react-icons/md";
import { Input } from "./input";

export function FileUpload({ index }: { index: number }) {
  const { formData, setFormData } = useContext(NewEventContext);
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      type: "File Upload",
      file,
    };
    setFormData(updatedFormData);
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input data={question} setData={setQuestion} />
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 gap-2">
        <MdOutlineFileUpload size={24} />
        <span className="text-gray-600 text-sm">Upload File</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      {file && <p className="text-sm text-gray-600">{file.name}</p>}
    </div>
  );
}
