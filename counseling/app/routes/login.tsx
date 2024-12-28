import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { createCookie } from "@remix-run/node";

// Create a cookie
const loginCookie = createCookie("login", {
  maxAge: 60 * 60 * 24 * 7, // 1 week
});

// Server-side loader (optional for authentication status check)
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await loginCookie.parse(cookieHeader)) || {};

  // Redirect if already authenticated
  if (cookie.thaiID && cookie.password) {
    return redirect("/dashboard");
  }

  return null;
};

// Handle form submission (replace with your authentication logic)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const thaiID = formData.get("thaiID") as string;
  const password = formData.get("password") as string;

  if (!thaiID || !password) {
    return { error: "Both fields are required." };
  }

  // Dummy authentication logic
  if (thaiID === "1234567890123" && password === "12345") {
    const cookie = await loginCookie.serialize({ thaiID, password });
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  return { error: "Invalid Thai ID or password." };
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();
  const [thaiID, setThaiID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        {actionData?.error && (
          <div className="text-red-500 text-sm text-center mt-2">
            {actionData.error}
          </div>
        )}
        <Form method="post" className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="thaiID"
              className="block text-md font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="thaiID"
              name="thaiID"
              value={thaiID}
              onChange={(e) => setThaiID(e.target.value)}
              placeholder="เลขประจำตัวประชาชน 13 หลัก"
              className="w-full mt-2 p-2 border border-gray-300 bg-white text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="เลขบัตรประจำตัวนักเรียน"
              className="w-full mt-2 p-2 border border-gray-300 bg-white text-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </Form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}
