import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import Input from "./components/input";
import { sha256 } from "js-sha256";
import { useCookies } from "react-cookie";

// Utility function to hash the password using SHA-256
function hashPassword(password: string): string {
  return sha256(password); // Hash the password using SHA-256
}

export default function Login() {
  const actionData = useActionData<{ error?: string }>(); // To capture any error data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(); // For managing cookies
  const navigate = useNavigate(); // For navigation
  // Handles user login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/getuser", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        alert("Unable to fetch user data. Please try again.");
        return;
      }

      const users = await response.json();
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        alert("User not found");
        return;
      }

      const hashedPassword = hashPassword(password); // Hash the entered password
      if (user.password_hash !== hashedPassword) {
        alert("Incorrect password");
        return;
      }

      // Set the cookie for logged-in user
      setCookie(
        "EventManager",
        { email, id: user.id },
        { path: "/", maxAge: 60 * 60 * 24 * 7 } // 1 week expiry
      );

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-left">
          Log in to your account
        </h2>

        {/* Error message from action data */}
        {actionData?.error && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {actionData.error}
          </div>
        )}

        {/* Login Form */}
        <Form
          method="post"
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleLogin(email, password);
          }}
        >
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
                className="mr-2 w-4 h-4 border-2 border-gray-300 bg-white rounded checked:bg-blue-500 checked:border-blue-500"
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
            className="px-4 py-2 w-full text-sm font-semibold text-gray-600 border-2 border-gray-800 rounded-lg hover:ring-4 hover:ring-slate-300 transition"
          >
            Log in
          </button>
        </Form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Forgot your password?{" "}
          <a href="/reset-password" className="text-blue-500 hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
}
