import { Form } from "@remix-run/react";
import { RegisterProps } from "@/types/authentication";
import { Input } from "@components/ui";
import { useState } from "react";

export function Register({
  email,
  setEmail,
  password,
  setPassword,
  handleRegister,
  setIsRegister,
  error,
}: RegisterProps) {
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Create Your Account
        </h2>
        {error && (
          <div className="text-red-500 mt-4 text-sm text-center">{error}</div>
        )}
        <Form
          method="post"
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(email, password, confirmPassword);
          }}
        >
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
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className="text-sm text-blue-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
