import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { Input } from "@/components/ui";
import bcrypt from "bcryptjs";
import { ActionFunctionArgs } from "@remix-run/node";
import { useState } from "react";
import cookie from "cookie";
import { getUserByEmail } from "@utils/functions/user";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("Email") as string;
  const password = formData.get("Password") as string;
  const remember = formData.get("remember") as string;
  try {
    const { user } = await getUserByEmail(email);
    const passwordMatch = await bcrypt.compare(
      password,
      user ? user.password : ""
    );
    if (!user || !passwordMatch) {
      return new Response("Invalid username or password");
    }
    const cookieHeader = cookie.serialize("id", user.id, {
      maxAge: remember === "true" ? 60 * 60 * 24 * 365 * 999 : undefined,
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
  const [remember, setRemember] = useState<boolean>(false);
  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
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
        <Form method="post" className="mt-4 space-y-4">
          <Input
            data={email}
            setData={(d) => setEmail(d as string)}
            label="Email"
            type="email"
          />
          <Input
            data={password}
            setData={(d) => setPassword(d as string)}
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
                value={remember.toString()}
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
