export function Navbar({
  items,
  select,
  setSelect,
}: {
  items: string[];
  select: number;
  setSelect: (d: number) => void;
}) {
  return (
    <nav className="flex gap-8 w-full border-b-[1px] border-gray-300">
      {items.map((item, index) => (
        <div
          onClick={() => setSelect(index)}
          className={`text-gray-700 cursor-pointer font-semibold ${
            select == index && "border-b-[2px] border-primary-500"
          }`}
        >
          {item}
        </div>
      ))}
    </nav>
  );
}
