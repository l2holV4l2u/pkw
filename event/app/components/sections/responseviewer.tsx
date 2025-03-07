import { FormType, PrismaResType } from "@types";

export function ResponseViwer({
  res,
  form,
}: {
  res: PrismaResType;
  form: FormType[];
}) {
  return (
    <div className="w-full text-left p-2">
      <div className="bg-gray-100 rounded-lg text-sm p-2 font-semibold grid grid-cols-4">
        <div>Submitted By</div>
        <div>Submitted At</div>
        {form.map((field, index) => (
          <div key={index}>{field.header}</div>
        ))}
      </div>
      {res.map((response) => (
        <div className="text-sm p-2 grid grid-cols-4">
          <div>{response.name}</div>
          <div>{new Date(response.submittedAt).toLocaleString()}</div>
          {response.responseFields.map((field, index) => (
            <div key={index}>{JSON.stringify(field.value)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
