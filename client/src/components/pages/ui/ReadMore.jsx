import { CalendarDays, SquareX } from "lucide-react";

export const ReadMore = (props) => {
  const item = props.getNotice(props.itemId);
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        key={item.id}
        className="bg-white/20 py-5 dark:bg-black/20 group shadow-md border md:w-[50%] border-gray-100 dark:border-gray-800 rounded-md p-4 relative flex flex-col gap-2 z-10 overflow-y-scoll h-full sm:h-fit"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-md md:text-xl font-bold">{item.title}</span>
          </div>
          <div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={props.onClose}
            />
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <span
            className={`px-2 py-0.5 dark:text-black rounded-lg ${
              item.priority === "low"
                ? "bg-green-200"
                : item.priority === "medium"
                ? "bg-orange-200"
                : "bg-red-200"
            }`}
          >
            {item.priority}
          </span>
          <span className="bg-blue-200 dark:text-black px-2 py-0.5 rounded-lg">
            {item.category}
          </span>
        </div>
        {/* Metadata Section */}
        <div className="flex gap-6 text-sm text-gray-500 mt-3">
          <div className="flex justify-center items-center gap-2 ">
            <CalendarDays className="w-4 h-4" /> {item.date}
          </div>
          <div>
            <span className="w-4 h-4">By {item.author}</span>
          </div>
        </div>

        <p className="text-sm md:text-lg mt-2 text-gray-800 dark:text-white whitespace-pre-line">
          {item.content}
        </p>
      </div>
    </div>
  );
};
