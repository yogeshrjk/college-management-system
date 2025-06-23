import { ClipboardCheck, CalendarDays, Pin } from "lucide-react";
import Tilt from "react-parallax-tilt";
const notices = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule",
    content:
      "The mid-semester examinations will be conducted from March 15-22, 2024. Students are advised to check their individual timetables on the student portal.",
    date: "2024-03-01",
    priority: "high",
    category: "Academic",
    isPinned: true,
    author: "Academic Office",
  },
  {
    id: 2,
    title: "Library Renovation Notice",
    content:
      "The main library will be closed for renovation from March 10-17, 2024. Students can access the digital library and use the temporary reading room in Block C.",
    date: "2024-02-28",
    priority: "medium",
    category: "Infrastructure",
    isPinned: false,
    author: "Library Administration",
  },
  {
    id: 3,
    title: "Scholarship Application Deadline",
    content:
      "Last date to apply for merit-based scholarships is March 20, 2024. Application forms are available at the student affairs office.",
    date: "2024-02-25",
    priority: "high",
    category: "Financial",
    isPinned: true,
    author: "Student Affairs",
  },
  {
    id: 4,
    title: "Campus Wi-Fi Maintenance",
    content:
      "Campus-wide Wi-Fi maintenance scheduled for March 5, 2024, from 2:00 AM to 6:00 AM. Internet services may be intermittent during this period.",
    date: "2024-02-24",
    priority: "low",
    category: "Technical",
    isPinned: false,
    author: "IT Department",
  },
  {
    id: 5,
    title: "Guest Lecture Series",
    content:
      "Industry experts will be conducting guest lectures on emerging technologies every Friday for the next month. Attendance is mandatory for final year students.",
    date: "2024-02-22",
    priority: "medium",
    category: "Academic",
    isPinned: false,
    author: "Department of CSE",
  },
];

export const Notices = () => {
  return (
    <div className="px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Notices</span>
          <span className="fluid-p text-gray-500">
            Important announcements and updates from the college administration
          </span>
        </div>
        <div className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900">
          <ClipboardCheck className="text-white w-4 h-4" />
          <span className="text-white text-sm">Create Notice</span>
        </div>
      </div>

      {/* Notice Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notices.map((item) => (
          <Tilt
            key={item.title}
            className={`bg-white shadow-md border border-gray-100 rounded-md p-4 w-full relative flex flex-col gap-2 z-10 ${
              item.isPinned ? "border-l-4 border-l-blue-500" : "border-0"
            }`}
            perspective={1000}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glarePosition={"all"}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.04}
            glareColor={"#000000"}
          >
            {/* Top Section */}
            <div className="flex gap-2 items-center">
              {item.isPinned ? <Pin className="text-blue-500 h-4 w-4" /> : ""}
              <span className="fluid-h2">{item.title}</span>
            </div>
            <div className="flex gap-3 text-xs">
              <span
                className={`px-2 py-0.5 rounded-lg ${
                  item.priority === "low"
                    ? "bg-green-200"
                    : item.priority === "medium"
                    ? "bg-orange-200"
                    : "bg-red-200"
                }`}
              >
                {item.priority}
              </span>
              <span className="bg-blue-200 px-2 py-0.5 rounded-lg">
                {item.category}
              </span>
            </div>
            <p className="fluid-p text-gray-500">{item.content}</p>
            {/* Metadata Section */}
            <div className="flex gap-6 space-y-3 text-sm text-gray-500 mt-3">
              <div className="flex justify-center items-center gap-2 ">
                <CalendarDays className="w-4 h-4" /> {item.date}
              </div>
              <div>
                <span className="w-4 h-4">By {item.author}</span>
              </div>
            </div>
            {/* Button Section */}
            <button className="text-sm font-bold py-2 bg-black/10 p-1 rounded-md hover:bg-black/20 cursor-pointer">
              Read More
            </button>
          </Tilt>
        ))}
      </div>
    </div>
  );
};
