import {
  FormType,
  ResCBType,
  ResDateType,
  ResFileType,
  ResMCType,
  ResQAType,
  ResSchemaType,
  ResType,
} from "@types";

function ResponseFieldHandler({ val }: { val: ResType }) {
  switch (val.type) {
    case "Short Answer":
      return <div>{(val as ResQAType).answer}</div>;
    case "Check Box":
      return <div>{(val as ResCBType).selected.join(", ")}</div>;
    case "Multiple Choice":
      return <div>{(val as ResMCType).choice}</div>;
    case "File":
      return <div>{(val as ResFileType).file?.name}</div>;
    case "Date":
      return <div>{(val as ResDateType).date.toLocaleDateString()}</div>;
    default:
      return <div>Invalid</div>;
  }
}

export function ResViewer({
  res,
  form,
}: {
  res: ResSchemaType;
  form: FormType[];
}) {
  return (
    <div className="w-full text-left">
      <div className="bg-gray-100 rounded-lg text-sm p-2 font-semibold grid grid-cols-4">
        <div>Submitted By</div>
        <div>Submitted At</div>
        {form.map(
          (field, index) =>
            field.type != "Section" && <div key={index}>{field.header}</div>
        )}
      </div>
      {res.map((response, i) => {
        const dateObj = new Date(response.submittedAt);
        const date = dateObj.toLocaleDateString();
        const time = dateObj.toLocaleTimeString();
        return (
          <div key={i} className="text-sm p-2 grid grid-cols-4">
            <div>{response.name}</div>
            <div>
              <div>{date}</div>
              <div>{time}</div>
            </div>
            {response.responseFields.map(
              (field, index) =>
                field.value.type != "Section" && (
                  <ResponseFieldHandler key={index} val={field.value} />
                )
            )}
          </div>
        );
      })}
    </div>
  );
}
