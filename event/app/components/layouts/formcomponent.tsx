import {
  FileUpload,
  LongAnswer,
  MultipleChoice,
  Section,
  ShortAnswer,
  Checkbox,
  Date,
} from "@components/formui";

export function FormComponent({
  type,
  index,
}: {
  type: string;
  index: number;
}) {
  switch (type) {
    case "Section":
      return <Section key={index} index={index} />;
    case "Short Answer":
      return <ShortAnswer key={index} index={index} />;
    case "Long Answer":
      return <LongAnswer key={index} index={index} />;
    case "Multiple Choice":
      return <MultipleChoice key={index} index={index} />;
    case "Checkbox":
      return <Checkbox key={index} index={index} />;
    case "File Upload":
      return <FileUpload key={index} index={index} />;
    case "Date":
      return <Date key={index} index={index} />;
    default:
      return null;
  }
}
