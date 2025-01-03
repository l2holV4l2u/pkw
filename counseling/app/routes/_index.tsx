import Card from "./components/card";
import Layout from "./components/layout";

export default function Index() {
  return (
    <Layout title="Overview">
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
    </Layout>
  );
}
