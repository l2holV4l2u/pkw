import { Link, useLocation } from "@remix-run/react";
import placeholder from "../utils/placeholder.png";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];
  const menus = ["Home", "Event", "Setting"];
  const menuLinks = ["", "event", "setting"];
  const menuSVG = [
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      ></path>
    </svg>,
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
      ></path>
    </svg>,
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="18px"
      height="18px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      ></path>
    </svg>,
  ];
  return (
    <div className="w-64 fixed h-screen py-8 px-4 flex flex-col justify-between">
      {/* Top Section: Navigation */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-8">
          Event Manager
        </h2>
        <ul className="space-y-2">
          {menus.map((item, index) => (
            <li key={index}>
              <Link
                to={"./" + menuLinks[index]}
                className={`flex items-center space-x-2 p-1.5 font-medium rounded-md hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200 ${
                  currentPath == menuLinks[index] ? "bg-white shadow-md" : ""
                }`}
              >
                {menuSVG[index]} <div>{item}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Bottom Section: Profile Navigation */}
      <div className="mt-8">
        <Link
          to="./profile"
          className="flex items-center space-x-2 p-1.5 font-medium rounded-md hover:bg-gray-200 transition duration-200"
        >
          <img src={placeholder} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col">
            <div className="text-gray-700 hover:text-gray-900 text-md">
              Naruesorn
            </div>
            <div className="text-gray-600 hover:text-gray-800 text-sm">
              M.6 Student
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
