import { useActionData, Form, Link, redirect } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { Input } from "@components/ui";
import cookie from "cookie";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type ActionData = {
  success?: string;
  error?: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm") as string;
  const fullname = formData.get("full") as string;
  if (!email || !password || !confirmPassword) {
    return new Response(JSON.stringify({ error: "All fields are required." }));
  }
  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ error: "Passwords do not match." }));
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response("Email already in use.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { full_name: fullname, email, password: hashedPassword },
    });
    const cookieHeader = cookie.serialize("token", user.id, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365 * 999,
      path: "/",
    });
    return redirect("/", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify("Something went wrong. Try again later.")
    );
  }
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Create Your Account
        </h2>
        {actionData?.error != "" && (
          <div className="text-red-500 mt-4 text-sm text-center">
            {actionData?.error}
          </div>
        )}
        <Form method="post" className="mt-4 space-y-4">
          <Input
            field={fullname}
            setField={setFullname}
            label="Full Name"
            type="text"
          />
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
          <Link
            to={"/authentication/login"}
            className="text-sm text-blue-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/*

import { AuthenticationContext } from "@contexts/authentication";
import { PrismaClient } from "@prisma/client";
import { useContext, useState } from "react";
import { Form } from "@remix-run/react";
import { Input } from "@components/ui";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setIsRegister,
    error,
    setError,
    setToken,
  } = useContext(AuthenticationContext);
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister() {
    try {
      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return setError("Email already in use");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          full_name: "John Doe",
          email,
          password: hashedPassword,
        },
      });
      setToken(newUser.id);
    } catch (error) {
      return setError("Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl text-left font-bold text-gray-700">
          Create Your Account
        </h2>
        {error != "" && (
          <div className="text-red-500 mt-4 text-sm text-center">{error}</div>
        )}
        <Form
          method="post"
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
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


*/
