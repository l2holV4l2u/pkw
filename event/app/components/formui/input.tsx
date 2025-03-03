export function Input({
  placeholder,
  className,
  participant,
  data,
  setData,
  disabled,
}: {
  placeholder?: string;
  className?: string;
  participant?: boolean;
  data?: string;
  setData?: (data: string) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`relative w-full ${
        className ? className : "text-xl font-semibold text-gray-700"
      } ${participant && "border-2 border-border bg-gray-100 p-3 rounded-lg"}`}
    >
      <input
        type="text"
        value={data}
        onChange={
          participant
            ? undefined
            : setData
            ? (e) => setData(e.target.value)
            : undefined
        }
        className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
        disabled={participant || disabled}
      />
      {data === "" && (
        <label
          className={`absolute left-0 top-0 transition-all duration-200 pointer-events-none ${
            participant ? "p-3" : "text-gray-700"
          }`}
        >
          {placeholder ? placeholder : "Question"}
        </label>
      )}
    </div>
  );
}
