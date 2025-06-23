import {
  BookOpen,
  FileText,
  User,
  Download,
  Search,
  Calendar,
} from "lucide-react";
import Tilt from "react-parallax-tilt";
const questionPapers = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    semester: "3rd Semester",
    year: "2023",
    examType: "End Semester",
    duration: "3 hours",
    maxMarks: 100,
    uploadDate: "2024-01-15",
    downloads: 456,
    fileSize: "1.2 MB",
  },
  {
    id: 2,
    title: "Organic Chemistry",
    subject: "Chemistry",
    semester: "2nd Semester",
    year: "2023",
    examType: "Mid Semester",
    duration: "2 hours",
    maxMarks: 50,
    uploadDate: "2024-01-12",
    downloads: 234,
    fileSize: "0.8 MB",
  },
  {
    id: 3,
    title: "Calculus and Differential Equations",
    subject: "Mathematics",
    semester: "1st Semester",
    year: "2023",
    examType: "End Semester",
    duration: "3 hours",
    maxMarks: 100,
    uploadDate: "2024-01-10",
    downloads: 567,
    fileSize: "1.5 MB",
  },
  {
    id: 4,
    title: "Digital Electronics",
    subject: "Electronics",
    semester: "4th Semester",
    year: "2022",
    examType: "End Semester",
    duration: "3 hours",
    maxMarks: 100,
    uploadDate: "2024-01-08",
    downloads: 345,
    fileSize: "1.1 MB",
  },
  {
    id: 5,
    title: "Microeconomics",
    subject: "Economics",
    semester: "2nd Semester",
    year: "2022",
    examType: "Mid Semester",
    duration: "2 hours",
    maxMarks: 50,
    uploadDate: "2024-01-05",
    downloads: 189,
    fileSize: "0.9 MB",
  },
  {
    id: 6,
    title: "Database Management Systems",
    subject: "Computer Science",
    semester: "5th Semester",
    year: "2023",
    examType: "End Semester",
    duration: "3 hours",
    maxMarks: 100,
    uploadDate: "2024-01-03",
    downloads: 423,
    fileSize: "1.3 MB",
  },
];
export const Paper = () => {
  return (
    <div className="px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Question Papers</span>
          <span className="fluid-p text-gray-500">
            Access previous year examination papers for better preparation
          </span>
        </div>
        <div className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900">
          <FileText className="text-white w-4 h-4" />
          <span className="text-white text-sm">Upload Paper</span>
        </div>
      </div>
      {/* Search bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search question paper by subject."
          className="pl-10 py-2 text-sm border border-gray-300 bg-white rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      {/* Notes Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questionPapers.map((item) => (
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
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-lg bg-purple-200">
                    {item.subject}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-200">
                    {item.semester}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-yellow-200">
                    {item.examType}
                  </span>
                </div>
              </div>

              {/* Metadata Section */}
              <div className="mt-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Year: {item.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Duration: {item.duration}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mr-5 gap-1 text-xs">
                    <span>Max Marks: {item.maxMarks}</span>
                    <span>Size: {item.fileSize}</span>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  <span>Uploaded: {item.uploadDate}</span>
                  <span>{item.downloads} downloads</span>
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
