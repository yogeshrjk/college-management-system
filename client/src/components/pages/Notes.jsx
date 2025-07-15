import { useState, useEffect } from "react";
import { BookOpen, Pencil, Trash2, User, Download, Search } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useOutletContext } from "react-router-dom";
import { UploadNotes } from "../UploadNotes";
import { gql, useQuery, useMutation } from "@apollo/client";
import { DeleteConfirmation } from "./ui/DeleteConfirmation";

export const Notes = () => {
  const { userRole } = useOutletContext();
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    notesId: null,
  });
  const [editNotesData, setEditNotesData] = useState(null);

  const GET_NOTES = gql`
    query GetNotes {
      getNotes {
        _id
        title
        subject
        semester
        author
        uploadDate
        downloads
        fileSize
        fileType
        description
        fileUrl
      }
    }
  `;

  const UPDATE_NOTES = gql`
    mutation UpdateNotes($_id: ID!, $input: notesInput!) {
      updateNotes(_id: $_id, input: $input) {
        _id
        title
        subject
        semester
        author
        description
      }
    }
  `;

  const SEARCH_NOTES = gql`
    query SearchNotes($keyword: String!) {
      searchNotes(keyword: $keyword) {
        _id
        title
        subject
        semester
        author
        uploadDate
        downloads
        fileSize
        fileType
        description
        fileUrl
      }
    }
  `;

  const DELETE_NOTES = gql`
    mutation DeleteNotes($_id: ID!) {
      deleteNotes(_id: $_id) {
        _id
      }
    }
  `;
  const INCREMENT_DOWNLOAD = gql`
    mutation IncrementNotesDownloadCount($_id: ID!) {
      incrementNotesDownloadCount(_id: $_id)
    }
  `;

  const { data, loading, error, refetch } = useQuery(GET_NOTES);
  const [incrementDownload] = useMutation(INCREMENT_DOWNLOAD, {
    refetchQueries: [{ query: GET_NOTES }],
  });
  const [deleteNotes] = useMutation(DELETE_NOTES, {
    refetchQueries: [{ query: GET_NOTES }],
  });
  const [updateNotes] = useMutation(UPDATE_NOTES, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  useEffect(() => {}, [data]);

  const { data: searchData } = useQuery(SEARCH_NOTES, {
    variables: { keyword: searchKeyword },
    skip: searchKeyword.trim() === "",
  });

  if (loading)
    return (
      <div className="flex items-center justify-center gap-2 h-[60vh]">
        <div className="h-4 w-4  animate-spin rounded-full border-2 border-[#103d46] border-t-transparent"></div>
        <p className="">Loading Notes...</p>
      </div>
    );
  if (error)
    return (
      <p className="px-10 py-5 text-red-500">
        Error loading Notes: {error.message}
      </p>
    );

  const notes =
    searchKeyword.trim() !== "" && searchData?.searchNotes
      ? searchData.searchNotes
      : data?.getNotes;

  return (
    <div className="px-5 md:px-10 py-5 flex flex-col gap-5 select-none">
      <div className="flex flex-col gap-2 md:flex-row justify-between items-start md:items-center p-1">
        <div className="flex flex-col">
          <span className="fluid-h1">Notes</span>
          <span className="fluid-p text-gray-500">
            Access study materials and lecture notes from all subjects
          </span>
        </div>
        {userRole === "admin" && (
          <div
            className="bg-[#103d46] items-center flex p-2 space-x-2 rounded-sm hover:bg-green-900"
            onClick={() => {
              setShowNotesForm(true);
              setEditNotesData(null);
            }}
          >
            <BookOpen className="text-white w-4 h-4" />
            <span className="text-white text-sm">Upload Notes</span>
          </div>
        )}
      </div>
      <div className={`${showNotesForm ? "block" : "hidden"}`}>
        <UploadNotes
          setShowNotesForm={setShowNotesForm}
          refetch={refetch}
          updateNotes={updateNotes}
          notesData={editNotesData}
        />
      </div>
      {/* Search bar */}
      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Search notes by subject name..."
          className="pl-10 py-2 text-sm border border-gray-300 dark:border-black bg-white dark:bg-gray-900 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>
      {/* Notes Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(notes) &&
          [...notes].reverse().map((item) => (
            <Tilt
              key={item._id}
              className="bg-white dark:bg-black/20 shadow-md border dark:border-0 border-gray-100 rounded-md p-5 w-full relative flex flex-col z-10 h-full group"
              perspective={1000}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glarePosition={"all"}
              glareEnable={true}
              glareMaxOpacity={0.2}
              scale={1.04}
              glareColor={"#000000"}
            >
              <div className="flex flex-col h-full">
                {/* Top Section */}
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="fluid-h2">{item.title}</span>
                    {userRole === "admin" && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Pencil
                          className="w-4 h-4 hover:scale-125 transition-shadow duration-200 "
                          onClick={() => {
                            setEditNotesData(item);
                            setShowNotesForm(true);
                          }}
                        />
                        <Trash2
                          className="w-4 h-4 text-red-400 hover:scale-125 transition-shadow duration-200"
                          onClick={() =>
                            setDeleteConfirm({ show: true, notesId: item._id })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="px-2 py-0.5 rounded-lg dark:text-black bg-purple-200">
                      {item.subject}
                    </span>
                    <span className="bg-blue-200 dark:text-black px-2 py-0.5 rounded-lg">
                      {item.semester}
                    </span>
                  </div>
                  <p className="fluid-p text-gray-500">{item.description}</p>
                </div>

                {/* Metadata Section */}
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                    <span>Uploaded: {item.uploadDate}</span>
                    <span>downloads: {item.downloads} </span>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs">
                    <span>{item.fileSize}</span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded-lg">
                      {item.fileType}
                    </span>
                  </div>
                </div>

                {/* Button Section */}
                <div className="mt-4 grid grid-cols-3 gap-x-2">
                  <button
                    onClick={() => {
                      console.log("Downloading Notes ID:", item._id);
                      if (item._id) {
                        incrementDownload({ variables: { _id: item._id } });
                        fetch(item.fileUrl)
                          .then((res) => res.blob())
                          .then((blob) => {
                            const blobUrl = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = blobUrl;
                            link.download = item.title || "notes";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                          });
                      } else {
                        console.warn("Missing id for Notes:", item);
                      }
                    }}
                    className="text-white bg-[#103d46] rounded-md py-2 hover:bg-black cursor-pointer col-span-2"
                  >
                    <span className="flex items-center justify-center gap-1 text-sm font-bold">
                      <Download className="w-4 h-4" />
                      Download
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      window.open(item.fileUrl, "_blank");
                    }}
                    className="text-sm font-bold bg-black/10 rounded-md py-2 hover:bg-black/40 hover:text-white cursor-pointer col-span-1"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </Tilt>
          ))}
      </div>
      {deleteConfirm.show && (
        <DeleteConfirmation
          onConfirm={() => {
            deleteNotes({ variables: { _id: deleteConfirm.notesId } });
            setDeleteConfirm({ show: false, notesId: null });
          }}
          onCancel={() => setDeleteConfirm({ show: false, notesId: null })}
        />
      )}
    </div>
  );
};
