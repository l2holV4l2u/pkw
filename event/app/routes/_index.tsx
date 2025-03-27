import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { Layout } from "@/components/layouts";
import { Event } from "@/types/event";
import { EventCard } from "@components/ui";
import { UserSchemaType } from "@types";
import { convertDate } from "@utils/functions";

export async function loader() {
  return prisma.event.findMany();
}

export async function action({ request }: LoaderFunctionArgs) {
  const form = await request.formData();
  const data = JSON.parse(form.get("data") as string);
  const { id, formData } = data;
  if (!id) throw new Response("ID not found", { status: 404 });

  await prisma.user.update({
    where: { id },
    data: formData as UserSchemaType,
  });

  return new Response(null, { status: 200 });
}

export default function Index() {
  const events = useLoaderData<Event[]>();
  return (
    <Layout title="Active Event">
      <div className="grid grid-cols-4 gap-4">
        {events.length === 0 ? (
          <div className="text-gray-500">No active event</div>
        ) : (
          events.map((item) => (
            <EventCard
              event={{
                id: item.id,
                img: null,
                name: item.name,
                description: item.description,
                location: item.location,
                date:
                  convertDate(item.startDate) +
                  " - " +
                  convertDate(item.endDate),
              }}
            />
          ))
        )}
      </div>
    </Layout>
  );
}
