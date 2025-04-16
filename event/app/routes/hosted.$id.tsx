import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { EventContext, EventProvider } from "@contexts";
import { useLoaderData } from "@remix-run/react";
import { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { FormType } from "@types";
import { Card } from "@components/customui/card";
import { Overlay } from "@components/customui/overlay";
import { Button } from "@components/ui/button";
import { Navbar } from "@components/layout/navbar";
import { GeneralInfo } from "@components/section/generalinfo";
import { FormViewer } from "@components/section/formviewer";
import { FormBuilder } from "@components/section/formbuilder";
import { ResViewer } from "@components/section/responseviewer";
import { Layout } from "@components/layout/layout";
import { getEventById } from "@utils/functions/event";
import { getFormById, updateFormById } from "@utils/functions/form";
import { getResponseById } from "@utils/functions/response";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response("ID not found", { status: 404 });

  const { event } = await getEventById(id);
  if (!event) throw new Response("Event not found", { status: 404 });

  const { form } = await getFormById(event.id);
  if (!form) throw new Response("Form not found", { status: 404 });

  const { res, fwr } = await getResponseById(event.id);
  return { event, form, res, fwr };
}

export async function action({ request }: ActionFunctionArgs) {
  const req = await request.formData();
  const data = JSON.parse(req.get("data") as string);
  try {
    await updateFormById(data.id as number, data.form as FormType[]);
    return new Response("Form data update successful", { status: 200 });
  } catch (error) {
    return new Response("Failed to update form data.", { status: 500 });
  }
}

function StatCard({ title, val }: { title: string; val: string }) {
  return (
    <Card className="p-3">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl">{val}</p>
    </Card>
  );
}

function SaveButton({ setMode }: { setMode: (mode: number) => void }) {
  const { event, form, fwr } = useLoaderData<typeof loader>();
  const [allExist, setAllExist] = useState(true);
  const [confirm, setConfirm] = useState(false);

  async function handleSave() {
    const checkExist = fwr.every((id) =>
      form.some((formField) => formField.id === id)
    );
    setAllExist(checkExist);
    if ((checkExist || confirm) && form) {
      setMode(0);
      try {
        const res = await fetch(window.location.pathname, {
          method: "POST",
          body: (() => {
            const formData = new FormData();
            formData.append(
              "data",
              JSON.stringify({
                id: event.form?.id,
                form,
              })
            );
            return formData;
          })(),
        });
        res.ok
          ? console.log("Form data saved successfully")
          : console.error("Failed to save form data");
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    }
  }
  return (
    <>
      <FiSave size={24} onClick={handleSave} className="cursor-pointer" />
      <Overlay isOpen={!allExist}>
        <div className="flex flex-col gap-4 justify-start">
          <div className="text-xl font-semibold">
            You've deleted some fields that already have responses
          </div>
          <div className="text-base font-medium">
            Are you sure you want to save the form?
          </div>
          <div className="flex gap-4 w-full justify-end">
            <Button onClick={() => (setConfirm(true), handleSave())}>
              Save
            </Button>
            <Button onClick={() => setAllExist(true)}>Cancel</Button>
          </div>
        </div>
      </Overlay>
    </>
  );
}

function CancelButton({
  setMode,
  preForm,
}: {
  setMode: (mode: number) => void;
  preForm: FormType[];
}) {
  const { setForm } = useContext(EventContext);
  function handleCancel() {
    setMode(0);
    setForm(preForm);
  }
  return (
    <FaXmark size={30} onClick={handleCancel} className="cursor-pointer" />
  );
}

export default function EventInfo() {
  const { event, form, res } = useLoaderData<typeof loader>();
  const [mode, setMode] = useState(0);
  const [preForm, setPreForm] = useState<FormType[]>(form);
  const [nav, setNav] = useState(0);
  return (
    <EventProvider
      mode={mode}
      setMode={setMode}
      formInit={form}
      eventInit={event}
    >
      <Layout
        label={["Hosted Event", event.name]}
        link={["hosted", "/"]}
        className="space-y-6 items-center"
      >
        <Navbar
          items={["Overview", "Form", "Setting"]}
          select={nav}
          setSelect={(d: number) => setNav(d)}
        />
        {nav == 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 w-full font-bold">
              <StatCard title="Total Participants" val={`${res.length}`} />
              <StatCard title="Total Payout" val={`${0}`} />
              <StatCard title="Status" val="Ongoing" />
            </div>
            <div className="text-xl font-semibold w-full text-lefts">
              General Info
            </div>
            <GeneralInfo variant="grid" />
          </>
        )}
        {nav == 1 && (
          <>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center text-xl font-semibold">
                <div>Form</div>
                {mode == 0 ? (
                  <FaPen
                    size={18}
                    onClick={() => setMode(1)}
                    className="cursor-pointer"
                  />
                ) : (
                  <div className="flex gap-2 items-center">
                    <SaveButton setMode={setMode} />
                    <CancelButton setMode={setMode} preForm={preForm} />
                  </div>
                )}
              </div>
              {mode == 0 ? <FormViewer /> : <FormBuilder />}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="text-xl font-semibold w-full text-lefts">
                Response
              </div>
              <ResViewer res={res} form={form} />
            </div>
          </>
        )}
      </Layout>
    </EventProvider>
  );
}
