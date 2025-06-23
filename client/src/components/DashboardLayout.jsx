import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Bell,
  BookOpen,
  FileText,
  MessageCircle,
  ClipboardCheck,
  User,
  LogOut,
  GraduationCap,
  Settings,
  PanelRightOpen,
  PanelRightClose,
  Trash2,
} from "lucide-react";

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
];

const notifications = [
  {
    id: 1,
    title: "Exam Schedule Released",
    message:
      "The final exam timetable for Semester 5 has been published. Check the Examination section.",
    type: "exam",
    timestamp: "2025-06-22T09:30:00Z",
  },
  {
    id: 2,
    title: "Guest Lecture on AI",
    message:
      "Dr. Arvind Sharma will deliver a guest lecture on AI and Ethics on June 25th at 11 AM in Hall A.",
    type: "event",
    timestamp: "2025-06-21T14:15:00Z",
  },
  {
    id: 3,
    title: "Library Closed This Saturday",
    message:
      "Due to maintenance work, the library will remain closed on June 24th.",
    type: "announcement",
    timestamp: "2025-06-20T17:00:00Z",
  },
  {
    id: 4,
    title: "Assignment Submission Deadline",
    message:
      "Database Systems assignment must be submitted by June 26th via the LMS portal.",
    type: "academic",
    timestamp: "2025-06-21T10:00:00Z",
  },
  {
    id: 5,
    title: "New Course Available: Cloud Computing",
    message:
      "An elective on Cloud Computing is now open for registration under Semester 7 electives.",
    type: "course",
    timestamp: "2025-06-19T12:45:00Z",
  },
  {
    id: 6,
    title: "Workshop Registration Extended",
    message:
      "Deadline for Web Development workshop registration extended to June 27th.",
    type: "event",
    timestamp: "2025-06-22T08:20:00Z",
  },
  {
    id: 7,
    title: "Results Declared for Internal Assessment 2",
    message:
      "Check your performance report on the student portal under Assessments > IA2.",
    type: "result",
    timestamp: "2025-06-18T15:30:00Z",
  },
];

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100">
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
            <a
              href={item.url}
              key={item.title}
              className={`flex ${
                isOpen ? "flex-row" : "flex-col"
              } items-center gap-2 text-gray-700 hover:bg-gray-100 p-2 rounded`}
            >
              <item.icon className={`w-5 h-5 ${isOpen ? "w-6 h-6" : ""}`} />
              {isOpen && (
                <span className="text-sm text-center">{item.title}</span>
              )}
            </a>
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
            <Bell onClick={() => setIsNotificationOpen(!isNotificationOpen)} />
            <div
              className="bg-gray-500 rounded-full cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img
                src="https://www.perkosis.com/uploads/staffs/big/9.jpg"
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border border-black"
              />
            </div>
          </div>

          {/* Profile section */}
          {isProfileOpen && (
            <div
              className={`flex flex-col w-50 gap-1 absolute right-2 top-15 z-30 bg-white p-4 text-sm rounded-md shadow-2xl ${
                isOpen ? "hidden" : ""
              } md:${isOpen ? "flex" : ""} `}
            >
              <div className="flex flex-col p-1">
                <span className="font-bold">John Doe</span>
                <span className="text-xs text-gray-500">johndoe@xyz.com</span>
              </div>
              <hr className="border-t border-gray-200" />
              <div className="py-1">
                <div className="flex gap-1 items-center hover:bg-black/10 cursor-pointer p-1 rounded-sm">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </div>
                <div className="flex gap-1 items-center hover:bg-black/10 cursor-pointer p-1 rounded-sm">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </div>
              </div>
              <hr className="border-t border-gray-200 " />
              <div className="flex gap-1 items-center text-red-500 hover:bg-black/10 cursor-pointer p-1 rounded-sm">
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </div>
            </div>
          )}
          {/* Notifications panel */}
          {isNotificationOpen && (
            <div
              className={`flex flex-col w-full h-[70%] overflow-y-scroll scrollbar-hide sm:w-100 gap-4 absolute right-0 top-15 md:right-3 z-20 bg-white p-4 text-sm rounded-md shadow-2xl ${
                isOpen ? "hidden" : ""
              } md:${isOpen ? "flex" : ""}`}
            >
              <div className="flex flex-col">
                <span className="font-bold mb-3 text-lg">Notifications</span>

                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-3 border-b border-gray-200"
                  >
                    {/* Left icon */}
                    <div className="flex items-center justify-center w-6 h-6">
                      <Bell className="w-4 h-4 text-blue-500" />
                    </div>

                    {/* Notification content */}
                    <div className="flex flex-col flex-grow text-sm">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-gray-600 text-xs">
                        {item.message}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(item.timestamp).toLocaleString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Right icon */}
                    <div className="flex items-center justify-center w-6 h-6">
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Main dashboard content */}
        <div className="overflow-y-auto h-screen">
          <Outlet />{" "}
        </div>
      </div>
    </div>
  );
};
