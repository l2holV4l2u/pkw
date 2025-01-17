import { useState } from "react";

export default function FormInput({ placeholder }: { placeholder: string }) {
  const [data, setData] = useState("");
  return (
    <div className="relative w-full">
      <input
        type="text"
        id="customInput"
        placeholder=" "
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="peer w-full bg-transparent border-none text-gray-900 placeholder-transparent focus:outline-none focus:ring-0"
      />
      <label
        htmlFor="customInput"
        className="absolute left-0 top-0 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-black"
      >
        {data ? data : placeholder}
      </label>
    </div>
  );
}
