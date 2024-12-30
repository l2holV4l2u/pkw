// app/routes/dashboard/event.tsx
export default function Event() {
  // Sample data for registered and hosted events
  const registeredEvents = [
    { id: 1, name: "Math Olympiad", date: "2024-01-15", status: "Registered" },
    { id: 2, name: "Science Fair", date: "2024-02-20", status: "Registered" },
  ];

  const hostedEvents = [
    { id: 1, name: "Annual Sports Day", date: "2024-03-10", status: "Ongoing" },
    { id: 2, name: "Art Competition", date: "2024-04-05", status: "Completed" },
  ];

  return (
    <div className="p-8 space-y-8 w-full">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Events</h1>
        <button className="px-6 py-3 bg-blue-600 text-sm text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          + New Event
        </button>
      </div>

      {/* Registered Events Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Registered Events
        </h2>
        <div className="space-y-4">
          {registeredEvents.length > 0 ? (
            registeredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600">{event.date}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full ${
                    event.status === "Registered"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              You haven't registered for any events yet.
            </p>
          )}
        </div>
      </section>

      {/* Hosted Events Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Hosted Events
        </h2>
        <div className="space-y-4">
          {hostedEvents.length > 0 ? (
            hostedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600">{event.date}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full ${
                    event.status === "Ongoing"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You haven't hosted any events yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
