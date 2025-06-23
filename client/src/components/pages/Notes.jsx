import { BookOpen, FileText, User, Download, Search } from "lucide-react";
import Tilt from "react-parallax-tilt";
const notes = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    semester: "3rd Semester",
    author: "Dr. Sarah Johnson",
    uploadDate: "2024-02-28",
    downloads: 245,
    fileSize: "2.4 MB",
    fileType: "PDF",
    description:
      "Comprehensive notes covering arrays, linked lists, stacks, queues, trees, and graph algorithms with examples.",
  },
  {
    id: 2,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    semester: "2nd Semester",
    author: "Prof. Michael Chen",
    uploadDate: "2024-02-25",
    downloads: 189,
    fileSize: "3.1 MB",
    fileType: "PDF",
    description:
      "Detailed study material on organic reactions, mechanisms, and synthesis pathways.",
  },
  {
    id: 3,
    title: "Calculus and Differential Equations",
    subject: "Mathematics",
    semester: "1st Semester",
    author: "Dr. Emily Rodriguez",
    uploadDate: "2024-02-22",
    downloads: 312,
    fileSize: "4.2 MB",
    fileType: "PDF",
    description:
      "Complete notes on limits, derivatives, integrals, and solving differential equations.",
  },
  {
    id: 4,
    title: "Digital Electronics Fundamentals",
    subject: "Electronics",
    semester: "4th Semester",
    author: "Prof. David Kumar",
    uploadDate: "2024-02-20",
    downloads: 156,
    fileSize: "1.8 MB",
    fileType: "PDF",
    description:
      "Boolean algebra, logic gates, combinational and sequential circuits with practical examples.",
  },
  {
    id: 5,
    title: "Microeconomics Principles",
    subject: "Economics",
    semester: "2nd Semester",
    author: "Dr. Lisa Thompson",
    uploadDate: "2024-02-18",
    downloads: 98,
    fileSize: "2.7 MB",
    fileType: "PDF",
    description:
      "Supply and demand, market structures, consumer behavior, and production theory.",
  },
  {
    id: 6,
    title: "Database Management Systems",
    subject: "Computer Science",
    semester: "5th Semester",
    author: "Prof. Robert Wilson",
    uploadDate: "2024-02-15",
    downloads: 203,
    fileSize: "3.5 MB",
    fileType: "PDF",
    description:
      "SQL queries, normalization, transaction management, and database design principles.",
  },
];
export const Notes = () => {
  return (
    <div className="px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Notes</span>
          <span className="fluid-p text-gray-500">
            Access study materials and lecture notes from all subjects
          </span>
        </div>
        <div className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900">
          <BookOpen className="text-white w-4 h-4" />
          <span className="text-white text-sm">Upload Notes</span>
        </div>
      </div>
      {/* Search bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search notes by title or subject."
          className="pl-10 py-2 text-sm border border-gray-300 bg-white rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      {/* Notes Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((item) => (
          <Tilt
            key={item.title}
            className="bg-white shadow-md border border-gray-100 rounded-md p-5 w-full relative flex flex-col z-10 h-full"
            perspective={1000}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glarePosition={"all"}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.04}
            glareColor={"#000000"}
          >
            <div className="flex flex-col h-full">
              {/* Top Section */}
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-center">
                  <span className="fluid-h2">{item.title}</span>
                  <FileText className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="px-2 py-0.5 rounded-lg bg-purple-200">
                    {item.subject}
                  </span>
                  <span className="bg-blue-200 px-2 py-0.5 rounded-lg">
                    {item.semester}
                  </span>
                </div>
                <p className="fluid-p text-gray-500">{item.description}</p>
              </div>

              {/* Metadata Section */}
              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <span>Uploaded: {item.uploadDate}</span>
                  <span>{item.downloads} downloads</span>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs">
                  <span>{item.fileSize}</span>
                  <span className="bg-gray-200 px-2 py-0.5 rounded-lg">
                    {item.fileType}
                  </span>
                </div>
              </div>

              {/* Button Section */}
              <div className="mt-4 grid grid-cols-3 gap-x-2">
                <button className=" text-white bg-black/60 rounded-md py-2 hover:bg-black/70 cursor-pointer col-span-2">
                  <span className="flex items-center justify-center gap-1 text-sm font-bold">
                    <Download className="w-4 h-4" />
                    Download
                  </span>
                </button>
                <button className="text-sm font-bold bg-black/10 rounded-md py-2 hover:bg-black/40 hover:text-white cursor-pointer col-span-1">
                  Preview
                </button>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};
