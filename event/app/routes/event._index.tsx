import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import Card from "./components/card";
import Layout from "./components/layout";
import Button from "./components/button";
import { getCookie } from "./utils/getCookie";

// Define the TypeScript interface for an event based on the database schema
interface Event {
  id: string; // UUID as string
  name: string;
  description: string;
  location: string;
  start_time: string; // Date string (ISO format)
  end_time: string; // Date string (ISO format)
  admins: string[]; // Array of admin user IDs (UUIDs)
}

// Loader function to fetch events from the API
export const loader: LoaderFunction = async ({ request }) => {
  const cookies = request.headers.get("Cookie") || "";
  const cookie = getCookie(cookies);
  if (!cookie) {
    return null;
  }
  const response = await fetch(`http://localhost:5000/getevent/${cookie.id}`);

  if (!response.ok) {
    throw new Response("Failed to fetch events", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const events: Event[] = await response.json();
  console.log(events);
  return events;
};

export default function EventIndex() {
  const events = useLoaderData<Event[]>(); // Use the loader data
  return (
    <Layout title="Events" className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-bold text-2xl">Your Events</div>
        <Button link="./newevent" />
      </div>

      {events.length === 0 ? (
        <div className="text-gray-500">No events found.</div>
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
