import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import Sidebar from "./routes/components/sidebar";
import { useEffect, useState } from "react";
import Authenticate from "./routes/pagecomponents/authenticate";

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

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      const parsedToken = JSON.parse(savedToken);
      setToken(parsedToken);
    }
  }, []);

  const handleSetToken = (userToken: string) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };
  if (!token) {
    return <Authenticate setToken={handleSetToken} />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar with responsiveness */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-screen p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
