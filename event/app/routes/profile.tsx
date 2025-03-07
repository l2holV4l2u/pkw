import { Layout } from "@components/layouts";
import { Button, Input } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { UserSchemaType } from "@types";
import { prisma } from "@utils/functions/prisma";
import cookie from "cookie";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const id = cookies.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Response("User not found", { status: 404 });
  return { user: JSON.parse(JSON.stringify(user)) as UserSchemaType };
}

export async function action({ request }: LoaderFunctionArgs) {
  const form = await request.formData();
  const data = JSON.parse(form.get("data") as string);
  const { id, formData } = data;
  if (!id) throw new Response("ID not found", { status: 404 });

  await prisma.user.update({
    where: { id },
    data: formData as UserSchemaType,
  });

  return new Response(null, { status: 200 });
}

const fields = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Contact Number", key: "contactNo" },
  { label: "Family Number", key: "familyNo" },
  { label: "School", key: "school" },
  { label: "Thai ID", key: "thaiId" },
];

function ProfileField({ index, formData, setFormData }: any) {
  return (
    <div className="flex justify-between w-full">
      <Input
        field={
          formData[fields[index].key] == "undefined"
            ? "Unknown"
            : formData[fields[index].key]
        }
        setField={(val) =>
          setFormData({ ...formData, [fields[index].key]: val })
        }
        label={fields[index].label}
        type="text"
      />
    </div>
  );
}

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [formData, setFormData] = useState(user);

  const handleSubmit = () => {
    const data = { id: user.id, formData };
    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  };

  return (
    <Layout title="Profile">
      <div className="flex flex-col items-center gap-4">
        <img className="w-32 h-32 rounded-md" />
        <div className="grid grid-cols-2 gap-4 w-[75%]">
          {fields.map((_, index) => (
            <ProfileField
              index={index}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
          <div className="flex flex-col col-span-2 items-end">
            <Button
              content="Save"
              onClick={handleSubmit}
              className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
