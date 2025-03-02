import FuLayout from "./fulayout";

export function Date({ index }: { index: number }) {
  return (
    <FuLayout index={index}>
      <input
        type="date"
        className="text-sm font-normal border-none appearance-none focus:outline-none border-2 border-border bg-gray-100 p-3 rounded-lg"
        disabled={true}
      />
    </FuLayout>
  );
}
