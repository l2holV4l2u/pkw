import { Layout } from "@components/layouts";
import RenderFormComponent from "@components/layouts/renderformcomponent";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormType } from "@types";
import { EventContext } from "@contexts";
import { useState } from "react";

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
  /*
    const response: MultipleResponseType[] = event.responses.map((response) => ({
      id: response.id,
      submittedBy: response.user.fullName,
      submittedAt: response.submittedAt,
      response.responseField
    }));
  */

  return { event, form };
}

export default function EventRegister() {
  const { event, form } = useLoaderData<typeof loader>();
  const [formData, setFormData] = useState<FormType[]>(form);
  const [response, setResponse] = useState<ResponseType[]>([]);
  return (
    <EventContext.Provider
      value={{
        formData,
        setFormData,
        response,
        setResponse,
        mode: 2,
      }}
    >
      <Layout
        label={["Active Event", event.name]}
        link={["", "/"]}
        className="space-y-6 items-center"
      >
        {/* Form Responses */}
        <Card className="w-full" title="Registration Form">
          {form.map((val, index) => RenderFormComponent(val, index))}
        </Card>
      </Layout>
    </EventContext.Provider>
  );
}
