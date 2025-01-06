import Card from "./components/card";
import Layout from "./components/layout";

export default function Index() {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Check Admission Eligibility" className="p-4">
          <p className="mt-2 text-gray-600">
            Compare your score to last year's minimum accepted score.
          </p>
        </Card>
        <Card title="Calculate Your Percentile" className="p-4">
          <p className="mt-2 text-gray-600">
            Find out where you stand among other students.
          </p>
        </Card>
        <Card title="Insights & Trends" className="p-4">
          <p className="mt-2 text-gray-600">
            Analyze trends in admission scores over the years.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
