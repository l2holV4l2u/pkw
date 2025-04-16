import { Layout } from "@components/layout/layout";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FormResType } from "@types";
import { EventProvider } from "@contexts";
import { FormViewer } from "@components/section/formviewer";
import cookie from "cookie";
import { FaLocationDot, FaRegCalendar } from "react-icons/fa6";
import { convertDate } from "@utils/functions/misc";
import { getEventById } from "@utils/functions/event";
import { getFormById } from "@utils/functions/form";
import { createResponse } from "@utils/functions/response";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response("ID not found", { status: 404 });

  const { event } = await getEventById(id);
  if (!event) throw new Response("Event not found", { status: 404 });

  const { form } = await getFormById(event.id);
  if (!form) throw new Response("Form not found", { status: 404 });

  return { event, form };
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const res: FormResType = JSON.parse(data.get("res") as string);
  const event = JSON.parse(data.get("event") as string);
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const userId = cookies.id;
  if (!userId) return new Response("User ID not found", { status: 500 });

  try {
    await createResponse(res, event, userId);
    return new Response("Form submitted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong. Please try again later.", {
      status: 500,
    });
  }
}

export default function EventInfo() {
  const { event, form } = useLoaderData<typeof loader>();
  return (
    <EventProvider mode={2} formInit={form} eventInit={event}>
      <Layout
        label={["Active Event", event.name]}
        link={["home", "/"]}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col w-xl gap-6">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold">{event.name}</div>
            <div>{event.description}</div>
            <div className="flex items-center gap-2 text-sm">
              <FaRegCalendar size={14} />
              {convertDate(event.startDate) +
                " - " +
                convertDate(event.endDate)}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaLocationDot size={14} />
              {event.location}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold">Register</div>
            <FormViewer />
          </div>
        </div>
      </Layout>
    </EventProvider>
  );
}
