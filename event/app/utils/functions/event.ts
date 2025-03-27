import { prisma } from "./prisma";

export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { form: true },
  });
  return { event };
}

export async function getEvents() {
  const events = await prisma.event.findMany();
  return { events };
}

export async function createEvent(data: any) {
  const { eventName, description, location, fromDate, toDate, formData } = data;
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
}
