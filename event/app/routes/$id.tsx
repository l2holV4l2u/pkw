import { Layout } from "@components/layouts";
import { Card } from "@components/ui";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormResType, FormType } from "@types";
import { EventProvider } from "@contexts";
import FormViewer from "@components/sections/formviewer";
import EventScraper from "@utils/functions/scraper";
import cookie from "cookie";

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

  return { event, form };
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  console.log(data);
  const res: FormResType = JSON.parse(data.get("res") as string);
  const event = JSON.parse(data.get("event") as string);
  console.log(event);
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const userId = cookies.id;
  const { responseField } = res;
  const { formId, eventId, formFieldIds } = EventScraper(event);

  if (!userId) return new Response("User ID not found", { status: 500 });

  try {
    const response = await prisma.response.create({
      data: {
        eventId,
        formId,
        submittedBy: userId,
      },
    });

    await prisma.responseField.createMany({
      data: responseField.map((field: any, index) => ({
        value: field,
        responseId: response.id,
        formFieldId: formFieldIds[index],
      })),
    });

    return new Response("Form submitted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

export default function EventInfo() {
  const { event, form } = useLoaderData<typeof loader>();
  return (
    <EventProvider mode={2} formInit={form} eventInit={event}>
      <Layout
        label={["Active Event", event.name]}
        link={["", "/"]}
        className="space-y-6 items-center"
      >
        <Card className="w-full" title="Form">
          <FormViewer />
        </Card>
      </Layout>
    </EventProvider>
  );
}
