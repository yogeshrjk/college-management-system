import { useState } from "react";
import { SquareX } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { showAlert } from "../utils/showAlert";

export const CreateNotice = (props) => {
  const CREATE_NOTICE = gql`
    mutation ($input: NoticeInput!) {
      createNotice(input: $input) {
        id
      }
    }
  `;

  const [createNotice] = useMutation(CREATE_NOTICE);
  const [isUploading, setIsUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const input = {
      title: form.title.value,
      content: form.content.value,
      date: form.date.value,
      priority: form.priority.value,
      category: form.category.value,
      author: form.author.value,
      isPinned: form.isPinned.checked,
    };

    try {
      setIsUploading(true);
      await createNotice({ variables: { input } });
      showAlert("Notice created successfully!", "success");
      props.setShowNoticeForm(false);
    } catch (err) {
      showAlert("Something went wrong while creating notice.", "error");
      console.error("Error creating notice:", err);
    } finally {
      setIsUploading(false);
    }
  };

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
          <form id="noticeForm" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder=""
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
              />
            </div>

            <div>
              <label
                htmlFor="content"
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
                required
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
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <select
                  id="author"
                  name="author"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
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
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="isPinned"
                  className="text-sm font-medium text-gray-700"
                >
                  Pin this notice
                </label>
                <input type="checkbox" id="isPinned" name="isPinned" />
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Create Notice
              </button>
            </div>
          </form>
          {isUploading && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
