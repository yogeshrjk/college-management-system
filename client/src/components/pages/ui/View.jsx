import { CalendarDays, Clock, MapPin, Users, SquareX } from "lucide-react";

export const View = (props) => {
  const item = props.getEvent(props.itemId);
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        key={item.id}
        className="bg-white/20 dark:bg-black/40 shadow-md border dark:border-0 md:w-[50%] border-gray-100 rounded-md p-4 relative flex flex-col gap-2 z-10 group h-full sm:h-fit"
      >
        <div className="flex items-center justify-between">
          <span className="text-md md:text-xl font-bold">{item.title}</span>

          <div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={props.onClose}
            />
          </div>
        </div>

        <div className="flex gap-3 text-xs">
          <span
            className={`px-2 py-0.5 rounded-lg dark:text-black ${
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
          <span className="bg-blue-200 dark:text-black px-2 py-0.5 rounded-lg">
            {item.category}
          </span>
        </div>
        <div className="space-y-3 px-1 text-sm text-gray-500 mt-3">
          <div className="flex gap-2 items-center">
            <CalendarDays className="w-4 h-4" /> Date: {item.date}
          </div>
          <div className="flex gap-2 items-center">
            <Clock className="w-4 h-4" />
            Time: {item.time}
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 h-4" />
            Location: {item.location}
          </div>
          <div className="flex gap-2 items-center">
            <Users className="w-4 h-4" />
            Total Attendees: {item.attendees}
          </div>
        </div>
        <p className="text-sm md:text-lg mt-2 text-gray-800 dark:text-white whitespace-pre-line">
          {item.description}
        </p>
      </div>
    </div>
  );
};
