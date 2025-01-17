import FormInput from "./forminput";

export default function MultipleChoice() {
  return (
    <div className="flex flex-col space-y-2">
      <FormInput
        placeholder="Question"
        className="text-xl font-semibold text-gray-700"
        type="text"
      />
      <FormInput
        placeholder="Short Answer"
        className="text-sm font-normal text-gray-600"
        type="text"
        participant={true}
      />
    </div>
  );
}
