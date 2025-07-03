import { gql, useMutation } from "@apollo/client";
import { showAlert } from "../utils/showAlert";
import { SquareX } from "lucide-react";
import { useState } from "react";

export const UploadPaper = (props) => {
  const CREATE_PAPER = gql`
    mutation CreatePapers($input: CreatePapersInput!) {
      createPapers(input: $input) {
        id
      }
    }
  `;

  const [createPaper] = useMutation(CREATE_PAPER);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!file) {
      showAlert("Please select a file to upload.", "error");
      return;
    }

    try {
      setIsUploading(true);
      const fileName = `${Date.now()}_${file.name}`;
      const [baseUrl, sasToken] =
        import.meta.env.VITE_AZURE_SAS_BASE_URL_PAPERS.split("?");
      const sasUrl = `${baseUrl}/${fileName}?${sasToken}`;

      await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
        body: file,
      });

      const fileUrl = sasUrl.split("?")[0];

      await createPaper({
        variables: {
          input: {
            title: form.title.value,
            subject: form.subject.value,
            semester: form.semester.value,
            year: form.year.value,
            examType: form.examType.value,
            maxMarks: Number(form.maxMarks.value),
            duration: form.duration.value,
            fileUrl,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          },
        },
      });

      showAlert("Paper uploaded successfully!", "success");
      props.setShowPaperForm(false);
    } catch (err) {
      showAlert(
        err && err.message
          ? err.message
          : "Something went wrong while uploading paper.",
        "error"
      );
      console.error("GraphQL Error:", JSON.stringify(err, null, 2));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto z-20 shadow-md">
        <div className="bg-white rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            {/* Input field for the title of the notes */}
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Upload Paper
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to Upload a Question Paper file
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowPaperForm(false)}
            />
          </div>
          <form id="paperForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Titile and year */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
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
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                required
                placeholder="e.g., 2023"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dropdown to select the subject related to the notes */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
                    Select subject
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Economics">Economics</option>
                </select>
              </div>
              {/* Dropdown to select the semester for which the notes are applicable */}
              <div>
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
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
                  htmlFor="examType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Exam Type
                </label>
                <select
                  id="examType"
                  name="examType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
                    Select Exam Type
                  </option>
                  <option value="Mid Semester">Mid Semester</option>
                  <option value="End Semester">End Semester</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="maxMarks"
                  required
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Max Marks
                </label>
                <input
                  type="number"
                  id="maxMarks"
                  name="maxMarks"
                  placeholder="e.g., 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input field for the duration of the notes */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hour">2 hour</option>
                  <option value="3 hour">3 hour</option>
                </select>
              </div>
              {/* File input for uploading the notes document (PDF, DOC, DOCX) */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:border-gray-500"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-200"
              >
                Upload Paper
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
