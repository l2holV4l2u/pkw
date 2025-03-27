import { useContext } from "react";
import { EventProvider, EventContext } from "@/contexts";
import { Layout, Stepper } from "@/components/layouts";
import { FormBuilder, GeneralInfo } from "@components/sections";
import { Navigation } from "@/components/layouts";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { createEvent } from "@utils/functions";

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
        className="space-y-6 items-center"
      >
        <Stepper />
        <StepSwitcher />
        <Navigation />
      </Layout>
    </EventProvider>
  );
}
