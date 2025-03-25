import {
  FileUpload,
  MultipleChoice,
  Section,
  Checkbox,
  Date,
  QA,
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
    case "Multiple Choice":
      return <MultipleChoice key={index} index={index} />;
    case "Checkbox":
      return <Checkbox key={index} index={index} />;
    case "File Upload":
      return <FileUpload key={index} index={index} />;
    case "Date":
      return <Date key={index} index={index} />;
    default:
      return <QA key={index} index={index} type={type} />;
  }
}
