export default function EventScraper(event: any) {
  const formId = event.form.id;
  const eventId = event.id;
  const formFieldIds = event.form.fields.map((field: any) => field.id);
  return { formId, eventId, formFieldIds };
}
