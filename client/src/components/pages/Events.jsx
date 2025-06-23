import Tilt from "react-parallax-tilt";
import {
  CalendarCheck,
  Clock,
  MapPin,
  Users,
  CalendarDays,
} from "lucide-react";
export const Events = () => {
  const events = [
    {
      id: 1,
      title: "Annual Tech Fest 2024",
      description:
        "Join us for the biggest technology festival of the year featuring competitions, workshops, and exhibitions.",
      date: "2024-03-15",
      time: "09:00 AM",
      location: "Main Auditorium",
      attendees: 450,
      status: "upcoming",
      category: "Festival",
    },
    {
      id: 2,
      title: "Career Guidance Workshop",
      description:
        "Expert session on career opportunities in emerging technologies and industry trends.",
      date: "2024-03-10",
      time: "02:00 PM",
      location: "Conference Hall A",
      attendees: 120,
      status: "upcoming",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Sports Day Championship",
      description:
        "Inter-department sports competition including cricket, football, basketball, and athletics.",
      date: "2024-03-08",
      time: "08:00 AM",
      location: "Sports Complex",
      attendees: 800,
      status: "completed",
      category: "Sports",
    },
    {
      id: 4,
      title: "Alumni Meet 2024",
      description:
        "Annual gathering of alumni to share experiences and network with current students.",
      date: "2024-03-20",
      time: "06:00 PM",
      location: "Grand Hall",
      attendees: 200,
      status: "upcoming",
      category: "Social",
    },
  ];
  return (
    <div className="px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Events</span>
          <span className="fluid-p text-gray-500">
            Manage and view all college events and activities
          </span>
        </div>
        <div className="bg-black items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900">
          <CalendarCheck className="text-white w-4 h-4" />
          <span className="text-white text-sm">Create Event</span>
        </div>
      </div>

      {/* Event Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((item) => (
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
                  item.status == "completed" ? "bg-green-200" : "bg-orange-200"
                }`}
              >
                {item.status}
              </span>
              <span className="bg-blue-200 px-2 py-0.5 rounded-lg">
                {item.category}
              </span>
            </div>
            <p className="fluid-p text-gray-500">{item.description}</p>
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
