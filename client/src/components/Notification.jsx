import { Bell, Trash2 } from "lucide-react";
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
export const Notification = ({ isOpen }) => {
  return (
    <div
      className={`flex flex-col w-full h-[65%] overflow-y-scroll scrollbar-hide sm:w-100 gap-4 absolute right-0 top-15 md:right-3 z-20 bg-white dark:bg-black/20 backdrop-blur-md p-4 text-sm rounded-md shadow-2xl ${
        isOpen ? "hidden" : ""
      } md:${isOpen ? "flex" : ""}`}
    >
      <div className="flex flex-col">
        <span className="font-bold mb-3 text-lg">Notifications</span>

        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-3 border-b border-[#103d46]/50"
          >
            {/* Notification content */}
            <div className="flex flex-col flex-grow text-sm">
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Bell className="w-3 h-3 text-blue-500" />
                  <span className="font-medium">{item.title}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" />
                </div>
              </div>
              <span className="text-gray-600 text-xs">{item.message}</span>
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
          </div>
        ))}
      </div>
    </div>
  );
};
