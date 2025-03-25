import { Curve, CurveWithLine, Logo } from "@components/ui";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { HiOutlineCog, HiOutlineHome, HiOutlineTicket } from "react-icons/hi";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Layout } from "./layout";

function handleLogout() {
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const curPath = location.pathname.slice(1);
  const menus = ["Home", "Event", "Setting"];
  const menuLinks = ["home", "event", "setting"];
  const submenus = [[], ["Hosted Event", "Registered Event"], []];
  const submenuLinks = [[], ["hosted", "registered"], []];
  const [openSub, setOpenSub] = useState<boolean>(true);
  const menuSVG = [
    <HiOutlineHome size={24} />,
    <HiOutlineTicket size={24} />,
    <HiOutlineCog size={24} />,
  ];
  const bottom = ["Profile", "Log out"];
  const bottomAction = [() => navigate("./profile"), () => handleLogout()];
  const bottomSVG = [
    <FaRegUser size={20} strokeWidth={2} />,
    <FiLogOut size={24} />,
  ];

  return (
    <div className="fixed top-0 left-0 p-2 w-64 h-screen">
      <Layout className="w-full h-full bg-white">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <Logo />
            <ul className="space-y-2 w-full">
              {menus.map((item, index) => (
                <li key={index}>
                  {/* Menu */}
                  <button
                    onClick={() =>
                      submenus[index].length
                        ? setOpenSub(!openSub)
                        : navigate(menuLinks[index])
                    }
                    className={`flex w-full items-center justify-between p-1.5 rounded-md hover:bg-gradient-to-br hover:from-primary-600 hover:to-primary-400 hover:shadow-lg hover:text-white ${
                      curPath.includes(menuLinks[index]) &&
                      submenus[index].length == 0
                        ? "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100"
                        : "text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {menuSVG[index]} <div>{item}</div>
                    </div>
                    {submenus[index].length != 0 &&
                      (openSub ? (
                        <IoChevronDownOutline size={18} />
                      ) : (
                        <IoChevronUpOutline size={18} />
                      ))}
                    {curPath.includes(menuLinks[index]) &&
                      submenus[index].length == 0 && (
                        <IoChevronForwardOutline size={18} />
                      )}
                  </button>
                  {/* Submenu */}
                  {openSub && (
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
                            className={`flex w-full items-center justify-between p-1.5 text-sm rounded-md hover:bg-gradient-to-br hover:from-primary-600 hover:to-primary-400 hover:shadow-lg hover:text-white ${
                              curPath.includes(submenuLinks[index][subindex])
                                ? "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100"
                                : "text-gray-800"
                            }`}
                          >
                            {subitem}
                            {curPath.includes(
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
          {/* Profile Navigation */}
          <div className="flex flex-col gap-2">
            {bottom.map((item, index) => (
              <button
                onClick={bottomAction[index]}
                className={`flex w-full items-center justify-between p-1.5 rounded-md hover:bg-gradient-to-br hover:from-primary-600 hover:to-primary-400 hover:shadow-lg hover:text-white ${
                  curPath == bottom[index].toLowerCase()
                    ? "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100"
                    : "text-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  {bottomSVG[index]}
                  <div>{item}</div>
                </div>
                {curPath == bottom[index].toLowerCase() && (
                  <IoChevronForwardOutline size={18} />
                )}
              </button>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}
