import { Checkbox } from "@components/formui/checkbox";
import { Date } from "@components/formui/date";
import { FileUpload } from "@components/formui/fileupload";
import { MultipleChoice } from "@components/formui/multiplechoice";
import { QA } from "@components/formui/qa";
import { Section } from "@components/formui/section";

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
