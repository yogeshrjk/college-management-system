import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  BookOpen,
  FileText,
  MessageCircle,
  ClipboardCheck,
  GraduationCap,
  PanelRightOpen,
  PanelRightClose,
  Sheet,
} from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Notification } from "./Notification";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    url: "/events",
    icon: CalendarCheck,
  },
  {
    title: "Notices",
    url: "/notices",
    icon: ClipboardCheck,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: BookOpen,
  },
  {
    title: "Papers",
    url: "/papers",
    icon: FileText,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Schedule",
    url: "/schedule",
    icon: Sheet,
  },
];

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const GET_USER = gql`
    query GetUser($id: ID!) {
      getUser(id: $id) {
        profilePic
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: "685ab7247ab69663853ff554" },
  });

  useEffect(() => {
    if (data?.getUser?.profilePic) {
      setProfilePicUrl(data.getUser.profilePic);
    }
  }, [data]);

  if (loading) return null;
  if (error) {
    console.error("Failed to load user info", error);
    return null;
  }

  return (
    <div
      className="h-screen flex bg-gray-100 select-none"
      onClick={(e) => {
        // Close only if the click target is outside the profile and bell icons
        const isClickInsideIcon =
          e.target.closest(".profile-icon") || e.target.closest(".bell-icon");
        if (!isClickInsideIcon) {
          setIsProfileOpen(false);
          setIsNotificationOpen(false);
        }
      }}
    >
      {/* Side panel */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between transition-all duration-300 z-20 ${
          isOpen
            ? "w-[200px] items-start"
            : "hidden md:flex w-[60px] items-center"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            isOpen ? "ml-4.5 p-0 mt-2.5" : "ml-0.5 p-2 mt-2"
          }`}
        >
          <div className="bg-black rounded-md p-1">
            <GraduationCap
              className={`text-white ${isOpen ? "w-6 h-6" : "w-4 h-4"}`}
            />
          </div>
          {isOpen && (
            <div>
              <span className="text-md font-bold">My Campus</span>
              <p className=" text-gray-500 text-xs">College Portal</p>
            </div>
          )}
          <div className="md:hidden ml-4 block">
            {isOpen && (
              <PanelRightOpen
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              to={item.url}
              key={item.title}
              className={`flex ${
                isOpen ? "flex-row" : "flex-col"
              } items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded`}
            >
              <item.icon className={`w-5 h-5 ${isOpen ? "w-6 h-6" : ""}`} />
              {isOpen && (
                <span className="text-sm text-center">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
        {!isOpen ? (
          <div className="flex flex-col justify-center items-center gap-1 p-2 mb-5">
            {"MY CAMPUS".split("").map((char, index) => (
              <span key={index} className="text-gray-400 font-bold text-sm">
                {char}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-sm text-gray-400 p-4 mb-5">
            All-in-one campus command center — where schedules, studies, and
            students stay in sync.
          </span>
        )}
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:pl-[200px]" : "md:pl-[60px]"
        }`}
      >
        {/* top bar */}
        <div className="flex justify-between items-center p-3 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
          <div className="flex justify-center items-center gap-4">
            {isOpen ? (
              <PanelRightOpen
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              />
            ) : (
              <PanelRightClose
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              />
            )}
            {!isOpen && (
              <PanelRightClose
                onClick={() => setIsOpen(true)}
                className={`cursor-pointer ${isOpen ? "block" : "hidden"} `}
              />
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mr-5">
            <Bell
              className="bell-icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            />
            <div
              className="bg-gray-500 rounded-full cursor-pointer profile-icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileOpen(!isProfileOpen);
              }}
            >
              <img
                src={
                  profilePicUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border border-black"
              />
            </div>
          </div>

          {/* Profile section */}
          {isProfileOpen && <ProfileDropdown isOpen={isOpen} />}
          {/* Notifications panel */}
          {isNotificationOpen && <Notification isOpen={isOpen} />}
        </div>
        {/* Main dashboard content */}
        <div className="overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
