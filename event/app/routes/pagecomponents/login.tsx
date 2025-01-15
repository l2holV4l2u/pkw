import { Form } from "@remix-run/react";
import { LoginProps } from "../types/authenticate";
import Input from "../components/input";

export default function Login({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  setIsRegister,
  error,
}: LoginProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-left">
          Log in to your account
        </h2>
        {error && (
          <div className="text-red-500 mt-4 text-sm text-center">{error}</div>
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
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className="text-sm text-blue-500 hover:underline"
            >
              Create an account
            </button>
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
