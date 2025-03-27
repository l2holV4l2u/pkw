import { useContext } from "react";
import { EventContext } from "@/contexts";
import { useFetcher } from "@remix-run/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "@components/ui";

export function Navigation() {
  const { event, nav, setNav } = useContext(EventContext);
  const { form } = useContext(EventContext);
  const fetcher = useFetcher();

  function handleSubmit() {
    event.form = form;
    fetcher.submit({ data: JSON.stringify(event) }, { method: "post" });
  }

  return (
    <div className={`flex w-1/2 gap-4 font-semibold`}>
      {nav > 1 && (
        <Button
          onClick={() => setNav(nav - 1)}
          type="bordered"
          clickable={true}
          className="flex gap-1 justify-center text-gray-800 hover:opacity-90 items-center w-full transition-all duration-150"
        >
          <FaArrowLeft size={16} /> Previous
        </Button>
      )}
      <Button
        onClick={() => (nav == 2 ? handleSubmit() : setNav(nav + 1))}
        clickable={true}
        className="flex gap-1 justify-center text-white hover:opacity-90 items-center w-full bg-gradient-to-br from-primary-700 to-primary-500 transition-all duration-150"
      >
        {nav == 2 ? "Submit" : "Next"}
        <FaArrowRight size={16} />
      </Button>
    </div>
  );
}
