import { SquareX } from "lucide-react";
export const CreateNotice = (props) => {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto z-20 shadow-md">
        <div className="bg-white rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Upload New Notice
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to create a new college notice
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowNoticeForm(false)}
            />
          </div>
          <form id="noticeForm" className="space-y-6">
            <div>
              <label
                for="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder=""
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
              />
            </div>

            <div>
              <label
                for="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                content
              </label>
              <textarea
                id="content"
                name="content"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                placeholder=""
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="date"
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
                  for="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <select
                  id="author"
                  name="author"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled selected>
                    Select author
                  </option>
                  <option value="Academic Office">Academic Office</option>
                  <option value="Library Administration">
                    Library Administration
                  </option>
                  <option value="Student Affairs">Student Affairs</option>
                  <option value="IT Department">IT Department</option>
                  <option value="Department of CSE">Department of CSE</option>
                  <option value="Sports">Sports Department</option>
                </select>
              </div>
              <div>
                <label
                  for="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled selected>
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
              <div>
                <label
                  for="priority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled selected>
                    Select priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Create Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
