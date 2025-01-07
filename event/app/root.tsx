import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import "./tailwind.css";
import Sidebar from "./routes/components/sidebar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

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

export default function App() {
  const location = useLocation().pathname;
  const [cookie, setCookie] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !cookie.EventManager &&
      location !== "/login" &&
      location !== "/register"
    ) {
      navigate("/login");
    } else if (
      cookie.EventManager &&
      (location == "/login" || location == "/register")
    ) {
      console.log("Huh", location);
      navigate("/");
    }
  }, []);
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar with responsiveness */}
      {!(location === "/login" || location === "/register") && (
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
