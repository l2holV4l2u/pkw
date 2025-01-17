import FormInput from "./forminput";

export default function Section() {
  return (
    <div className="flex flex-col space-y-2">
      <FormInput
        placeholder="Section title"
        className="text-xl font-semibold text-gray-700"
        type="text"
      />
      <FormInput
        placeholder="Section description"
        className="text-sm text-gray-600"
        type="text"
      />
    </div>
  );
}
