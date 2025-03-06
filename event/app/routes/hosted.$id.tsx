import { Layout } from "@components/layouts";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormType } from "@types";
import { EventProvider } from "@contexts";
import FormViewer from "@components/sections/formviewer";
import cookie from "cookie";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const userId = cookies.id;
  const { id } = params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      form: {
        include: { fields: true },
      },
    },
  });

  if (!event) throw new Response("Event not found", { status: 404 });
  if (!event.form) throw new Response("Form not found", { status: 404 });

  const tempForm = event.form;
  const orderedForm = tempForm.fieldOrder
    .map((fieldId) => {
      const field = tempForm.fields.find((field) => field.id === fieldId);
      return field ? { value: field.value, id: field.id } : undefined;
    })
    .filter((field) => field !== undefined);
  const form: FormType[] = orderedForm.map((field) => field.value as FormType);

  return { event, form };
}

export default function EventInfo() {
  const { event, form } = useLoaderData<typeof loader>();
  return (
    <EventProvider mode={0} formInit={form}>
      <Layout
        label={["Hosted Event", event.name]}
        link={["hosted", "/"]}
        className="space-y-6 items-center"
      >
        {/* Top Stats Cards */}
        <div className="grid grid-cols-3 gap-4 w-full font-bold">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Participants</p>
            <p className="text-xl">{event.responses.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Payout</p>
            <p className="text-xl">$0</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-xl">Ongoing</p>
          </Card>
        </div>
        <Card className="w-full" title="Form">
          <FormViewer />
        </Card>
      </Layout>
    </EventProvider>
  );
}
