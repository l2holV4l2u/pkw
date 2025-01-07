import { Link } from "@remix-run/react";
import Card from "./components/card";
import Layout from "./components/layout";
import Button from "./components/button";

export default function EventIndex() {
  // dummy event for now -> retrieve from api end point in the future
  const events = [
    {
      id: 1,
      name: "Tech Meetup 2024",
      date: "2024-06-15",
      location: "Marina Bay Sands, Singapore",
      description:
        "A meetup for tech enthusiasts to network and share knowledge.",
      organizer: "Tech Innovators Group",
      status: "Upcoming",
      participants: [
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
      ],
      tickets: [
        { type: "General Admission", price: 50, available: 100 },
        { type: "VIP Admission", price: 150, available: 20 },
      ],
    },
    {
      id: 2,
      name: "Annual Developer Conference",
      date: "2024-09-20",
      location: "Expo Hall 5, Singapore",
      description:
        "Explore the latest trends in software development and tools.",
      organizer: "Code Singapore",
      status: "Upcoming",
      participants: [
        { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
        { id: 4, name: "Robert Brown", email: "robert.brown@example.com" },
      ],
      tickets: [
        { type: "Early Bird", price: 70, available: 50 },
        { type: "Standard", price: 100, available: 200 },
      ],
    },
    {
      id: 3,
      name: "AI Workshop 2024",
      date: "2024-08-10",
      location: "AI Hub, Singapore",
      description:
        "A hands-on workshop to dive deep into AI concepts and applications.",
      organizer: "AI Singapore",
      status: "Completed",
      participants: [
        { id: 5, name: "Eve Parker", email: "eve.parker@example.com" },
        { id: 6, name: "Mike Davis", email: "mike.davis@example.com" },
      ],
      tickets: [
        { type: "Student Pass", price: 30, available: 0 },
        { type: "Professional Pass", price: 100, available: 0 },
      ],
    },
  ];

  return (
    <Layout title="Events" className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-bold text-2xl">Your Event</div>
        <Button link="./newevent" />
      </div>

      {events.map((item) => (
        <Card title={item.name}>
          <div className="text-gray-700 space-y-1">
            <p>Date: {item.date}</p>
            <p>Location: {item.location}</p>
            <p>Status: {item.status}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <div className="mt-3 flex justify-between">
            <Link
              to={`./${item.id}`}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              View Details
            </Link>
            <Link
              to={`./${item.id}/edit`}
              className="text-gray-600 hover:underline text-sm font-medium"
            >
              Edit Event
            </Link>
          </div>
        </Card>
      ))}
    </Layout>
  );
}
