import { useState } from "react";
import { ClipboardCheck, CalendarDays, Pin } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { CreateNotice } from "../CreateNotice";
import { gql, useQuery } from "@apollo/client";

export const Notices = () => {
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  const GET_NOTICE = gql`
    query GetNotice {
      getNotice {
        title
        content
        date
        priority
        category
        isPinned
        author
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_NOTICE);
  if (loading)
    return (
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
        <p className="">Loading Notice...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Notice: {error.message}
      </p>
    );
  const notices = data?.getNotice;
  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Notices</span>
          <span className="fluid-p text-gray-500">
            Important announcements and updates from the college administration
          </span>
        </div>
        <div
          className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
          onClick={() => setShowNoticeForm(true)}
        >
          <ClipboardCheck className="text-white w-4 h-4" />
          <span className="text-white text-sm">Create Notice</span>
        </div>
      </div>
      <div className={`${showNoticeForm ? "block" : "hidden"}`}>
        <CreateNotice setShowNoticeForm={setShowNoticeForm} />
      </div>
      {/* Notice Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(notices) &&
          [...notices].reverse().map((item) => (
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
              <p className="fluid-p pr-2 text-gray-500 line-clamp-3">
                {item.content}
              </p>
              <div className="mt-auto">
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
                <button className="w-full text-sm font-bold py-2 bg-black/10 p-1 rounded-md hover:bg-black/20 cursor-pointer">
                  Read More
                </button>
              </div>
            </Tilt>
          ))}
      </div>
    </div>
  );
};
