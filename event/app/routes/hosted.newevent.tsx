import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { EventProvider, EventContext } from "@/contexts";
import { useContext } from "react";
import { createEvent } from "@utils/functions/event";
import { GeneralInfo } from "@components/section/generalinfo";
import { FormBuilder } from "@components/section/formbuilder";
import { Layout } from "@components/layout/layout";
import { Stepper } from "@components/layout/stepper";
import { Navigation } from "@components/layout/navigation";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  try {
    await createEvent(JSON.parse(form.get("data") as string));
    return redirect("/hosted");
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

function StepSwitcher() {
  const { nav } = useContext(EventContext);
  return (
    <>
      {nav == 1 && <GeneralInfo variant="flex" />}
      {nav == 2 && <FormBuilder />}
    </>
  );
}

export default function NewEvent() {
  return (
    <EventProvider mode={1}>
      <Layout
        label={["Hosted Event", "New Event"]}
        link={["hosted", "newevent"]}
        className="flex flex-col items-center"
      >
        <Stepper />
        <StepSwitcher />
        <Navigation />
      </Layout>
    </EventProvider>
  );
}
