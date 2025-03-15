import { Curve, CurveWithLine, Logo } from "@components/ui";
import { Link, useFetcher, useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { HiOutlineCog, HiOutlineHome, HiOutlineTicket } from "react-icons/hi";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

function handleLogout() {}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const curPath = location.pathname.slice(1);
  const menus = ["Home", "Event", "Setting"];
  const menuLinks = ["", "event", "setting"];
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
  const fetcher = useFetcher();

  return (
    <div className="w-64 h-screen py-8 p-4 flex flex-col justify-between">
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
                className={`flex w-full items-center justify-between p-1.5 rounded-md hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-300 hover:shadow-lg text-gray-800 hover:text-white transition duration-200 ${
                  curPath == menuLinks[index] &&
                  "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100"
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
                {curPath == menuLinks[index] && (
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
                        className={`flex w-full items-center justify-between p-1.5 rounded-md hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-300 hover:shadow-lg text-gray-800 hover:text-white transition duration-200 ${
                          curPath.includes(submenuLinks[index][subindex]) &&
                          "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100 flex justify-between"
                        }`}
                      >
                        {subitem}
                        {curPath.includes(submenuLinks[index][subindex]) && (
                          <IoChevronForwardOutline size={18} />
                        )}
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
            className={`flex w-full items-center justify-between p-1.5 rounded-md hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-300 hover:shadow-lg text-gray-800 hover:text-white transition duration-200 ${
              curPath == "profile" &&
              "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100 flex justify-between"
            }`}
          >
            <div className="flex items-center gap-2">
              {bottomSVG[index]}
              <div>{item}</div>
            </div>
            {curPath == "profile" && <IoChevronForwardOutline size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
}
