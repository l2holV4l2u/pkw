import { Layout } from "@components/layouts";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormType, ResSchemaType, ResType } from "@types";
import { EventProvider } from "@contexts";
import { FormViewer, ResponseViwer } from "@components/sections";
import { useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
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

  const preres = await prisma.response.findMany({
    where: { eventId: event.id },
    include: {
      responseFields: true,
      user: true,
    },
  });
  const res: ResSchemaType = preres.map((subres) => {
    return {
      name: subres.user.name,
      responseFields: subres.responseFields.map((field) => {
        return {
          formFieldId: field.formFieldId,
          value: field.value as ResType,
        };
      }),
      submittedAt: subres.submittedAt,
      responseId: subres.id,
    };
  });

  return { event, form, res };
}

function StatCard({ title, val }: { title: string; val: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl">{val}</p>
    </Card>
  );
}

export default function EventInfo() {
  const { event, form, res } = useLoaderData<typeof loader>();
  const [mode, setMode] = useState(0);
  return (
    <EventProvider mode={mode} setMode={setMode} formInit={form}>
      <Layout
        label={["Hosted Event", event.name]}
        link={["hosted", "/"]}
        className="space-y-6 items-center"
      >
        <div className="grid grid-cols-3 gap-4 w-full font-bold">
          <StatCard title="Total Participants" val={`${res.length}`} />
          <StatCard title="Total Payout" val={`${0}`} />
          <StatCard title="Status" val="Ongoing" />
        </div>
        <Card className="w-full" title="Form">
          <FormViewer />
        </Card>
        <Card className="w-full" title="Response">
          <ResponseViwer res={res} form={form} />
        </Card>
      </Layout>
    </EventProvider>
  );
}
