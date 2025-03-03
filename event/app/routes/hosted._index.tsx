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
    <Layout
      title="Hosted Event"
      button={<Button link="./newevent" content="+ add event" />}
    >
      {events.length === 0 ? (
        <div className="text-gray-500">No events found</div>
      ) : (
        events.map((item) => (
          <Card
            key={item.id}
            clickable={true}
            link={"./" + item.id}
            className="p-4"
          >
            <div className="text-gray-700 space-y-1">
              <h1 className="text-xl text-gray-800 font-bold">{item.name}</h1>
              <p>
                Date: {convertDate(item.startDate)}
                {" - "}
                {convertDate(item.endDate)}
              </p>
              <p className="text-sm">Location: {item.location}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </Card>
        ))
      )}
    </Layout>
  );
}
