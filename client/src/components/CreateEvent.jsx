import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { gql, useMutation } from "@apollo/client";
import { SquareX } from "lucide-react";
export const CreateEvent = (props) => {
  const location = useLocation();
  const [status, setStatus] = useState(props.eventData?.status || "upcoming");
  const [category, setCategory] = useState(props.eventData?.category || "");

  useEffect(() => {
    if (location.state?.openEventForm) {
      props.setShowEventForm(true);
    }
    if (props.eventData) {
      setStatus(props.eventData.status || "upcoming");
      setCategory(props.eventData.category || "");
    }
  }, [location.state, props.eventData]);

  const CREATE_EVENT = gql`
    mutation ($input: EventInput!) {
      createEvent(input: $input) {
        _id
        title
      }
    }
  `;
  const UPDATE_EVENT = gql`
    mutation UpdateEvent($_id: ID!, $input: EventInput!) {
      updateEvent(_id: $_id, input: $input) {
        _id
        title
      }
    }
  `;

  const [createEvent] = useMutation(CREATE_EVENT);
  const [runUpdateEvent] = useMutation(UPDATE_EVENT);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = {
      title: form.title.value,
      description: form.description.value,
      date: form.date.value,
      time: form.time.value,
      location: form.location.value,
      attendees: parseInt(form.attendees.value),
      category,
      status,
    };

    try {
      setIsUploading(true);

      if (props.eventData?._id && props.updateEvent) {
        // Update
        await props.updateEvent({
          variables: { _id: props.eventData._id, input },
        });
        showAlert("Event updated successfully!", "success");
      } else {
        // Create
        await createEvent({ variables: { input } });
        showAlert("Event created successfully!", "success");
      }
      if (props.eventData?._id) {
        await runUpdateEvent({
          variables: { _id: props.eventData._id, input },
        });
        showAlert("Event updated successfully!", "success");
      }

      if (props.refetch) props.refetch();
      props.setShowEventForm(false);
    } catch (err) {
      showAlert("Something went wrong while submitting the event.", "error");
      console.error("Error submitting event:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto z-20 shadow-md">
        <div className="bg-white dark:bg-black/20 rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">
                {props.eventData
                  ? "Update College Event"
                  : "Create College Event"}
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to{" "}
                {props.eventData ? "update" : "create a new"} college event
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowEventForm(false)}
            />
          </div>

          {/* form */}
          <form id="eventForm" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Annual Tech Fest 2024"
                required
                defaultValue={props.eventData?.title || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                defaultValue={props.eventData?.description || ""}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Join us for the biggest technology festival of the year featuring competitions, workshops, and exhibitions."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={props.eventData?.date || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium mb-1"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  defaultValue={props.eventData?.time || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                required
                className="block text-sm font-medium mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Main Auditorium"
                defaultValue={props.eventData?.location || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="attendees"
                  className="block text-sm font-medium mb-1"
                >
                  Expected Attendees
                </label>
                <input
                  type="number"
                  id="attendees"
                  name="attendees"
                  placeholder="450"
                  defaultValue={props.eventData?.attendees || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Festival">Festival</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                  <option value="Social">Social</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 bg-[#103d46] text-white rounded-md hover:bg-black transition duration-200"
              >
                {props.eventData ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
          {isUploading && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
              <div className="w-10 h-10 border-4 border-[#103d46] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
