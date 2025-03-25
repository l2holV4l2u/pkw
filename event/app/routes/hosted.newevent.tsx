import { useContext } from "react";
import { EventProvider, NewEventContext, NewEventProvider } from "@/contexts";
import { Layout, Stepper } from "@/components/layouts";
import { FormBuilder, GeneralInfo } from "@components/sections";
import { Navigation } from "@/components/layouts";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "@utils/functions/prisma";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const data = JSON.parse(form.get("data") as string);
  const { eventName, description, location, fromDate, toDate, formData } = data;
  try {
    const event = await prisma.event.create({
      data: {
        name: eventName,
        description: description,
        startDate: new Date(fromDate).toISOString(),
        endDate: new Date(toDate).toISOString(),
        registrationDeadline: new Date(fromDate).toISOString(),
        location: location,
      },
    });

    const form = await prisma.form.create({
      data: { eventId: event.id },
    });

    await prisma.formField.createMany({
      data: formData.map((field: any) => ({
        value: field,
        formId: form.id,
      })),
    });

    const formQuestionFields = await prisma.formField.findMany({
      where: { formId: form.id },
      select: { id: true },
    });

    await prisma.form.update({
      where: { id: form.id },
      data: { fieldOrder: formQuestionFields.map((field) => field.id) },
    });

    return redirect("/hosted");
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

function StepSwitcher() {
  const { step } = useContext(NewEventContext);
  return (
    <>
      {step == 1 && <GeneralInfo />}
      {step == 2 && <FormBuilder />}
    </>
  );
}

export default function NewEvent() {
  return (
    <EventProvider mode={1}>
      <NewEventProvider>
        <Layout
          label={["Hosted Event", "New Event"]}
          link={["hosted", "newevent"]}
          className="space-y-6 items-center"
        >
          <Stepper />
          <StepSwitcher />
          <Navigation />
        </Layout>
      </NewEventProvider>
    </EventProvider>
  );
}
