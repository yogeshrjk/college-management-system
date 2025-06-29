import React, { useState } from "react";

export function Schedule() {
  const scheduleData = {
    CSE: {
      "Semester 3": {
        subjects: [
          { name: "Data Structures", code: "CS301", faculty: "Dr. Smith" },
          {
            name: "Operating Systems",
            code: "CS302",
            faculty: "Prof. Johnson",
          },
          { name: "Database Systems", code: "CS303", faculty: "Dr. Williams" },
          { name: "Computer Networks", code: "CS304", faculty: "Prof. Brown" },
          { name: "Algorithm Analysis", code: "CS305", faculty: "Dr. Davis" },
        ],
        lab: "Operating Systems Lab",
        activity: "Programming Club",
      },
      "Semester 5": {
        subjects: [
          { name: "Machine Learning", code: "CS501", faculty: "Dr. Anderson" },
          { name: "Cloud Computing", code: "CS502", faculty: "Prof. Martinez" },
          { name: "Cyber Security", code: "CS503", faculty: "Dr. Garcia" },
          {
            name: "Big Data Analytics",
            code: "CS504",
            faculty: "Prof. Rodriguez",
          },
          { name: "IoT Fundamentals", code: "CS505", faculty: "Dr. Wilson" },
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
            code: "EC301",
            faculty: "Dr. Thompson",
          },
          { name: "Signals & Systems", code: "EC302", faculty: "Prof. Clark" },
          { name: "Circuit Theory", code: "EC303", faculty: "Dr. Lewis" },
          { name: "EM Theory", code: "EC304", faculty: "Prof. Lee" },
          { name: "Microprocessors", code: "EC305", faculty: "Dr. Walker" },
        ],
        lab: "Digital Electronics Lab",
        activity: "Robotics Club",
      },
      "Semester 5": {
        subjects: [
          { name: "VLSI Design", code: "EC501", faculty: "Dr. Hall" },
          {
            name: "Communication Systems",
            code: "EC502",
            faculty: "Prof. Allen",
          },
          { name: "Embedded Systems", code: "EC503", faculty: "Dr. Young" },
          { name: "Wireless Comm", code: "EC504", faculty: "Prof. King" },
          { name: "Control Systems", code: "EC505", faculty: "Dr. Wright" },
        ],
        lab: "Embedded Systems Lab",
        activity: "IEEE Seminar",
      },
    },
  };

  const [selectedClass, setSelectedClass] = useState("CSE");
  const [selectedSemester, setSelectedSemester] = useState("Semester 3");

  const timeSlots = [
    { time: "10:00 - 10:50", type: "lecture", period: 1 },
    { time: "10:50 - 11:40", type: "lecture", period: 2 },
    { time: "11:40 - 11:50", type: "short break", period: null },
    { time: "11:50 - 12:40", type: "lecture", period: 3 },
    { time: "12:40 - 01:30", type: "lecture", period: 4 },
    { time: "01:30 - 02:15", type: "lunch break", period: null },
    { time: "02:15 - 03:05", type: "lecture", period: 5 },
    { time: "03:05 - 03:55", type: "lab", period: null },
    { time: "03:55 - 04:00", type: "extra", period: null },
  ];

  const currentSchedule = scheduleData[selectedClass][selectedSemester];

  return (
    <div className="w-full mx-auto p-6 md:p-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        College Schedule
      </h1>

      {/* Dropdowns */}
      <div className="flex space-x-4 mb-6">
        <div className="w-1/2">
          <label
            htmlFor="class-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Class
          </label>
          <select
            id="class-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
          >
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
          </select>
        </div>

        <div className="w-1/2">
          <label
            htmlFor="semester-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Semester
          </label>
          <select
            id="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
          >
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 5">Semester 5</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-white">
              <th className="py-2 px-4 border text-left text-gray-700">Time</th>
              <th className="py-2 px-4 border text-left text-gray-700">
                Activity
              </th>
              <th className="py-2 px-4 border text-left text-gray-700">
                Subject/Faculty
              </th>
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => {
              let content;
              switch (slot.type) {
                case "lecture":
                  const subject = currentSchedule.subjects[slot.period - 1];
                  content = (
                    <>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-gray-600">
                        {subject.code}
                      </div>
                      <div className="text-xs text-gray-500">
                        {subject.faculty}
                      </div>
                    </>
                  );
                  break;
                case "lab":
                  content = (
                    <div className="font-medium">{currentSchedule.lab}</div>
                  );
                  break;
                case "extra":
                  content = (
                    <>
                      <div className="font-medium">Extra Activity</div>
                      <div className="text-sm text-gray-600">
                        {currentSchedule.activity}
                      </div>
                    </>
                  );
                  break;
                default:
                  content = (
                    <div className="italic text-gray-500">
                      {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)}
                    </div>
                  );
              }

              return (
                <tr key={index} className="bg-white">
                  <td className="py-3 px-4 border text-gray-700">
                    {slot.time}
                  </td>
                  <td className="py-3 px-4 border capitalize">
                    {slot.type.replace("-", " ")}
                  </td>
                  <td className="py-3 px-4 border">{content}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
