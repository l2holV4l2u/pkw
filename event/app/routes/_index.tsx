import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { Layout } from "@/components/layouts";
import { Event } from "@/types/event";
import { EventCard } from "@components/ui";

export async function loader() {
  return prisma.event.findMany();
}

function convertDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Index() {
  const events = useLoaderData<Event[]>();
  return (
    <Layout title="Active Event">
      <div className="grid grid-cols-4">
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
