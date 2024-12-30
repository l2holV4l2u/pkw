import { Outlet } from "@remix-run/react";
import Sidebar from "./components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Outlet />
    </div>
  );
}
