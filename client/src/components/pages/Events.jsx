import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Tilt from "react-parallax-tilt";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Users,
  CalendarDays,
} from "lucide-react";
import { CreateEvent } from "../CreateEvent";
export const Events = () => {
  const [showEventForm, setShowEventForm] = useState(false);

  const GET_EVENT = gql`
    query GetEvent {
      getEvents {
        title
        description
        date
        time
        location
        attendees
        category
        status
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_EVENT);
  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
        <p className="">Loading Events...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Events: {error.message}
      </p>
    );
  const events = data?.getEvents;

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Events</span>
          <span className="fluid-p text-gray-500">
            Manage and view all college events and activities
          </span>
        </div>
        <div
          className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
          onClick={() => setShowEventForm(true)}
        >
          <CalendarCheck className="text-white w-4 h-4" />
          <span className="text-white text-sm">Create Event</span>
        </div>
      </div>
      <div className={`${showEventForm ? "block" : "hidden"}`}>
        <CreateEvent setShowEventForm={setShowEventForm} />
      </div>
      {/* Event Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(events) &&
          [...events].reverse().map((item) => (
            <Tilt
              key={item.title}
              className="bg-white shadow-md border border-gray-100 rounded-md p-4 w-full relative flex flex-col gap-2 z-10"
              perspective={1000}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glarePosition={"all"}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.04}
              glareColor={"#000000"}
            >
              <span className="fluid-h2">{item.title}</span>

              <div className="flex gap-3 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-lg ${
                    item.status === "completed"
                      ? "bg-green-200"
                      : item.status === "ongoing"
                      ? "bg-yellow-200"
                      : item.status === "cancelled"
                      ? "bg-red-200"
                      : "bg-orange-200"
                  }`}
                >
                  {item.status}
                </span>
                <span className="bg-blue-200 px-2 py-0.5 rounded-lg">
                  {item.category}
                </span>
              </div>
              <p className="fluid-p text-gray-500 line-clamp-3 pr-2">
                {item.description}
              </p>
              <div className="space-y-3 px-1 text-sm text-gray-500 mt-3">
                <div className="flex gap-2 items-center">
                  <CalendarDays className="w-4 h-4" /> {item.date}
                </div>
                <div className="flex gap-2 items-center">
                  <Clock className="w-4 h-4" /> {item.time}
                </div>
                <div className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4" /> {item.location}
                </div>
                <div className="flex gap-2 items-center">
                  <Users className="w-4 h-4" /> {item.attendees}
                </div>
              </div>
              <button className="text-sm py-2 font-bold bg-black/10 p-1 rounded-md hover:bg-black/20 cursor-pointer">
                View Details
              </button>
            </Tilt>
          ))}
      </div>
    </div>
  );
};
