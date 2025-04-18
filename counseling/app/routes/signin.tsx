import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { createCookie } from "@remix-run/node";
import Input from "./components/input";

// Handle form submission (replace with your authentication logic)
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  if (!id || !password) {
    return { error: "Both fields are required." };
  }

  // Dummy authentication logic
  if (id === "12345" && password === "12345") {
    return redirect("/dashboard");
  }

  return { error: "Invalid username or password." };
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Sign in to your account
        </h2>
        {actionData?.error && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {actionData.error}
          </div>
        )}
        <Form method="post" className="mt-4">
          <Input field={id} setField={setID} label="ID" type="text" />
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
            <a href="/signup" className="text-sm text-blue-500 hover:underline">
              Create an account
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Sign in
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
