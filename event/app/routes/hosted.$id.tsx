import { Layout } from "@components/layouts";
import { Button, Card, Overlay } from "@components/ui";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { FormType, ResSchemaType, ResType } from "@types";
import { EventContext, EventProvider } from "@contexts";
import { FormBuilder, FormViewer, ResponseViwer } from "@components/sections";
import { useContext, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";

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
  let form: FormType[] = orderedForm.map((field) => field.value as FormType);
  form = form.map((field, index) => ({
    ...field,
    id: tempForm.fieldOrder[index],
  }));

  const preres = await prisma.response.findMany({
    where: { eventId: event.id },
    include: {
      responseFields: true,
      user: true,
    },
  });
  const res: ResSchemaType = preres.map((subres) => {
    return {
      name: subres.user.name,
      responseFields: subres.responseFields.map((field) => {
        return {
          formFieldId: field.formFieldId,
          value: field.value as ResType,
        };
      }),
      submittedAt: subres.submittedAt,
      responseId: subres.id,
    };
  });

  // field with response
  const tempFwr = res.flatMap((subres) =>
    subres.responseFields.map((field) => field.formFieldId)
  );
  const fwr = Array.from(new Set(tempFwr));

  return { event, form, res, fwr };
}

export async function action({ request }: ActionFunctionArgs) {
  const req = await request.formData();
  const data = JSON.parse(req.get("data") as string);
  const formId = data.id as number;
  const formFields = data.form as FormType[];
  try {
    const existingFields = await prisma.formField.findMany({
      where: { formId },
      select: { id: true },
    });
    const existingFieldIds = new Set(existingFields.map((f) => f.id));

    // Create new fields not already in DB
    await Promise.all(
      formFields.map(async (field, index) => {
        if (!existingFieldIds.has(field.id)) {
          const { id, ...filteredField } = field;
          const newField = await prisma.formField.create({
            data: {
              value: filteredField,
              formId,
            },
          });
          formFields[index].id = newField.id;
        }
      })
    );

    // Determine which fields to delete (not in formFields)
    const incomingFieldIds = new Set(formFields.map((f) => f.id));
    const fieldsToDelete = existingFields.filter(
      (field) => !incomingFieldIds.has(field.id)
    );
    fieldsToDelete.map(async (field) => {
      await prisma.responseField.deleteMany({
        where: { formFieldId: field.id },
      });
      await prisma.formField.delete({
        where: { id: field.id },
      });
    });

    // Update field order in form
    await prisma.form.update({
      where: { id: formId },
      data: {
        fieldOrder: formFields.map((f) => f.id),
      },
    });

    return new Response("Form data update successful", { status: 200 });
  } catch (error) {
    console.error("Error updating form data:", error);
    return new Response("Failed to update form data.", { status: 500 });
  }
}

function StatCard({ title, val }: { title: string; val: string }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl">{val}</p>
    </Card>
  );
}

function SaveButton({ setMode }: { setMode: (mode: number) => void }) {
  const { event, fwr } = useLoaderData<typeof loader>();
  const [allExist, setAllExist] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const { form } = useContext(EventContext);

  async function handleSave() {
    const checkExist = fwr.every((id) =>
      form.some((formField) => formField.id === id)
    );
    setAllExist(checkExist);
    console.log(form);
    if ((checkExist || confirm) && event.form) {
      setMode(0);
      try {
        const res = await fetch(window.location.pathname, {
          method: "POST",
          body: (() => {
            const formData = new FormData();
            formData.append(
              "data",
              JSON.stringify({
                id: event.form.id,
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
            <Button
              onClick={() => (setConfirm(true), handleSave())}
              content="Save"
            />
            <Button onClick={() => setAllExist(true)} content="Cancel" />
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
  return (
    <EventProvider mode={mode} setMode={setMode} formInit={form}>
      <Layout
        label={["Hosted Event", event.name]}
        link={["hosted", "/"]}
        className="space-y-6 items-center"
      >
        <div className="grid grid-cols-3 gap-4 w-full font-bold">
          <StatCard title="Total Participants" val={`${res.length}`} />
          <StatCard title="Total Payout" val={`${0}`} />
          <StatCard title="Status" val="Ongoing" />
        </div>
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
          <div className="flex justify-between items-center text-xl font-semibold">
            <div>Response</div>
          </div>
          <ResponseViwer res={res} form={form} />
        </div>
      </Layout>
    </EventProvider>
  );
}
