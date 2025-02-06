import { useEffect, useState } from "react";
import { Layout } from "@/components/layouts";
import { Button, Card } from "@/components/ui";
import { Event } from "@/types/event";

export default function EventIndex() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const loadEvent = async () => {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/getevent/${token}`);

      if (!response.ok) {
        throw new Response("Failed to fetch events", {
          status: response.status,
          statusText: response.statusText,
        });
      }

      const temp: Event[] = await response.json();
      setEvents(temp);
    };
    loadEvent();
  }, []);

  return (
    <Layout title="Hosted Event" className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-bold text-2xl">Your Events</div>
        <Button link="/newevent" content="+ add event" />
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
          >
            <div className="text-gray-700 space-y-1">
              <p>
                Date: {new Date(item.start_time).toLocaleString()} -{" "}
                {new Date(item.end_time).toLocaleString()}
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
