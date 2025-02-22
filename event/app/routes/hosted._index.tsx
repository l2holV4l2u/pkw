import { useLoaderData } from "@remix-run/react";
import { prisma } from "@utils/functions/prisma";
import { Layout } from "@/components/layouts";
import { Button, Card } from "@/components/ui";
import { Event } from "@/types/event";

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

export default function EventIndex() {
  const events = useLoaderData<Event[]>();
  return (
    <Layout title="Hosted Event" className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-bold text-2xl">Your Events</div>
        <Button link="./newevent" content="+ add event" />
      </div>

      {events.length === 0 ? (
        <div className="text-gray-500">No events found</div>
      ) : (
        events.map((item) => (
          <Card
            title={item.name}
            key={item.id}
            clickable={true}
            link={"./" + item.id}
            className="p-4"
          >
            <div className="text-gray-700 space-y-1">
              <p>
                Date: {convertDate(item.start_date)}
                {" - "}
                {convertDate(item.end_date)}
              </p>
              <p>Location: {item.location}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Card>
        ))
      )}
    </Layout>
  );
}
