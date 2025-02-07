import { useState } from "react";
import { NewEventContext } from "../contexts/newevent";
import { Layout, Stepper } from "@/components/layouts";
import { FormBuilder, GeneralInfo, Preview } from "@components/sections";
import { FormNavigation } from "@/components/formui";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "@utils/functions/prisma";
import { FormDataElement } from "@types";

/*
To Add
- registration date
- form builder data
*/
/*
async function action({ request }: ActionFunctionArgs) {
  const { eventName, description, location, fromDate, toDate, formFields } = request.body;
  try {
    const event = await prisma.event.create({
      data: {
        name: eventName,
        description: description,
        start_date: fromDate,
        end_date: toDate,
        registration_deadline: fromDate,
        location: location,
      },
    });
    const form = await prisma.formQuestion.create({
      data: {event_id: event.id}
    })
    const formQuestion = await prisma.formQuestionField.createMany({
      data: [
        formFields.map((field) => {
          return {value: field, formQuestionId: form.id}
        })
      ]
    })
    const order = formQuestion.id;    
    await prisma.formQuestion.update({
      where:{
        id: form.id
      },
      data: {
        field_order: order
      }
    })
    return redirect("/hosted");
  } catch (error) {
    return new Response("Something went wrong. Please try again later.");
  }
}
*/

export default function NewEvent() {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [inProgress, setInProgress] = useState(true);
  const [formData, setFormData] = useState<FormDataElement[]>([]);

  return (
    <NewEventContext.Provider
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
        {step == 3 && <Preview />}
        <FormNavigation enable={[step != 1, step != 4]} className="w-[50%]" />
      </Layout>
    </NewEventContext.Provider>
  );
}
