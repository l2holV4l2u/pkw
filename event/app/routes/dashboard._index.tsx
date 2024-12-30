import Card from "./components/card";

export default function Index() {
  return (
    <div className="p-8 space-y-8 w-full">
      {/* Header Section */}
      <h1 className="text-3xl font-extrabold text-gray-800">Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Active Competitions">
          <p className="mt-2 text-gray-600">3 ongoing competitions</p>
        </Card>
        <Card title="Participants Registered">
          <p className="mt-2 text-gray-600">156 registered participants</p>
        </Card>
        <Card title="Upcoming Events">
          <p className="mt-2 text-gray-600">5 upcoming events this month</p>
        </Card>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left py-2 px-4 text-gray-600">Activity</th>
              <th className="text-left py-2 px-4 text-gray-600">Date</th>
              <th className="text-left py-2 px-4 text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-gray-600">New Registration</td>
              <td className="py-2 px-4 text-gray-600">Dec 25, 2024</td>
              <td className="py-2 px-4 text-success">Completed</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-gray-600">Event Scheduled</td>
              <td className="py-2 px-4 text-gray-600">Dec 28, 2024</td>
              <td className="py-2 px-4 text-blue-500">Scheduled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
