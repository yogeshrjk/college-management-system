import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Profile from "./pages/ui/Profile";
import Settings from "./pages/ui/Settings";
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  BookOpen,
  FileText,
  BotMessageSquare,
  ClipboardCheck,
  PanelRightOpen,
  PanelRightClose,
  // Sheet,
} from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";
import { Notification } from "./Notification";
import { ChangePass } from "./pages/ui/ChangePass";

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
    title: "Ask AI",
    url: "/askai",
    icon: BotMessageSquare,
  },
  // {
  //   title: "Schedule",
  //   url: "/schedule",
  //   icon: Sheet,
  // },
];

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true); //navigation panel
  const [isProfileOpen, setIsProfileOpen] = useState(false); //samll profile dropdown
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); //notification droopdown
  const [profilePicUrl, setProfilePicUrl] = useState(""); //setting profile pic
  const [showProfile, setShowProfile] = useState(false); //full profile setting
  const [showSettings, setShowSettings] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  const GET_USER = gql`
    query GetUser($_id: ID!) {
      getUser(_id: $_id) {
        _id
        profilePic
        firstName
        lastName
        phoneNumber
        dob
        email
        gender
        role
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { _id: localStorage.getItem("userId") },
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
  const userData = data?.getUser;
  return (
    <div
      className="h-screen flex bg-gray-100 dark:bg-gray-800 select-none"
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
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-md flex flex-col justify-between transition-all duration-300 z-20 ${
          isOpen
            ? "w-[200px] items-start"
            : "hidden md:flex w-[60px] items-center"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            isOpen ? "ml-4.5 p-0 mt-2" : "ml-0.5 p-2 mt-1"
          }`}
        >
          <div className="rounded-md p-1">
            <img
              src="/logo1.gif"
              alt="logo"
              className={` ${isOpen ? "w-8 h-8 mt-1.5" : "w-6 h-6"}`}
            />
          </div>
          {isOpen && (
            <div className="m-0">
              <span className="text-sm sm:text-md font-bold">My Campus</span>
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
              } items-center gap-2 text-[#103d46] dark:text-white hover:bg-gray-100 hover:dark:bg-white/10 p-2 rounded`}
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
          <div className="text-sm text-gray-400 p-4 mb-5">
            <span className="block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            This project is currently under development — some pages may contain
            hardcoded data, and additional features will be added soon.
          </div>
        )}
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "md:pl-[200px]" : "md:pl-[60px]"
        }`}
      >
        {/* top bar */}
        <div className="flex justify-between items-center p-3 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] bg-white dark:bg-gray-900">
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
            <div
              className="relative cursor-pointer"
              onClick={(e) => {
                setIsNotificationOpen(!isNotificationOpen);
                e.stopPropagation();
              }}
            >
              <Bell />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </div>
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
          {isProfileOpen && (
            <ProfileDropdown
              isOpen={isProfileOpen}
              setIsProfileOpen={setIsProfileOpen}
              setShowProfile={setShowProfile}
              setShowSettings={setShowSettings}
              user={userData}
            />
          )}
          {/* Notifications panel */}
          {isNotificationOpen && <Notification isOpen={isOpen} />}
        </div>
        {/* Main dashboard content */}
        <div className="overflow-y-auto h-screen">
          <Outlet context={{ userRole: data?.getUser?.role }} />
        </div>
      </div>
      {showProfile && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <Profile
            onClose={() => setShowProfile(false)}
            data={data}
            onChangePassword={() => {
              setShowProfile(false);
              setShowChangePass(true);
            }}
          />
        </div>
      )}
      {showChangePass && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <ChangePass
            data={data}
            setShowChangePass={setShowChangePass}
            onClose={() => setShowChangePass(false)}
          />
        </div>
      )}
      {showSettings && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <Settings onClose={() => setShowSettings(false)} />
        </div>
      )}
    </div>
  );
};

// hover:bg-[#0b2e36]
