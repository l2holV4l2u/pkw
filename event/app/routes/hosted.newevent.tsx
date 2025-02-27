import { useState } from "react";
import { EventContext } from "../contexts/event";
import { Layout, Stepper } from "@/components/layouts";
import { FormBuilder, GeneralInfo } from "@components/sections";
import { Navigation } from "@/components/layouts";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "@utils/functions/prisma";
import { FormDataElement } from "@types";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const data = JSON.parse(form.get("data") as string);
  const { eventName, description, location, fromDate, toDate, formData } = data;
  try {
    const event = await prisma.event.create({
      data: {
        name: eventName,
        description: description,
        start_date: new Date(fromDate).toISOString(),
        end_date: new Date(toDate).toISOString(),
        registration_deadline: new Date(fromDate).toISOString(),
        location: location,
      },
    });

    const form = await prisma.formQuestion.create({
      data: { event_id: event.id },
    });

    await prisma.formQuestionField.createMany({
      data: formData.map((field: any) => ({
        value: field,
        formQuestionId: form.id,
      })),
    });

    const formQuestionFields = await prisma.formQuestionField.findMany({
      where: { formQuestionId: form.id },
      select: { id: true },
    });

    await prisma.formQuestion.update({
      where: { id: form.id },
      data: { field_order: formQuestionFields.map((field) => field.id) },
    });

    return redirect("/hosted");
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [inProgress, setInProgress] = useState(true);
  const [formData, setFormData] = useState<FormDataElement[]>([]);
  const isEditing = true;

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
        isEditing,
      }}
    >
      <Layout
        label={["Hosted Event", "New Event"]}
        link={["hosted", "newevent"]}
        className="space-y-6 items-center"
      >
        <Stepper />
        {step == 1 && <GeneralInfo />}
        {step == 2 && <FormBuilder />}
        <Navigation />
      </Layout>
    </EventContext.Provider>
  );
}
