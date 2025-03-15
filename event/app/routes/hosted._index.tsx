import { Button, Card, EventCard } from "@/components/ui";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { Layout } from "@/components/layouts";
import { Event } from "@/types/event";
import { convertDate } from "@utils/functions/misc";

export async function loader() {
  return prisma.event.findMany();
}

export default function EventIndex() {
  const events = useLoaderData<Event[]>();
  return (
    <Layout title="Hosted Event">
      <div className="grid grid-cols-4 gap-4">
        <Link to="./newevent">
          <Card className="flex items-center justify-center w-full h-full text-lg font-semibold hover:scale-[1.02] transition">
            + Add Event
          </Card>
        </Link>
        {events.map((item) => (
          <EventCard
            event={{
              id: item.id,
              img: null,
              name: item.name,
              description: item.description,
              location: item.location,
              date:
                convertDate(item.startDate) + " - " + convertDate(item.endDate),
            }}
          />
        ))}
      </div>
    </Layout>
  );
}
