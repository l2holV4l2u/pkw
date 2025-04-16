import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@components/ui/collapsible";
import { Link, useLocation } from "@remix-run/react";
import { HiOutlineCog, HiOutlineHome, HiOutlineTicket } from "react-icons/hi";
import { IoChevronForwardOutline, IoChevronUpOutline } from "react-icons/io5";

function Logo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
    >
      <line
        x1="16.2929"
        y1="23.4751"
        x2="31.4751"
        y2="8.29289"
        stroke="black"
      />
      <line x1="15" y1="24" x2="36.4709" y2="24" stroke="black" />
      <line x1="15.7071" y1="23.2929" x2="29.8492" y2="37.435" stroke="black" />
      <path
        d="M27 9C27 11.7614 29.2386 14 32 14C34.7614 14 37 11.7614 37 9C37 6.23858 34.7614 4 32 4C29.2386 4 27 6.23858 27 9Z"
        fill="white"
        stroke="black"
      />
      <path
        d="M27 24C27 26.7614 29.2386 29 32 29C34.7614 29 37 26.7614 37 24C37 21.2386 34.7614 19 32 19C29.2386 19 27 21.2386 27 24Z"
        fill="white"
        stroke="black"
      />
      <path
        d="M27 39C27 41.7614 29.2386 44 32 44C34.7614 44 37 41.7614 37 39C37 36.2386 34.7614 34 32 34C29.2386 34 27 36.2386 27 39Z"
        fill="white"
        stroke="black"
      />
      <path
        d="M10 24C10 26.7614 12.2386 29 15 29C17.7614 29 20 26.7614 20 24C20 21.2386 17.7614 19 15 19C12.2386 19 10 21.2386 10 24Z"
        fill="white"
        stroke="black"
      />
    </svg>
  );
}

function Curve() {
  return (
    <svg
      width="27"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" strokeWidth="3" />
    </svg>
  );
}

function CurveWithLine() {
  return (
    <svg
      width="27"
      height="42"
      viewBox="0 0 18 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9 0C9 13.3929 9 25 18 25" stroke="gray" strokeWidth="3" />
      <path d="M9 0V42" stroke="gray" strokeWidth="3" />
    </svg>
  );
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "home",
    icon: <HiOutlineHome size={24} />,
  },
  {
    title: "Event",
    icon: <HiOutlineTicket size={24} />,
    subitems: [
      {
        title: "Hosted",
        url: "hosted",
      },
      {
        title: "Registered",
        url: "registered",
      },
    ],
  },
  {
    title: "Setting",
    url: "setting",
    icon: <HiOutlineCog size={24} />,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const curPath = location.pathname.slice(1);
  const focus =
    "bg-gradient-to-br from-primary-700 to-primary-500 shadow-lg font-semibold text-gray-100 text-white hover:text-white focus:text-white active:text-white hover:from-primary-600 hover:to-primary-400";
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <Sidebar>
        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-center items-center p-4 h-fit">
              <div className="w-12 h-12">
                <Logo />
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="h-fit">
                    {item.subitems ? (
                      <div className="flex flex-col">
                        <SidebarMenuButton>
                          <CollapsibleTrigger className="flex justify-between items-center w-full">
                            <div className="flex gap-2">
                              <div className="w-6 h-6"> {item.icon}</div>
                              <div>{item.title}</div>
                            </div>
                            <IoChevronUpOutline className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                        </SidebarMenuButton>
                        <CollapsibleContent className="w-full px-2">
                          {item.subitems.map((subitem, index) => (
                            <div className="flex gap-2">
                              {index == item.subitems.length - 1 ? (
                                <Curve />
                              ) : (
                                <CurveWithLine />
                              )}
                              <Link to={subitem.url} className="h-fit w-full">
                                <SidebarMenuButton
                                  size={"sm"}
                                  className={`${
                                    curPath.includes(subitem.url)
                                      ? focus
                                      : "text-gray-800"
                                  } mt-2 justify-between`}
                                >
                                  {subitem.title}
                                  {curPath.includes(subitem.url) && (
                                    <IoChevronForwardOutline size={18} />
                                  )}
                                </SidebarMenuButton>
                              </Link>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </div>
                    ) : (
                      <Link to={item.url}>
                        <SidebarMenuButton
                          className={`${
                            curPath.includes(item.url) ||
                            (curPath == "" && item.title == "Home")
                              ? focus
                              : "text-gray-800"
                          } justify-between`}
                        >
                          <div className="flex gap-2">
                            <div className="w-6 h-6"> {item.icon}</div>
                            <div>{item.title}</div>
                          </div>
                          {(curPath.includes(item.url) ||
                            (curPath == "" && item.title == "Home")) && (
                            <IoChevronForwardOutline size={18} />
                          )}
                        </SidebarMenuButton>
                      </Link>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Collapsible>
  );
}
