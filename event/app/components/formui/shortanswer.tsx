import { Input } from "./input";
import FuLayout from "./fulayout";

export function ShortAnswer({ index }: { index: number }) {
  return (
    <FuLayout index={index}>
      <Input
        placeholder="Short Answer"
        className="text-sm font-normal text-gray-600"
        participant={true}
      />
    </FuLayout>
  );
}
