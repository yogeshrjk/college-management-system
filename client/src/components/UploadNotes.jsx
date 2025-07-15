import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { SquareX } from "lucide-react";
import { useState, useEffect } from "react";

export const UploadNotes = (props) => {
  const location = useLocation();
  const [subject, setSubject] = useState(props.notesData?.subject || "");
  const [semester, setSemester] = useState(props.notesData?.semester || "");

  useEffect(() => {
    if (location.state?.openNotesForm) {
      props.setShowNotesForm(true);
    }
    if (props.notesData) {
      setSubject(props.notesData.subject || "");
      setSemester(props.notesData.semester || "");
    }
  }, [location.state, props.notesData]);

  const CREATE_NOTES = gql`
    mutation CreateNotes($input: notesInput!) {
      createNotes(input: $input) {
        _id
      }
    }
  `;

  const UPDATE_NOTES = gql`
    mutation UpdateNotes($_id: ID!, $input: notesInput!) {
      updateNotes(_id: $_id, input: $input) {
        _id
        title
      }
    }
  `;

  const [createNotes] = useMutation(CREATE_NOTES);
  const [runUpdateNotes] = useMutation(UPDATE_NOTES);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!file && !props.notesData) {
      showAlert("Please select a file to upload.", "error");
      return;
    }

    try {
      setIsUploading(true);
      let fileUrl = props.notesData?.fileUrl || "";
      let fileType = props.notesData?.fileType || "";
      let fileSize = props.notesData?.fileSize || "";

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const [baseUrl, sasToken] =
          import.meta.env.VITE_AZURE_SAS_BASE_URL_NOTES.split("?");
        const sasUrl = `${baseUrl}/${fileName}?${sasToken}`;

        await fetch(sasUrl, {
          method: "PUT",
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": file.type,
          },
          body: file,
        });

        fileUrl = sasUrl.split("?")[0];
        fileType = file.name.split(".").pop().toLowerCase();
        fileSize =
          file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(2)} KB`
            : `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      }

      const input = {
        title: form.title.value,
        subject: form.subject.value,
        semester: form.semester.value,
        author: form.author.value,
        description: form.description.value,
        fileUrl,
        fileType,
        fileSize,
      };

      if (props.notesData?._id && props.updateNotes) {
        // Update
        await props.updateNotes({
          variables: { _id: props.notesData._id, input },
        });
        showAlert("Notes updated successfully!", "success");
      } else {
        //create
        await createNotes({
          variables: { input },
        });
        showAlert("Notes uploaded successfully!", "success");
      }
      if (props.notesData?._id) {
        await runUpdateNotes({
          variables: { _id: props.notesData._id, input },
        });
        showAlert("Notes updated successfully!", "success");
      }
      if (props.refetch) {
        props.refetch();
      }

      props.setShowNotesForm(false);
    } catch (err) {
      showAlert(
        err && err.message
          ? err.message
          : "Something went wrong while uploading Notes.",
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
        <div className="bg-white dark:bg-black/20 rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            {/* Input field for the title of the notes */}
            <div>
              <h1 className="text-xl font-bold mb-2">
                {props.notesData ? "Update Notes" : "Upload Notes"}
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to
                {props.notesData ? "update" : "upload"} a note.
              </p>
            </div>
            <SquareX
              className="w-6 h-6 hover:text-red-500"
              onClick={() => props.setShowNotesForm(false)}
            />
          </div>
          <form id="notesForm" onSubmit={handleSubmit} className="space-y-6">
            {/* Textarea for a brief description of the notes */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder=""
                required
                defaultValue={props.notesData?.title || ""}
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
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                defaultValue={props.notesData?.description || ""}
                placeholder=""
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dropdown to select the subject related to the notes */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="block text-sm font-medium mb-1"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
              {/* Input field for the author of the notes */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium mb-1"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  defaultValue={props.notesData?.author || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {/* File input for uploading the notes document (PDF, DOC, DOCX) */}
              <div>
                <label
                  htmlFor="file"
                  className="block text-sm font-medium mb-1"
                >
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className="px-6 py-2 bg-[#103d46] text-white rounded-md hover:bg-black transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {props.notesData ? "Update Notes" : "Upload Notes"}
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
