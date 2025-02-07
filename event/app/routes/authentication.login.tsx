import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { Input } from "@/components/ui";
import bcrypt from "bcryptjs";
import { ActionFunctionArgs } from "@remix-run/node";
import { prisma } from "@utils/functions/prisma";
import { useState } from "react";
import cookie from "cookie";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") as string;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordMatch = await bcrypt.compare(
      password,
      user ? user.password : ""
    );
    if (!user || !passwordMatch) {
      return new Response("Invalid username or password");
    }
    const cookieHeader =
      remember == "true"
        ? cookie.serialize("token", user.id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 365 * 999,
            path: "/",
          })
        : cookie.serialize("token", user.id, {
            httpOnly: true,
            path: "/",
          });
    return redirect("/", {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    });
  } catch (error) {
    return new Response("Something went wrong. Please try again later.");
  }
}

export default function Login() {
  const actionData = useActionData<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 text-left">
          Log in to your account
        </h2>
        {actionData && (
          <div className="text-red-500 mt-4 text-sm text-left">
            {actionData}
          </div>
        )}
        {/* Login Form */}
        <Form method="post" className="mt-4 space-y-4">
          <Input field={email} setField={setEmail} label="Email" type="email" />
          <Input
            field={password}
            setField={setPassword}
            label="Password"
            type="password"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-600 text-sm">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={handleRememberChange}
                className="mr-2 w-4 h-4 border-2 border-gray-300 bg-white rounded checked:bg-blue-500 checked:border-blue-500"
              />
              Remember this device
            </label>
            <Link
              to={"/authentication/register"}
              className="text-sm text-blue-500 hover:underline"
            >
              Create an account
            </Link>
          </div>
          <button
            type="submit"
            className="px-4 py-2 mt-2 w-full text-sm font-semibold text-gray-600 border-2 border-gray-800 rounded-lg hover:ring-4 hover:ring-slate-300 transition"
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
