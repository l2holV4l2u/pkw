import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import "./tailwind.css";
import cookie from "cookie";
import { UserSchemaType } from "@types";
import { UserProvider } from "@contexts";
import { getUserById } from "@utils/functions/user";
import { SidebarProvider } from "@components/ui/sidebar";
import { AppSidebar } from "@components/section/appsidebar";

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
  const id = cookies.id;
  const url = request.url;
  if (!id) {
    if (!url.includes("authentication")) {
      throw redirect("./authentication/login");
    }
    return null;
  }
  const user = await getUserById(id);
  if (!user) throw new Response("User not found", { status: 404 });
  return JSON.parse(JSON.stringify(user)) as UserSchemaType;
}

export default function App() {
  const user = useLoaderData<UserSchemaType>();
  const location = useLocation();
  const isAuthRoute = location.pathname.includes("/authentication");
  return (
    <SidebarProvider>
      <UserProvider user={user}>
        <div className="flex min-h-screen bg-background w-full">
          {!isAuthRoute && <AppSidebar />}
          <div className="flex-1 p-2">
            <Outlet />
          </div>
        </div>
      </UserProvider>
    </SidebarProvider>
  );
}
