import RenderFormComponent from "@components/layouts/renderformcomponent";
import { EventContext } from "@contexts";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function FormViewer() {
  const { form, event, res, mode } = useContext(EventContext);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "res",
      JSON.stringify({
        responseField: res,
      })
    );
    formData.append("event", JSON.stringify(event));
    try {
      const response = await fetch(window.location.pathname, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Form submitted successfully");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  console.log(event);
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
