import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { showAlert } from "../utils/showAlert";
import { SquareX } from "lucide-react";

export const UploadPaper = (props) => {
  const location = useLocation();
  const [subject, setSubject] = useState(props.paperData?.subject || "");
  const [semester, setSemester] = useState(props.paperData?.semester || "");
  const [examType, setExamType] = useState(props.paperData?.examType || "");
  const [duration, setDuration] = useState(props.paperData?.duration || "");

  useEffect(() => {
    if (location.state?.openPaperForm) {
      props.setShowPaperForm(true);
    }
    if (props.paperData) {
      setSubject(props.paperData.subject || "");
      setSemester(props.paperData.semester || "");
      setExamType(props.paperData.examType || "");
      setDuration(props.paperData.duration || "");
    }
  }, [location.state, props.paperData]);

  const CREATE_PAPER = gql`
    mutation CreatePapers($input: paperInput!) {
      createPapers(input: $input) {
        _id
      }
    }
  `;

  const UPDATE_PAPER = gql`
    mutation UpdatePaper($_id: ID!, $input: paperInput!) {
      updatePaper(_id: $_id, input: $input) {
        _id
        title
      }
    }
  `;

  const [createPaper] = useMutation(CREATE_PAPER);
  const [runUpdatePaper] = useMutation(UPDATE_PAPER);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!file && !props.paperData) {
      showAlert("Please select a file to upload.", "error");
      return;
    }

    try {
      setIsUploading(true);

      let fileUrl = props.paperData?.fileUrl || "";
      let fileSize = props.paperData?.fileSize || "";

      if (file) {
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

        fileUrl = sasUrl.split("?")[0];
        fileSize =
          file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(2)} KB`
            : `${(file.size / 1024 / 1024).toFixed(2)} MB`;
      }
      const input = {
        title: form.title.value,
        subject: form.subject.value,
        semester: form.semester.value,
        year: form.year.value,
        examType: form.examType.value,
        maxMarks: Number(form.maxMarks.value),
        duration: form.duration.value,
        fileUrl,
        fileSize,
      };
      if (props.paperData?._id && props.updatePaper) {
        //update
        await props.updatePaper({
          variables: { _id: props.paperData._id, input },
        });
        showAlert("Paper updated successfully!", "success");
      } else {
        //create
        await createPaper({
          variables: { input },
        });
        showAlert("Paper uploaded successfully!", "success");
      }
      if (props.paperData?._id) {
        await runUpdatePaper({
          variables: { _id: props.paperData._id, input },
        });
        showAlert("Paper updated successfully!", "success");
      }

      if (props.refetchPapers) {
        props.refetchPapers();
      }

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
        <div className="bg-white dark:bg-black/20 rounded-lg card-shadow p-6 md:p-8">
          <div className=" mb-8 flex justify-between">
            {/* Input field for the title of the paper */}
            <div>
              <h1 className="text-xl font-bold mb-2">
                {" "}
                {props.paperData ? "Update" : "Upload"} Paper
              </h1>
              <p className="text-sm text-gray-600">
                Fill out the form below to{" "}
                {props.paperData ? "update" : "upload"} a Question Paper.
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
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder=""
                required
                defaultValue={props.paperData?.title || ""}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-1">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                required
                defaultValue={props.paperData?.year || ""}
                placeholder="e.g., 2023"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dropdown to select the subject related to the paper */}
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
              {/* Dropdown to select the semester for which the paper are applicable */}
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
              <div>
                <label
                  htmlFor="examType"
                  className="block text-sm font-medium mb-1"
                >
                  Exam Type
                </label>
                <select
                  id="examType"
                  name="examType"
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="block text-sm font-medium mb-1"
                >
                  Max Marks
                </label>
                <input
                  type="number"
                  id="maxMarks"
                  name="maxMarks"
                  defaultValue={props.paperData?.maxMarks || ""}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input field for the duration of the paper */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium mb-1"
                >
                  duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    Select duration
                  </option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hour">2 hour</option>
                  <option value="3 hour">3 hour</option>
                </select>
              </div>
              {/* File input for uploading the paper document (PDF, DOC, DOCX) */}
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
                className="px-6 py-2 bg-[#103d46] text-white rounded-md hover:bg-black transition duration-200"
              >
                {props.paperData ? "Update Paper" : "Upload Paper"}
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
