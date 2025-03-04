import { Layout } from "@components/layouts";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormType } from "@types";
import { EventProvider } from "@contexts";
import FormViewer from "@components/sections/formviewer";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      forms: {
        include: { fields: true },
      },
      responses: {
        include: {
          responseFields: {
            include: { formField: true },
          },
          user: true,
        },
      },
    },
  });

  if (!event) {
    throw new Response("Event not found", { status: 404 });
  }

  event.forms = event.forms.map((question) => {
    if (question.fieldOrder) {
      question.fields = question.fieldOrder
        .map((fieldId) => {
          const field = question.fields.find((field) => field.id === fieldId);
          if (
            field &&
            typeof field.value === "object" &&
            field.value !== null
          ) {
            return {
              ...field,
              id: field.id,
              value: { ...field.value, id: field.id },
            };
          }
          return field ? { ...field, id: field.id } : undefined;
        })
        .filter(
          (field): field is (typeof question.fields)[number] =>
            field !== undefined
        );
    }
    return question;
  });

  const form: FormType[] = event.forms[0].fields
    .map((field) => field.value as FormType)
    .filter((field): field is FormType => field !== undefined);

  return { event, form };
}

export default function EventInfo() {
  const { event, form } = useLoaderData<typeof loader>();
  return (
    <EventProvider mode={0} iniForm={form}>
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
