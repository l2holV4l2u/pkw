import { FormType } from "@types";
import { prisma } from "./prisma";

// use event id
export async function getFormById(id: string) {
  const master = await prisma.form.findUnique({ where: { eventId: id } });
  if (!master) return { form: null };

  const fields = await prisma.formField.findMany({
    where: { formId: master.id },
  });

  // Sort fields manually based on fieldOrder
  const form: FormType[] = master.fieldOrder
    .map(
      (fieldId) =>
        fields.find((field) => field.id === fieldId)?.value as FormType
    )
    .filter((field) => field !== undefined);
  return { form };
}

// use form id
export async function updateFormById(id: number, form: FormType[]) {
  const existingFields = await prisma.formField.findMany({
    where: { formId: id },
    select: { id: true },
  });
  const existingFieldIds = new Set(existingFields.map((f) => f.id));

  // Create new fields not already in DB
  await Promise.all(
    form.map(async (field, index) => {
      if (!existingFieldIds.has(field.id)) {
        const { id, ...filteredField } = field;
        const newField = await prisma.formField.create({
          data: {
            value: filteredField,
            formId: id,
          },
        });
        form[index].id = newField.id;
      }
    })
  );

  // Determine which fields to delete (not in formFields)
  const incomingFieldIds = new Set(form.map((f) => f.id));
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
    where: { id },
    data: {
      fieldOrder: form.map((f) => f.id),
    },
  });
}
