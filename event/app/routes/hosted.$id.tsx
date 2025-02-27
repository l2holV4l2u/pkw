import { Layout } from "@components/layouts";
import { Card } from "@components/ui";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";

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

  return event;
}

export default function EventInfo() {
  const event = useLoaderData<typeof loader>();

  return (
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
          <p className="text-xl">${event.payout?.toLocaleString() ?? "N/A"}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-xl">Ongoing</p>
        </Card>
      </div>

      {/* Form Questions */}
      <Card className="p-4 w-full">
        <h2 className="text-lg font-bold mb-4">Form Questions</h2>
        <ul>
          {event.formQuestions.map((question) => (
            <li key={question.id} className="mb-2">
              <p className="font-semibold">Question ID: {question.id}</p>
              <pre className="text-sm text-gray-600">
                {JSON.stringify(question.fields, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
      </Card>

      {/* Form Responses */}
      <Card className="p-4 w-full">
        <h2 className="text-lg font-bold mb-4">Form Responses</h2>
        <ul>
          {event.formResponses.map((response) => (
            <li key={response.id} className="mb-4">
              <p className="font-semibold">
                Submitted by: {response.user.full_name}
              </p>
              <p className="text-sm text-gray-500">
                Submitted at: {new Date(response.submitted_at).toLocaleString()}
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
  );
}
