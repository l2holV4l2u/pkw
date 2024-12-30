// app/routes/dashboard/profile.tsx
import { Form } from "@remix-run/react";

export default function ProfilePage() {
  // Example user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software Developer. Coffee enthusiast. Avid Gamer.",
    joined: "2023-05-01",
  };

  return (
    <div className="p-8 space-y-8 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Profile
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Details</h2>
          <p className="text-gray-600">
            View and update your profile details below.
          </p>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={user.bio}
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Member Since
            </label>
            <input
              type="text"
              name="joined"
              defaultValue={user.joined}
              disabled
              className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <Form method="post" className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark"
          >
            Save Changes
          </button>
        </Form>
      </div>
    </div>
  );
}
