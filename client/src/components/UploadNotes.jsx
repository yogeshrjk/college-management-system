import { SquareX } from "lucide-react";
export const UploadNotes = (props) => {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto z-20 shadow-md">
        <div className="bg-white rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Upload Notes
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to Upload a notes file
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowNotesForm(false)}
            />
          </div>
          <form id="notesForm" className="space-y-6">
            <div>
              <label
                for="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
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
                for="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                placeholder=""
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled selected>
                    Select subject
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
              <div>
                <label
                  for="semester"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled selected>
                    Select Semester
                  </option>
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <input
                  type="author"
                  id="author"
                  name="author"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                />
              </div>
              <div>
                <label for="file" className="block text-sm font-semibold">
                  File
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                  type="file"
                  name="file"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Upload Notes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
