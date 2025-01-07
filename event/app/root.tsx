import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createCookie } from "@remix-run/node";

import "./tailwind.css";
import Sidebar from "./routes/components/sidebar";

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

const loginCookie = createCookie("EventManager", {
  maxAge: 60 * 60 * 24 * 7, // 1 week
});
/*
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("EventManager");
  const cookie = (await loginCookie.parse(cookieHeader)) || {};
  // Parse the current URL to get the pathname
  const url = new URL(request.url);
  const pathname = url.pathname;
  // If user is not logged in, redirect to login unless already on it
  if (
    !(cookie.email && cookie.password) &&
    pathname !== "/login" &&
    pathname !== "/register"
  ) {
    return redirect("/login");
  }
  console.log(pathname);
  console.log("Bruh");
  return null;
};
*/

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

export default function App() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar with responsiveness */}
      {!(location.pathname == "/login" || location.pathname == "/register") && (
        <div className="w-64">
          <Sidebar />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
