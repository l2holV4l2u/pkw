import { FormResType, ResSchemaType, ResType } from "@types";
import { prisma } from "./prisma";

export async function getResponseById(id: string) {
  const preres = await prisma.response.findMany({
    where: { eventId: id },
    include: {
      responseFields: {
        select: {
          formFieldId: true,
          value: true,
        },
      },
      user: {
        select: { name: true },
      },
    },
  });
  const res: ResSchemaType = preres.map((subres) => ({
    name: subres.user.name,
    submittedAt: subres.submittedAt,
    responseId: subres.id,
    responseFields: subres.responseFields.map((subsubres) => ({
      ...subsubres,
      value: subsubres.value as ResType,
    })),
  }));

  // field with response
  const fwr = Array.from(
    new Set(
      res.flatMap((subres) =>
        subres.responseFields.map((field) => field.formFieldId)
      )
    )
  );
  return { res, fwr };
}

export async function createResponse(
  res: FormResType,
  event: any,
  userId: string
) {
  const { responseField } = res;
  const formId = event.form.id;
  const eventId = event.id;
  const formFieldIds = event.form.fields.map((field: any) => field.id);
  const response = await prisma.response.create({
    data: {
      eventId,
      formId,
      submittedBy: userId,
    },
  });

  await prisma.responseField.createMany({
    data: responseField.map((field: any, index) => ({
      value: field,
      responseId: response.id,
      formFieldId: formFieldIds[index],
    })),
  });
}
