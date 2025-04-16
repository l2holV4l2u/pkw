import { Button } from "@components/ui/button";

export function SegmentedControl({
  options,
  selected,
  setSelect,
}: {
  options: string[];
  selected: number;
  setSelect: (option: number) => void;
}) {
  return (
    <div className="flex items-center w-full h-12 gap-2 bg-slate-100 rounded-xl text-sm p-1">
      {options.map((opt, index) => {
        return (
          <div
            onClick={() => setSelect(index)}
            className="flex items-center justify-center w-full h-full cursor-pointer rounded-xl hover:bg-slate-200"
          >
            {selected == index ? (
              <Button
                variant={"outline"}
                className="w-full bg-white h-full font-semibold rounded-xl"
              >
                {opt}
              </Button>
            ) : (
              <div>{opt}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
