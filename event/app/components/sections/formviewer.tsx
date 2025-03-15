import RenderFormComponent from "@components/layouts/renderformcomponent";
import { EventContext } from "@contexts";
import { useContext } from "react";
import { FaArrowRight, FaPen } from "react-icons/fa6";
import { HiPencil } from "react-icons/hi";

export function FormViewer() {
  const { form, event, res, mode, setMode } = useContext(EventContext);

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
      <div className="flex justify-center">
        <div className="flex flex-col w-full">
          {form.map((val, index) => {
            return (
              <>
                {mode == 1 && index != 0 && (
                  <div className="w-full border-dashed border-2 px-4" />
                )}
                {RenderFormComponent(val, index)}
              </>
            );
          })}
        </div>
        {mode != 2 && setMode && (
          <div className="flex justify-end px-4">
            <HiPencil
              size={16}
              onClick={() => setMode(mode == 1 ? 0 : 1)}
              className="cursor-pointer"
            />
          </div>
        )}
      </div>
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
