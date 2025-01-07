import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import Input from "./components/input";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm") as string;

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // Create a new user object
  const user = {
    email,
    password, // Password should be hashed before sending to the server (consider adding hashing here)
  };

  try {
    // Send POST request to localhost:5000/adduser
    const response = await fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Sending user data in JSON format
    });

    if (!response.ok) {
      // Handle error if the response status is not OK
      const errorData = await response.json();
      return { error: errorData.message || "Failed to create user." };
    }

    // Redirect to the dashboard after successful user creation
    return redirect("/");
  } catch (error) {
    // Catch any network or other errors
    return { error: "An error occurred while creating the user." };
  }
};

export default function Register() {
  const actionData = useActionData<{ error?: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Create Your Account
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
          <Input
            field={confirmPassword}
            setField={setConfirmPassword}
            label="Confirm Password"
            type="password"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm text-gray-600 font-semibold rounded-lg hover:ring-slate-300 hover:ring-4 w-full border-gray-800 border-2 transition"
          >
            Create your account
          </button>
        </Form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
