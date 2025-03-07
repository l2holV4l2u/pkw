import RenderFormComponent from "@components/layouts/renderformcomponent";
import { EventContext } from "@contexts";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";

export function FormViewer() {
  const { form, event, res, mode } = useContext(EventContext);

  async function handleSubmit() {
    const data = { responseField: res, event };
    await fetch(window.location.pathname, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <>
      {form.map((val, index) => RenderFormComponent(val, index))}
      {mode == 2 && (
        <div className="w-full p-4 pt-0 text-gray-600 font-semibold flex items-end justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2"
          >
            Submit <FaArrowRight size={16} color="#4b5563" />
          </button>
        </div>
      )}
    </>
  );
}
