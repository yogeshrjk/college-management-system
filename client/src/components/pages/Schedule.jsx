import React, { useState } from "react";
import { Sheet } from "lucide-react";
export function Schedule() {
  const scheduleData = {
    CSE: {
      "Semester 3": {
        subjects: [
          { name: "Data Structures", faculty: "Dr. Smith" },
          {
            name: "Operating Systems",
            faculty: "Prof. Johnson",
          },
          { name: "Database Systems", faculty: "Dr. Williams" },
          { name: "Computer Networks", faculty: "Prof. Brown" },
          { name: "Algorithm Analysis", faculty: "Dr. Davis" },
        ],
        lab: "Operating Systems Lab",
        activity: "Programming Club",
      },
      "Semester 5": {
        subjects: [
          { name: "Machine Learning", faculty: "Dr. Anderson" },
          { name: "Cloud Computing", faculty: "Prof. Martinez" },
          { name: "Cyber Security", faculty: "Dr. Garcia" },
          {
            name: "Big Data Analytics",
            faculty: "Prof. Rodriguez",
          },
          { name: "IoT Fundamentals", faculty: "Dr. Wilson" },
        ],
        lab: "Machine Learning Lab",
        activity: "Research Seminar",
      },
    },
    ECE: {
      "Semester 3": {
        subjects: [
          {
            name: "Digital Electronics",
            faculty: "Dr. Thompson",
          },
          { name: "Signals & Systems", faculty: "Prof. Clark" },
          { name: "Circuit Theory", faculty: "Dr. Lewis" },
          { name: "EM Theory", faculty: "Prof. Lee" },
          { name: "Microprocessors", faculty: "Dr. Walker" },
        ],
      },
      "Semester 5": {
        subjects: [
          { name: "VLSI Design", faculty: "Dr. Hall" },
          {
            name: "Communication Systems",
            faculty: "Prof. Allen",
          },
          { name: "Embedded Systems", faculty: "Dr. Young" },
          { name: "Wireless Comm", faculty: "Prof. King" },
          { name: "Control Systems", faculty: "Dr. Wright" },
        ],
      },
    },
  };

  const [selectedClass, setSelectedClass] = useState("CSE");
  const [selectedSemester, setSelectedSemester] = useState("Semester 3");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timeSlots = [
    "10:00 - 10:50",
    "10:50 - 11:40",
    "11:40 - 12:30",
    "12:30 - 01:40",
    "01:40 - 02:30",
    "02:30 - 04:20",
  ];

  const currentSchedule = scheduleData[selectedClass][selectedSemester];

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Class Schedule</span>
          <span className="fluid-p text-gray-500">
            Important announcements and updates from the college administration
          </span>
        </div>
        <div
          className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
          onClick={() => setShowNoticeForm(true)}
        >
          <Sheet className="text-white w-4 h-4" />
          <span className="text-white text-sm">Create Schedule</span>
        </div>
      </div>
      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row justify-between md:justify-end">
        <div className=" p-1">
          <label htmlFor="class-select" className="text-sm font-bold p-1 mb-1">
            Select Class:
          </label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-5 py-1 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
          >
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
          </select>
        </div>

        <div className=" p-1">
          <label
            htmlFor="semester-select"
            className="text-sm font-bold p-1 mb-1"
          >
            Select Semester:
          </label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-5 py-1 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
          >
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 5">Semester 5</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto bg-white shadow-lg border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-left">
                Day / Time
              </th>
              {timeSlots.map((time, idx) => (
                <th
                  key={idx}
                  className="py-2 px-4 border border-gray-300 text-left"
                >
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIdx) => {
              let subjectIndex = 0;
              return (
                <tr key={dayIdx} className="bg-white border border-gray-300">
                  <td className="py-3 px-4 border border-gray-300 font-medium">
                    {day}
                  </td>
                  {timeSlots.map((time, timeIdx) => {
                    if (time === "12:30 - 01:40") {
                      if (dayIdx === 0) {
                        return (
                          <td
                            rowSpan={days.length}
                            key={timeIdx}
                            className="py-3 px-4 text-center font-bold text-gray-500 border border-gray-300"
                          >
                            Recess
                          </td>
                        );
                      }
                      return null;
                    }
                    const subject = currentSchedule.subjects[subjectIndex++];
                    return (
                      <td
                        key={timeIdx}
                        className="py-3 px-4 border border-gray-300"
                      >
                        {subject ? (
                          <>
                            <div className="font-semibold">{subject.name}</div>
                            <div className="text-xs text-gray-500">
                              {subject.faculty}
                            </div>
                          </>
                        ) : (
                          "-"
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
