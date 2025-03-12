import { HiOutlineCog, HiOutlineHome, HiOutlineTicket } from "react-icons/hi";
import { Button, Curve, CurveWithLine, Input } from "@components/ui";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import placeholder from "@/utils/placeholder.png";
import { useContext, useState } from "react";
import { UserContext } from "@contexts";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";

const fields = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Contact Number", key: "contactNo" },
  { label: "Family Number", key: "familyNo" },
  { label: "School", key: "school" },
  { label: "Thai ID", key: "thaiId" },
];

function ProfileField({ index, formData, setFormData }: any) {
  return (
    <div className="flex justify-between w-full">
      <Input
        field={
          formData[fields[index].key] == "undefined"
            ? "Unknown"
            : formData[fields[index].key]
        }
        setField={(val) =>
          setFormData({ ...formData, [fields[index].key]: val })
        }
        label={fields[index].label}
        type="text"
      />
    </div>
  );
}

export function Sidebar() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const [formData, setFormData] = useState(user);
  const [isOpen, setIsOpen] = useState(false);
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
  const fetcher = useFetcher();
  const handleSubmit = () => {
    const data = { id: user.id, formData };
    fetcher.submit({ data: JSON.stringify(data) }, { method: "post" });
  };

  return (
    <div className="w-64 h-screen py-8 px-4 flex flex-col justify-between">
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
      <div
        className="flex items-center space-x-2 p-1.5 font-medium rounded-md hover:bg-gray-200 transition duration-200 mt-8"
        onClick={() => setIsOpen(!isOpen)}
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
      </div>
      {isOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-128 pointer-events-none">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((_, index) => (
                <ProfileField
                  key={index}
                  index={index}
                  formData={formData}
                  setFormData={setFormData}
                />
              ))}
              <div className="flex justify-end col-span-2 pointer-events-auto">
                <Button
                  content="Save"
                  onClick={handleSubmit}
                  className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600"
                />
                <Button
                  content="Close"
                  onClick={() => setIsOpen(false)}
                  className="ml-2 bg-gray-500 hover:bg-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
