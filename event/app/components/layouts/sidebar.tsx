import { Link, useLocation } from "@remix-run/react";
import placeholder from "@/utils/placeholder.png";
import { useState } from "react";
import { HiOutlineCog, HiOutlineHome, HiOutlineTicket } from "react-icons/hi";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";

function Curve() {
  return (
    <svg
      width="18"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" stroke-width="2" />
    </svg>
  );
}

function CurveWithLine() {
  return (
    <svg
      width="18"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" stroke-width="2" />
      <path d="M9 0V42" stroke="gray" stroke-width="2" />
    </svg>
  );
}

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const menus = ["Home", "Event", "Setting"];
  const menuLinks = ["", "event", "setting"];
  const submenus = [[], ["Hosted Event", "Registered Event"], []];
  const submenuLinks = [[], ["hosted", "registered"], []];
  const [openSub, setOpenSub] = useState<boolean[]>([false, true, false]);
  const menuSVG = [
    <HiOutlineHome size={18} />,
    <HiOutlineTicket size={18} />,
    <HiOutlineCog size={18} />,
  ];

  const toggleSubmenu = (index: number) => {
    let updatedOpenSub = [...openSub];
    updatedOpenSub[index] = !updatedOpenSub[index];
    setOpenSub(updatedOpenSub);
  };

  return (
    <div className="w-64 fixed h-screen py-8 px-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
          Event Manager
        </h2>
        <ul className="space-y-2">
          {menus.map((item, index) => (
            <li key={index}>
              {/* Menu */}
              {submenus[index].length ? (
                <button
                  onClick={() => toggleSubmenu(index)}
                  className="flex w-full items-center justify-between p-1.5 rounded-md font-medium hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200 "
                >
                  <div className="flex items-center space-x-2">
                    {menuSVG[index]} <div>{item}</div>
                  </div>
                  {openSub[index] ? (
                    <IoChevronDownOutline size={18} />
                  ) : (
                    <IoChevronUpOutline size={18} />
                  )}
                </button>
              ) : (
                <Link
                  to={"./" + menuLinks[index]}
                  className={`flex items-center justify-between p-1.5 font-medium rounded-md hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200 ${
                    currentPath == menuLinks[index]
                      ? "bg-white shadow-md font-semibold"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {menuSVG[index]} <div>{item}</div>
                  </div>
                  {currentPath == menuLinks[index] && (
                    <IoChevronForwardOutline size={18} />
                  )}
                </Link>
              )}
              {/* Submenu */}
              {openSub[index] && (
                <ul className="relative pl-2">
                  {submenus[index].map((subitem, subindex) => (
                    <li
                      key={subitem}
                      className="relative flex items-center pl-4 space-x-2 space-y-2"
                    >
                      <div className="absolute top-0 left-0">
                        {subindex == submenus[index].length - 1 ? (
                          <Curve />
                        ) : (
                          <CurveWithLine />
                        )}
                      </div>
                      <Link
                        to={"/" + submenuLinks[index][subindex]}
                        className={`p-1.5 w-full text-sm rounded-md hover:bg-gray-200 hover:text-gray-900 text-gray-700 transition duration-200 ${
                          currentPath.includes(submenuLinks[index][subindex])
                            ? "bg-white shadow-md font-semibold flex justify-between"
                            : "font-medium"
                        }`}
                      >
                        {subitem}
                        {currentPath.includes(
                          submenuLinks[index][subindex]
                        ) && <IoChevronForwardOutline size={18} />}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
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
