import { Link, useLoaderData } from "@remix-run/react";
import { Event } from "@/types/event";
import { getEvents } from "@utils/functions/event";
import { Layout } from "@components/layout/layout";
import { Card } from "@components/customui/card";
import { EventCard } from "@components/customui/eventcard";
import { convertDate } from "@utils/functions/misc";

export async function loader() {
  const { events } = await getEvents();
  return events;
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
