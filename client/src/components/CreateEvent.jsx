import { showAlert } from "../utils/showAlert";
import { gql, useMutation } from "@apollo/client";
import { SquareX } from "lucide-react";
export const CreateEvent = (props) => {
  const CREATE_EVENT = gql`
    mutation CreateEvent($input: EventInput!) {
      createEvent(input: $input) {
        _id
        title
      }
    }
  `;

  const [createEvent] = useMutation(CREATE_EVENT);

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
      category: form.category.value,
      status: form.status.value,
    };

    try {
      await createEvent({ variables: { input } });
      showAlert("Event created successfully!", "success");
      props.setShowEventForm(false);
    } catch (err) {
      showAlert("Something went wrong while creating event.", "error");
      console.error("Error creating event:", err);
    }
  };
  return (
    <>
      <div className="w-full max-w-3xl mx-auto z-20 shadow-md">
        <div className="bg-white rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Create College Event
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to create a new college event
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowEventForm(false)}
            />
          </div>
          <form id="eventForm" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Annual Tech Fest 2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                placeholder="Join us for the biggest technology festival of the year featuring competitions, workshops, and exhibitions."
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Main Auditorium"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="attendees"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Expected Attendees
                </label>
                <input
                  type="number"
                  id="attendees"
                  name="attendees"
                  placeholder="450"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
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
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
