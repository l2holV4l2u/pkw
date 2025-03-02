import { Layout } from "@components/layouts";
import RenderFormComponent from "@components/layouts/renderformcomponent";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormDataElement, jsonToFormDataElement } from "@types";
import { EventContext } from "@contexts";
import { useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      formQuestions: {
        include: { fields: true },
      },
      formResponses: {
        include: {
          responseFields: { include: { formQuestionField: true } },
          user: true,
        },
      },
    },
  });
  if (!event) {
    throw new Response("Event not found", { status: 404 });
  }
  event.formQuestions = event.formQuestions.map((question) => {
    if (question.field_order) {
      question.fields = question.field_order
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
  const form: FormDataElement[] = event.formQuestions[0].fields
    .map((field) => jsonToFormDataElement(field.value))
    .filter((field): field is FormDataElement => field !== undefined);
  return { event, form };
}

export default function EventInfo() {
  const { event, form } = useLoaderData<typeof loader>();
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [inProgress, setInProgress] = useState(true);
  const [formData, setFormData] = useState<FormDataElement[]>(form);
  return (
    <EventContext.Provider
      value={{
        eventName,
        setEventName,
        description,
        setDescription,
        location,
        setLocation,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        step,
        setStep,
        inProgress,
        setInProgress,
        formData,
        setFormData,
        isEditing: false,
      }}
    >
      <Layout
        label={["Hosted Event", event.name]}
        link={["hosted", "newevent"]}
        className="space-y-6 items-center"
      >
        {/* Top Stats Cards */}
        <div className="grid grid-cols-3 gap-4 w-full font-bold">
          <Card className="p-4">
            <p className="text-sm text-gray-500">Total Participants</p>
            <p className="text-xl">{event.formResponses.length}</p>
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

        {/* Form Questions */}
        <Card className="p-4 w-full">
          <h2 className="text-xl text-gray-800 font-bold mb-4">Form</h2>
          <Card>
            {form.map((val, index) => RenderFormComponent(val, index))}
          </Card>
        </Card>
        {/* Form Responses */}
        <Card className="p-4 w-full">
          <h2 className="text-xl text-gray-800 font-bold mb-4">Responses</h2>
          <ul>
            {event.formResponses.map((response) => (
              <li key={response.id} className="mb-4">
                <p className="font-semibold">
                  Submitted by: {response.user.full_name}
                </p>
                <p className="text-sm text-gray-500">
                  Submitted at:{" "}
                  {new Date(response.submitted_at).toLocaleString()}
                </p>
                <ul className="mt-2 text-sm">
                  {response.responseFields.map((field) => (
                    <li key={field.id} className="text-gray-700">
                      <p className="font-semibold">
                        Field ID: {field.formQuestionField.id}
                      </p>
                      <pre className="text-gray-600">
                        {JSON.stringify(field.value, null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Card>
      </Layout>
    </EventContext.Provider>
  );
}
