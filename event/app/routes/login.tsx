import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { createCookie } from "@remix-run/node";
import Input from "./components/input";
import { sha256 } from "js-sha256";

// Create a cookie
const loginCookie = createCookie("EventManager", {
  maxAge: 60 * 60 * 24 * 7, // 1 week
});

// Define the type for user data
interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

// Function to hash the password using SHA-256 (from js-sha256)
function hashPassword(password: string): string {
  return sha256(password); // Hash the password using sha256
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Both fields are required." };
  }

  // Fetch user data from localhost:5000/getuser
  const response = await fetch("http://localhost:5000/getuser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.message || "Invalid username or password." };
  }

  const userData: User[] = await response.json();

  // Find the user by email
  const user = userData.find((d: User) => d.email === email);

  if (!user) {
    return { error: "Invalid username or password." };
  }

  // Hash the provided password using SHA-256
  const hashedPassword = hashPassword(password);

  // Compare the hashed password with the stored hash
  if (hashedPassword !== user.password_hash) {
    return { error: "Invalid username or password." };
  }

  // Password is valid, proceed to create a session/cookie
  const cookie = await loginCookie.serialize({ email, id: user.id });
  console.log("Yes!");
  return redirect("/", {
    headers: {
      "Set-Cookie": cookie,
    },
  });
};

export default function Login() {
  const actionData = useActionData<{ error?: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Log in to your account
        </h2>
        {actionData?.error && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {actionData.error}
          </div>
        )}
        <Form method="post" className="mt-4">
          <Input field={email} setField={setEmail} label="Email" type="email" />
          <Input
            field={password}
            setField={setPassword}
            label="Password"
            type="password"
          />
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-600 text-sm">
              <input
                type="checkbox"
                name="remember"
                className="mr-2 w-4 h-4 appearance-none transition border-2 border-gray-300 bg-white rounded checked:bg-blue-500 checked:border-blue-500"
              />
              Remember this device
            </label>
            <a
              href="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              Create an account
            </a>
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-gray-600 font-semibold rounded-lg hover:ring-slate-300 hover:ring-4 w-full border-gray-800 border-2 transition"
          >
            Log in
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
