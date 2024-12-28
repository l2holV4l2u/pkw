import { useState } from "react";

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-gray-800 font-semibold hover:bg-gray-100"
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}
