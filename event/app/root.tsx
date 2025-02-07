import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "./tailwind.css";
import cookie from "cookie";
import { Sidebar } from "@/components/layouts";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const token = cookies.token;
  const url = request.url;
  return !token && !url.includes("authentication")
    ? redirect("./authentication/login")
    : null;
}

export default function App() {
  const location = useLocation();
  const isAuthenticationRoute = location.pathname.includes("/authentication");

  return (
    <div className="flex min-h-screen bg-background">
      {!isAuthenticationRoute && (
        <div className="w-64">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 min-h-screen p-2">
        <Outlet />
      </div>
    </div>
  );
}
