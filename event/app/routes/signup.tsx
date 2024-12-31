import { ActionFunction, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import Input from "./components/input";

// Handle form submission
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

  // Mock user creation logic (replace with actual backend API)
  if (email === "existingUser") {
    return { error: "Username already exists." };
  }

  return redirect("/dashboard");
};

export default function SignupPage() {
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
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="mr-2 w-4 h-4 appearance-none transition border-2 border-gray-300 bg-white rounded checked:bg-blue-500 checked:border-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </Form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
