import Layout from "./components/layout";
import Card from "./components/card";
import placeholder from "./utils/placeholder.png";

export default function Profile() {
  return (
    <Layout title="Profile">
      <Card title="" className="p-4">
        <div className="flex items-start space-x-6">
          {/* Profile Picture */}
          <img
            src={placeholder}
            alt="Profile"
            className="w-64 h-64 rounded-md"
          />

          {/* Profile Content */}
          <div className="flex flex-col justify-between h-64">
            {/* Profile Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Naruesorn Prabpon
              </h2>
              <p className="text-gray-600 mt-2">
                Email: naruesornprabpon@gmail.com
              </p>
              <p className="text-gray-600 mt-2">Phone: 088 990 9979</p>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-4">
              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}
