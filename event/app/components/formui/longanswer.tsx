import FuLayout from "./fulayout";

export function LongAnswer({ index }: { index: number }) {
  return (
    <FuLayout index={index}>
      <div className="flex flex-col space-y-2">
        <textarea
          className="w-full bg-transparent border-none focus:ring-0 focus:outline-none"
          placeholder="Long Answer"
          rows={4}
          disabled={true}
        />
      </div>
    </FuLayout>
  );
}
