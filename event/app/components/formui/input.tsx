export function Input({
  placeholder,
  className,
  data,
  setData,
  disabled,
}: {
  placeholder?: string;
  className?: string;
  data?: string;
  setData?: (data: string) => void;
  disabled?: boolean;
}) {
  return (
    <div
      className={`relative w-full ${
        className ? className : "text-xl font-semibold text-gray-700"
      }`}
    >
      <input
        type="text"
        value={data}
        onChange={setData ? (e) => setData(e.target.value) : undefined}
        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-600 "
        disabled={disabled}
        placeholder={placeholder ? placeholder : "Question"}
      />
    </div>
  );
}
